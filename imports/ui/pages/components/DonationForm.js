import React, { Component } from 'react';
import styled from 'styled-components';
import { injectStripe } from 'react-stripe-elements';

import CardSection from './CardSection';

const Form = styled.form`
  margin-bottom: 40px;
  padding-bottom: 40px;
  label {
    color: #6b7c93;
    font-weight: 300;
    letter-spacing: 0.025em;
  }
  .button {
    white-space: nowrap;
    border: 0;
    outline: 0;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    color: #fff;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    background-color: #6772e5;
    text-decoration: none;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
    margin-top: 10px;
    &:hover {
      color: #fff;
      cursor: pointer;
      background-color: #7795f8;
      transform: translateY(-1px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
    }
  }
  .StripeElement {
    display: block;
    margin: 5px 0 10px 0;
    max-width: 500px;
    padding: 10px 14px;
    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
      rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border-radius: 4px;
    background: white;
  }
  .StripeElement--focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }

  .StripeElement.PaymentRequestButton {
    padding: 0;
  }
`;

class DonationForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
      console.log('Received Stripe token:', token);
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <CardSection />
        <input type="submit" className="button" value="Confirm Donation" />
      </Form>
    );
  }
}

export default injectStripe(DonationForm);
