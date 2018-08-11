import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getUuid } from '../controllers/auth';
import GoToInboxButton from '../components/GoToInboxButton';

class PasswordResetLinkForm extends Component {
  state = {
    email: '',
    errors: {},
    serverError: '',
    emailSent: false
    // isValidated: false,
    // loading: false,
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit = async event => {
    const { email } = this.state;
    const { userLostPasswordMutation } = this.props;

    event.preventDefault();
    this.setState({ errors: {}, serverError: '' });

    const isValid = this.validate();

    if ( ! isValid ) {
      return;
    }

    try {
      const response = await userLostPasswordMutation({
        variables: {
          clientMutationId: getUuid(),
          username: email,
        }
      });

      if (response.data.userLostPassword) {
        this.setState({ emailSent: true });
      }
    }
    catch(error) {
      this.setState({ serverError: 'Invaid email. Please try again.' });
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

    return <span className="PasswordResetLinkForm__error">{errors[ name ]}</span>;
  }

  renderServerError = () => {
    const { serverError } = this.state;
    if ( ! serverError ) return '';

    return <span className="PasswordResetLinkForm__error">{serverError}</span>;
  }

  render() {
    const { email, emailSent } = this.state;

    if (emailSent) {
      return (
        <Fragment>
          <p>🔗 A password reset link has been emailed to you. 🔗</p>
          <GoToInboxButton email={ email } />
        </Fragment>
      );
    }

    return (
        <form ref={form => this.formEl = form} onSubmit={this.handleFormSubmit} noValidate>

          <p>Please enter your email address to recieve a password reset link.</p>

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

          {this.renderServerError()}

          <button>Get password reset link</button>

        </form>
    );
  }
}

const LOST_PASSWORD = gql`
  mutation userLostPassword(
    $clientMutationId: String!,
    $username: String!,
  ) {
    userLostPassword(input: {
      clientMutationId: $clientMutationId
      username: $username
    }) {
      user {
        username
        email
      }
    }
  }
`;

export default graphql(LOST_PASSWORD, { name: 'userLostPasswordMutation' })(PasswordResetLinkForm);
