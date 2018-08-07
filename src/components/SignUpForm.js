import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';


class SignUpForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    errors: {}
    // isValidated: false,
    // isLoading: false,
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

    // Make sure password and password confirmation match.
    if ( ! errors.hasOwnProperty('passwordConfirm') && ! this.doPasswordsMatch(inputs) ) {
      errors.passwordConfirm = 'Passwords must match';
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

    return <span className="SignUpForm__error">{errors[ name ]}</span>;
  }

  render() {
    // const className = this.state.isValidated ? 'was-validated' : '';
    // const props = [...this.props];

    // let classNames = [];
    // if (props.className) {
    //     classNames = [...props.className];
    //     delete props.className;
    // }

    // if (this.state.isValidated) {
    //     classNames.push('.was-validated');
    // }

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

        <label htmlFor="SignUpForm-password">Password</label>
        <input
          id="SignUpForm-password"
          type="password"
          name="password"
          value={ this.state.password }
          onChange={this.handleInputChange}
          required
        />
        {this.renderFieldError('password')}

        <label htmlFor="SignUpForm-password-confirm">Confirm Password</label>
        <input
          id="SignUpForm-password-confirm"
          type="password"
          name="passwordConfirm"
          value={ this.state.passwordConfirm }
          onChange={this.handleInputChange}
          required
        />
        {this.renderFieldError('passwordConfirm')}

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

export default SignUpForm;
