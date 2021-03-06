import React, { Component } from 'react';
import styled from 'styled-components';

import Swimmer from './Swimmer';
import Coach from './Coach';
import User from './User';

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  background: ${props => props.theme.white};
  height: auto;
  overflow-y: auto;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  display: flex;
  .contacts,
  .workspace {
    min-height: 45rem;
    max-height: 60rem;
    overflow-y: auto;
  }
  .contacts {
    flex: 4;
    display: flex;
    flex-direction: column;
  }
  .workspace {
    flex: 6;
    background: ${props => props.theme.medGray};
    border-radius: 0.3rem;
    min-height: 40rem;
    padding: 2rem;
    box-sizing: border-box;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem 0;
  }
`;

const Button = styled.button`
  border: none;
  background: ${props =>
    (props.active ? props.theme.mainOrange : props.theme.white)};
  color: ${props =>
    (props.active ? props.theme.white : props.theme.mainOrange)};
  max-width: 35rem;
  outline: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 1.8rem;
  .btnContent {
    display: flex;
    justify-content: space-around;
  }
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.mainOrange};
    color: ${props => props.theme.white};
  }
`;

const Filter = styled.button`
  border: none;
  background: ${props =>
    (props.active ? props.theme.mainNavy : props.theme.white)};
  color: ${props => (props.active ? props.theme.white : props.theme.mainNavy)};
  max-width: 35rem;
  outline: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 1.8rem;
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.mainNavy};
    color: ${props => props.theme.white};
  }
`;

class Contacts extends Component {
  state = {
    contacts: [],
    current: null,
  };

  componentDidMount = () => {
    const { athletes, coaches, parents } = this.props;
    const contacts = [...athletes, ...coaches, ...parents];
    const sortedContacts = this.sort(contacts);
    this.setState({ contacts: sortedContacts });
  };

  sort = (contacts) => {
    const arr = [...contacts];
    const sorter = (a, b) => {
      const lastA = (a.lastName || a.user.lastName).toUpperCase();
      const lastB = (b.lastName || b.user.lastName).toUpperCase();
      if (lastA > lastB) return 1;
      if (lastA < lastB) return -1;
      return 0;
    };
    return arr.sort(sorter);
  };

  filter = (e, contacts) => {
    const c = [...contacts];
    const val = e.target.value.toLowerCase();
    const filter = (name) => {
      const last = name.lastName || name.user.lastName;
      const first = name.firstName || name.user.firstName;
      const matchLast = last.slice(0, val.length).toLowerCase() === val;
      const matchFirst = first.slice(0, val.length).toLowerCase() === val;
      if (matchLast || matchFirst) return name;
    };
    this.setState({ contacts: c.filter(filter) });
  };

  chooseContainer = (contact) => {
    let container;
    switch (contact.__typename.toLowerCase()) {
      case 'swimmer':
        container = <Swimmer key={contact._id} data={contact} />;
        break;

      case 'coach':
        container = <Coach key={contact._id} data={contact} />;
        break;

      default:
        container = <User key={contact._id} data={contact} />;
        break;
    }
    return container;
  };

  render() {
    const { athletes, coaches, parents } = this.props;
    const { contacts, current } = this.state;
    const all = [...athletes, ...coaches, ...parents];
    return (
      <Wrapper>
        <Header>
          <div className="buttons">
            <Filter onClick={() => this.setState({ contacts: this.sort(all) })}>
              All
            </Filter>
            <Filter onClick={() => this.setState({ contacts: this.sort(athletes) })}>
              Athletes
            </Filter>
            <Filter onClick={() => this.setState({ contacts: this.sort(coaches) })}>
              Coaches
            </Filter>
            <Filter onClick={() => this.setState({ contacts: this.sort(parents) })}>
              Parents
            </Filter>
            <input type="search" placeholder="Search Contacts" onChange={e => this.filter(e, all)} />
          </div>
        </Header>
        <hr />
        <Container>
          <div className="contacts">
            {contacts.map(contact => (
              <Button
                key={contact._id}
                onClick={() => this.setState({ current: this.chooseContainer(contact) })}
              >
                {contact.firstName || contact.user.firstName}{' '}
                {contact.lastName || contact.user.lastName}
              </Button>
            ))}
          </div>
          <div className="workspace">{current}</div>
        </Container>
      </Wrapper>
    );
  }
}

export default Contacts;
