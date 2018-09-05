import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getUuid } from '../controllers/auth';
import GoToInboxButton from './GoToInboxButton';
import Emoji from './Emoji';

class SignUpForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    payPalEmail: '',
    errors: {},
    serverError: '',
    registered: false,
    // TODO – loading: false,
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async event => {
    const { firstName, lastName, email, payPalEmail } = this.state;
    const { registerUserMutation } = this.props;

    event.preventDefault();
    this.setState({ errors: {}, serverError: '' });

    const isValid = this.validate();

    if (!isValid) {
      return;
    }

    try {
      const response = await registerUserMutation({
        variables: {
          clientMutationId: getUuid(),
          firstName,
          lastName,
          email,
          payPalEmail,
        },
      });

      if (response.data.registerUser) {
        this.setState({ registered: true });
      }
    } catch (error) {
      this.setState({ serverError: 'Invaid email or password. Please try again.' });
    }
  };

  validate = () => {
    const invalidInputs = [...this.formEl.getElementsByTagName('input')].filter(
      input => !input.validity.valid
    );

    // Add HTML5 form validation messages to an errors object.
    const errors = invalidInputs.reduce(
      (errorsObj, input) => ({ ...errorsObj, [input.name]: input.validationMessage }),
      {}
    );

    this.setState({ errors });

    return isEmpty(errors);
  };

  renderFieldError = name => {
    const { errors } = this.state;
    if (!errors[name]) return '';

    return <span className="SignUpForm__error">{errors[name]}</span>;
  };

  renderServerError = () => {
    const { serverError } = this.state;
    if (!serverError) return '';

    return <span className="LogInForm__error">{serverError}</span>;
  };

  render() {
    const { firstName, lastName, email, payPalEmail, registered } = this.state;

    if (registered) {
      return (
        <div>
          <h3>All right, Sparky!</h3>
          <p>
            A confirmation link has been emailed to you. Please visit it to confirm your account.
          </p>
          <GoToInboxButton email={email} />
        </div>
      );
    }

    return (
      <form
        ref={form => {
          this.formEl = form;
        }}
        onSubmit={this.handleFormSubmit}
        noValidate
      >
        <label htmlFor="SignUpForm-first-name">
          First Name
          <input
            id="SignUpForm-first-name"
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleInputChange}
            required
          />
        </label>
        {this.renderFieldError('firstName')}

        <label htmlFor="SignUpForm-last-name">
          Last Name
          <input
            id="SignUpForm-last-name"
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleInputChange}
            required
          />
        </label>
        {this.renderFieldError('lastName')}

        <label htmlFor="SignUpForm-email">
          Email
          <input
            id="SignUpForm-email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
        </label>
        {this.renderFieldError('email')}

        <label htmlFor="SignUpForm-payPalEmail">
          PayPal Email
          <input
            id="SignUpForm-payPalEmail"
            type="email"
            name="payPalEmail"
            value={payPalEmail}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <span>
          This is required so we can send you <Emoji symbol="💰" label="money bag" /> for the
          reviews you leave.
        </span>
        {this.renderFieldError('payPalEmail')}

        {this.renderServerError()}

        <button type="submit">Sign up</button>

        {/* <style jsx>{`
          // .was-validated .form-control:valid~.invalid-feedback {
          //   display: none;
          // }
          input:invalid {
            border: 2px dashed red;
          }
          
          input:valid {
            border: 2px solid green;
          }
        `}</style> */}
      </form>
    );
  }
}

// Form.propTypes = {
//     children: PropTypes.node,
//     className: PropTypes.string,
//     submit: PropTypes.func.isRequired
// };

const REGISTER_USER = gql`
  mutation registerUser(
    $clientMutationId: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $payPalEmail: String!
  ) {
    registerUser(
      input: {
        clientMutationId: $clientMutationId
        username: $email
        firstName: $firstName
        lastName: $lastName
        email: $email
        payPalEmail: $payPalEmail
      }
    ) {
      user {
        username
        email
      }
    }
  }
`;

export default graphql(REGISTER_USER, { name: 'registerUserMutation' })(SignUpForm);
