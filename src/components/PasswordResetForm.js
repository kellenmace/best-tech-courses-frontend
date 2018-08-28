import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { getUuid } from '../controllers/auth';
import Emoji from './Emoji';

class PasswordResetForm extends Component {
  state = {
    password: '',
    passwordConfirm: '',
    errors: {},
    serverError: '',
    passwordReset: false,
    // loading: false,
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = async event => {
    const { password } = this.state;
    const { resetKey, login, resetUserPassword } = this.props;

    event.preventDefault();
    const isValid = this.validate();

    if (!isValid) {
      return;
    }

    try {
      const response = await resetUserPassword({
        variables: {
          clientMutationId: getUuid(),
          key: resetKey,
          login,
          password,
        },
      });

      if (response.data.resetUserPassword) {
        this.setState({ passwordReset: true });
      }
    } catch (error) {
      this.setState({ serverError: 'Unable to set new password. Please try again.' });
    }
  };

  validate = () => {
    const inputs = [...this.formEl.getElementsByTagName('input')];
    const invalidInputs = inputs.filter(input => !input.validity.valid);

    // Add HTML5 form validation messages to an errors object.
    const errors = invalidInputs.reduce(
      (errorsObj, input) => ({ ...errorsObj, [input.name]: input.validationMessage }),
      {}
    );

    // Make sure password and password confirmation match.
    if (!errors.passwordConfirm && !this.doPasswordsMatch(inputs)) {
      errors.passwordConfirm = 'Passwords must match.';
    }

    this.setState({ errors });

    return isEmpty(errors);
  };

  doPasswordsMatch = inputs => {
    const passwordFields = inputs.filter(input => input.type === 'password');
    return passwordFields.length === 2 && passwordFields[0].value === passwordFields[1].value;
  };

  renderFieldError = name => {
    const { errors } = this.state;
    if (!errors[name]) return null;

    return <span className="PasswordResetForm__error">{errors[name]}</span>;
  };

  renderServerError = () => {
    const { serverError } = this.state;
    if (!serverError) return null;

    return <span className="PasswordResetForm__error">{serverError}</span>;
  };

  render() {
    const { password, passwordConfirm, passwordReset } = this.state;

    if (passwordReset) {
      return (
        <div>
          <p>
            <Emoji symbol="💥" label="boom" /> Your new password has been set.{' '}
            <Emoji symbol="💥" label="boom" />
          </p>
          <p>
            <Link to="/log-in">Log in</Link>
          </p>
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
        <p>Enter your new password.</p>

        <label htmlFor="PasswordResetForm-password">
          Password
          <input
            id="PasswordResetForm-password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
            required
          />
        </label>
        {this.renderFieldError('password')}

        <label htmlFor="PasswordResetForm-passwordConfirm">
          Confirm Password
          <input
            id="PasswordResetForm-passwordConfirm"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={this.handleInputChange}
            required
          />
        </label>
        {this.renderFieldError('passwordConfirm')}

        {this.renderServerError()}

        <button type="submit">Reset password</button>
      </form>
    );
  }
}

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword(
    $clientMutationId: String!
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: { clientMutationId: $clientMutationId, key: $key, login: $login, password: $password }
    ) {
      user {
        username
        email
      }
    }
  }
`;

// TODO: After a user successfully sets/resets their password,
// auto-log them in to save them that step

export default graphql(RESET_USER_PASSWORD, { name: 'resetUserPassword' })(PasswordResetForm);
