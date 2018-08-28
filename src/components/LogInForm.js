import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { storeUserData, getUuid } from '../controllers/auth';

class LogInForm extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    serverError: '',
    // TODO – loading: false,
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = async event => {
    const { logIn, updateloggedInStatus } = this.props;
    const { email, password } = this.state;

    event.preventDefault();
    this.setState({ serverError: '' });

    const isValid = this.validate();

    if (!isValid) {
      return;
    }

    try {
      const response = await logIn({
        variables: {
          username: email,
          password,
          clientMutationId: getUuid(),
        },
      });

      storeUserData(response.data.login);

      updateloggedInStatus({
        variables: {
          loggedIn: true,
        },
      });
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
    if (!errors[name]) return null;

    return <span className="LogInForm__error">{errors[name]}</span>;
  };

  renderServerError = () => {
    const { serverError } = this.state;
    if (!serverError) return null;

    return <span className="LogInForm__error">{serverError}</span>;
  };

  render() {
    const { email, password } = this.state;

    return (
      <form
        ref={form => {
          this.formEl = form;
        }}
        onSubmit={this.handleFormSubmit}
        noValidate
      >
        <label htmlFor="LogUpForm-email">
          Email
          <input
            id="LogUpForm-email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
        </label>
        {this.renderFieldError('email')}

        <label htmlFor="LogInForm-password">
          Password
          <input
            id="LogInForm-password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
            required
          />
        </label>
        {this.renderFieldError('password')}

        {this.renderServerError()}

        <button type="submit">Log in</button>
      </form>
    );
  }
}

// *** STYLES ***
// .was-validated .form-control:valid~.invalid-feedback {
//   display: none;
// }
// input:invalid {
//   border: 2px dashed red;
// }

// input:valid {
//   border: 2px solid green;
// }

const LOG_IN = gql`
  mutation LoginUser($username: String!, $password: String!, $clientMutationId: String!) {
    login(
      input: { username: $username, password: $password, clientMutationId: $clientMutationId }
    ) {
      authToken
      refreshToken
      user {
        firstName
        email
      }
    }
  }
`;

const UPDATE_LOGGED_IN_STATUS = gql`
  mutation updateloggedInStatus($loggedIn: Bool!) {
    updateloggedInStatus(loggedIn: $loggedIn) @client {
      loggedIn
    }
  }
`;

export default compose(
  graphql(LOG_IN, { name: 'logIn' }),
  graphql(UPDATE_LOGGED_IN_STATUS, { name: 'updateloggedInStatus' })
)(LogInForm);
