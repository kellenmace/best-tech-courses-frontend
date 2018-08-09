import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getUuid } from '../controllers/auth';

class SignUpForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    payPalEmail: '',
    errors: {},
    serverError: '',
    registered: false
    // TODO – loading: false,
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit = async event => {
    const { firstName, lastName, email, payPalEmail } = this.state;
    const { registerUserMutation } = this.props;

    event.preventDefault();
    this.setState({ serverError: '' });

    const isValid = this.validate();

    if ( ! isValid ) {
      return;
    }

    try {
      const response = await registerUserMutation({
        variables: {
          clientMutationId: getUuid(),
          firstName,
          lastName,
          email,
          payPalEmail
        }
      });

      if (response.data.registerUser) {
        this.setState({ registered: true });
      }
    }
    catch(error) {
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

    return <span className="SignUpForm__error">{errors[ name ]}</span>;
  }

  renderServerError = () => {
    const { serverError } = this.state;
    if ( ! serverError ) return '';

    return <span className="LogInForm__error">{serverError}</span>;
  }

  render() {
    const { registered, email } = this.state;

    if ( registered ) {
      return (
        <div>
          <h3>All right, Sparky!</h3>
          <p>A confirmation link has been emailed to you. Please visit it to confirm your account.</p>
          { email.endsWith('@gmail.com') &&
            <a href="https://mail.google.com/">Go to my inbox →</a>
          }
        </div>
      );
    }

    return (
      <form ref={form => this.formEl = form} onSubmit={this.handleFormSubmit} noValidate>
        <label htmlFor="SignUpForm-first-name">First Name</label>
        <input
          id="SignUpForm-first-name"
          type="text"
          name="firstName"
          value={ this.state.firstName }
          onChange={this.handleInputChange}
          required
        />
        {this.renderFieldError('firstName')}

        <label htmlFor="SignUpForm-last-name">Last Name</label>
        <input
          id="SignUpForm-last-name"
          type="text"
          name="lastName"
          value={ this.state.lastName }
          onChange={this.handleInputChange}
          required
        />
        {this.renderFieldError('lastName')}

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

        <label htmlFor="SignUpForm-payPalEmail">PayPal Email</label>
        <input
          id="SignUpForm-payPalEmail"
          type="email"
          name="payPalEmail"
          value={ this.state.payPalEmail }
          onChange={this.handleInputChange}
          required
        />
        <span>This is required so we can send you 💰 for the reviews you leave.</span>
        {this.renderFieldError('payPalEmail')}

        {this.renderServerError()}

        <button>Sign up</button>

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
    $clientMutationId: String!,
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $payPalEmail: String!,
  ) {
    registerUser(input: {
      clientMutationId: $clientMutationId
      username: $email
      firstName: $firstName
      lastName: $lastName
      email: $email
      payPalEmail: $payPalEmail
    }) {
      user {
        username
        email
      }
    }
  }
`;

export default graphql(REGISTER_USER, { name: 'registerUserMutation' })(SignUpForm);



/*

// LOST PASSWORD
// wp-login.php:541

if ( empty( $_POST['user_login'] ) || ! is_string( $_POST['user_login'] ) ) {
  // Enter a username or email address.
	} elseif ( strpos( $_POST['user_login'], '@' ) ) {
		$user_data = get_user_by( 'email', trim( wp_unslash( $_POST['user_login'] ) ) );
		if ( empty( $user_data ) ) {
      //There is no user registered with that email address.
    }
	} else {
		$login = trim($_POST['user_login']);
		$user_data = get_user_by('login', $login);
  }
}

Call retrieve_password().
// wp-login.php:310
// uses $_POST['user_login'] to look up user by their email.
// returns true on success or WP_Error with the error details on failure.





// PASSWORD RESET

http://besttechcourses.test/wp-login.php
?action=rp
&key=T9F7jagmlakF60aA6ErD
&login=newman3

$user = check_password_reset_key( $rp_key, $rp_login );

if ( ! $user || is_wp_error( $user ) ) {
  if ( $user && $user->get_error_code() === 'expired_key' ) {
    // key is expired.
  } else {
    // key is invalid.
  }
}

if ( isset($_POST['pass1']) && $_POST['pass1'] !== $_POST['pass2'] ) {
  // The passwords do not match.
}

$errors = new WP_Error();

/**
 * Fires before the password reset procedure is validated.
 *
 * @since 3.5.0
 *
 * @param object           $errors WP Error object.
 * @param WP_User|WP_Error $user   WP_User object if the login and reset key match. WP_Error object otherwise.
 */
/*
do_action( 'validate_password_reset', $errors, $user );

if ( ( ! $errors->get_error_code() ) && ! empty( $_POST['pass1'] ) ) {
  reset_password($user, $_POST['pass1']);
  // Your password has been reset.
}



*/






