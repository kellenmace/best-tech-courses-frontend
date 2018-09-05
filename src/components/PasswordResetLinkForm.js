import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getUuid } from '../controllers/auth';
import GoToInboxButton from './GoToInboxButton';
import Emoji from './Emoji';

class PasswordResetLinkForm extends Component {
  state = {
    email: '',
    errors: {},
    serverError: '',
    emailSent: false,
    // loading: false,
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async event => {
    const { email } = this.state;
    const { sendPasswordResetEmail } = this.props;

    event.preventDefault();
    this.setState({ errors: {}, serverError: '' });

    const isValid = this.validate();

    if (!isValid) {
      return;
    }

    try {
      const response = await sendPasswordResetEmail({
        variables: {
          clientMutationId: getUuid(),
          username: email,
        },
      });

      if (response.data.sendPasswordResetEmail) {
        this.setState({ emailSent: true });
      }
    } catch (error) {
      this.setState({
        serverError: 'There is no user registered with that email address. Please try again.',
      });
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

    return <span className="PasswordResetLinkForm__error">{errors[name]}</span>;
  };

  renderServerError = () => {
    const { serverError } = this.state;
    if (!serverError) return null;

    return <span className="PasswordResetLinkForm__error">{serverError}</span>;
  };

  render() {
    const { email, emailSent } = this.state;

    if (emailSent) {
      return (
        <div>
          <p>
            <Emoji symbol="🔗" label="link" /> A password reset link has been emailed to you.{' '}
            <Emoji symbol="🔗" label="link" />
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
        <p>Please enter your email address to recieve a password reset link.</p>

        <label htmlFor="PasswordResetLinkForm-email">
          Email
          <input
            id="PasswordResetLinkForm-email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
        </label>
        {this.renderFieldError('email')}

        {this.renderServerError()}

        <button type="submit">Get password reset link</button>
      </form>
    );
  }
}

const SENT_PASSWORD_RESET_EMAIL = gql`
  mutation sendPasswordResetEmail($clientMutationId: String!, $username: String!) {
    sendPasswordResetEmail(input: { clientMutationId: $clientMutationId, username: $username }) {
      user {
        username
        email
      }
    }
  }
`;

export default graphql(SENT_PASSWORD_RESET_EMAIL, { name: 'sendPasswordResetEmail' })(
  PasswordResetLinkForm
);
