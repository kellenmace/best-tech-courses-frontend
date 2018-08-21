import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { getUuid } from '../controllers/auth';
import Emoji from '../components/Emoji';

class PasswordResetForm extends Component {
  state = {
    password: '',
    passwordConfirm: '',
    errors: {},
    serverError: '',
    passwordReset: false
    // loading: false,
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit = async event => {
    const { password } = this.state;
    const { resetKey, login, resetUserPassword } = this.props;

    event.preventDefault();
    const isValid = this.validate();

    if ( ! isValid ) {
      return;
    }

    try {
      const response = await resetUserPassword({
        variables: {
          clientMutationId: getUuid(),
          key: resetKey,
          login,
          password,
        }
      });

      if (response.data.resetUserPassword) {
        this.setState({ passwordReset: true });
      }
    }
    catch(error) {
      this.setState({ serverError: 'Unable to reset password. Please try again.' });
    }
  }

  validate = () => {
    const inputs = [...this.formEl.getElementsByTagName('input')];
    const invalidInputs = inputs.filter(input => ! input.validity.valid);
    const errors = {};

    // Add HTML5 form validation messages to errors object.
    invalidInputs.map( input => errors[input.name] = input.validationMessage );

    // Make sure password and password confirmation match.
    if ( ! errors.hasOwnProperty('passwordConfirm') && ! this.doPasswordsMatch(inputs) ) {
      errors.passwordConfirm = 'Passwords must match.';
    }

    this.setState({ errors });

    return isEmpty(errors);
  }

  doPasswordsMatch = inputs => {
    const passwordFields = inputs.filter( input => input.type === 'password' );
    return passwordFields.length === 2 && passwordFields[0].value === passwordFields[1].value;
  }

  renderFieldError = name => {
    const { errors } = this.state;
    if ( ! errors[ name ] ) return '';

    return <span className="PasswordResetForm__error">{errors[ name ]}</span>;
  }

  renderServerError = () => {
    const { serverError } = this.state;
    if ( ! serverError ) return '';

    return <span className="PasswordResetForm__error">{serverError}</span>;
  }

  render() {
    const { passwordReset } = this.state;

    if (passwordReset) {
      return (
        <div>
          <p>
            <Emoji symbol="💥" label="boom" /> Your password has been reset. <Emoji symbol="💥" label="boom" />
          </p>
          <p>
            <Link to="/log-in">Log in</Link>
          </p>
        </div>
      );
    }

    return (
      <form ref={form => this.formEl = form} onSubmit={this.handleFormSubmit} noValidate>

        <p>Enter your new password.</p>

        <label htmlFor="PasswordResetForm-password">Password</label>
        <input
          id="PasswordResetForm-password"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        {this.renderFieldError('password')}

        <label htmlFor="PasswordResetForm-passwordConfirm">Confirm Password</label>
        <input
          id="PasswordResetForm-passwordConfirm"
          type="password"
          name="passwordConfirm"
          value={this.state.passwordConfirm}
          onChange={this.handleInputChange}
          required
        />
        {this.renderFieldError('passwordConfirm')}

        {this.renderServerError()}

        <button>Reset password</button>

      </form>
    );
  }
}

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword(
    $clientMutationId: String!,
		$key: String!,
    $login: String!,
    $password: String!,
  ) {
    resetUserPassword(input: {
      clientMutationId: $clientMutationId
      key: $key
      login: $login
      password: $password
    }) {
      user {
        username
        email
      }
    }
  }
`;

export default graphql(RESET_USER_PASSWORD, { name: 'resetUserPassword' })(PasswordResetForm);
