import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { getUuid } from '../controllers/auth';

class PasswordResetForm extends Component {
  state = {
    password: '',
    errors: {},
    passwordReset: false
    // isValidated: false,
    // loading: false,
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();

    if ( ! isValid ) {
      console.log('errors were found - not submitting form.');
      return;
    }

    console.log( 'no errors found. Submitting form now.');
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

    return <span className="PasswordResetLinkForm__error">{errors[ name ]}</span>;
  }

  render() {
    return (
      <form ref={form => this.formEl = form} onSubmit={this.handleFormSubmit} noValidate>

        <p>Enter your new password.</p>

        <label htmlFor="PasswordResetLinkForm-email">Email</label>
        <input
          id="PasswordResetLinkForm-email"
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        {this.renderFieldError('email')}

        <button>Reset password</button>

      </form>
    );
  }
}


// const LOST_PASSWORD = gql`
// mutation userLostPassword(
//   $clientMutationId: String!,
//   $username: String!,
// ) {
//   userLostPassword(input: {
//     clientMutationId: $clientMutationId
//     username: $username
//   }) {
//     user {
//       username
//       email
//     }
//   }
// }
// `;

export default PasswordResetForm;
