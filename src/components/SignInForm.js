import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { storeUserData, getUuid } from '../controllers/auth';

class SignInForm extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    serverError: ''
    // isLoading: false,
    // fieldsBlurred: {},
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit = async event => {
    event.preventDefault();
    this.setState({ serverError: '' });
    const isValid = this.validate();

    if ( ! isValid ) {
      return;
    }

    try {
      console.log( 'Signing in now.');

      const response = await this.props.signInMutation({
        variables: {
          username: this.state.email,
          password: this.state.password,
          clientMutationId: getUuid()
        }
      });

      storeUserData(response.data.login);

      console.log('User authenticated successfully and token stored in localStorage.');

      // TODO: maybe redirect the user back to the prevous page they were on
      // and display a "You are signed in" message.
      // this.props.router.push("/account");
      // To get user data:
      // JSON.parse( localStorage.getItem('userData') );
      // userData.authToken and userData.authToken.firstName

    } catch(error) {
      this.setState({ serverError: 'Invaid email or password. Please try again.' });
    }
  }

  validate = () => {
    const inputs = [...this.formEl.getElementsByTagName('input')];
    const invalidInputs = inputs.filter(input => ! input.validity.valid);
    const errors = {};

    // Add HTML5 form validation messages to errors object.
    invalidInputs.map( input => errors[input.name] = input.validationMessage );

    this.setState({ errors });

    return isEmpty(errors);
  }

  renderFieldError = name => {
    const { errors } = this.state;
    if ( ! errors[ name ] ) return '';

    return <span className="SignInForm__error">{errors[ name ]}</span>;
  }

  renderServerError = () => {
    const { serverError } = this.state;
    if ( ! serverError ) return '';

    return <span className="SignInForm__error">{serverError}</span>;
  }

  render() {
    return (
      <form ref={form => this.formEl = form} onSubmit={this.handleFormSubmit} noValidate>

          <label htmlFor="SignUpForm-email">Email</label>
          <input
            id="SignUpForm-email"
            type="email"
            name="email"
            value={ this.state.email }
            onChange={this.handleInputChange}
            required
          />
          {this.renderFieldError('email')}
  
          <label htmlFor="SignInForm-password">Password</label>
          <input
            id="SignInForm-password"
            type="password"
            name="password"
            value={ this.state.password }
            onChange={this.handleInputChange}
            required
          />
          {this.renderFieldError('password')}

          <p>Server Errors:</p>
          {this.renderServerError()}
  
          <button>Sign in</button>
  
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

const SIGN_IN = gql`
  mutation LoginUser($username: String!, $password: String!, $clientMutationId: String!) {
    login( input: {
      username: $username,
      password: $password,
      clientMutationId: $clientMutationId
    } ) {
      authToken
      refreshToken
      user {
        firstName
      }
    }
  }
`;

export default graphql(SIGN_IN, { name: 'signInMutation' })(SignInForm);
