import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';


class PasswordResetForm extends Component {
  state = {
    email: '',
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

    this.setState({ errors });

    return isEmpty(errors);
  }

  renderFieldError = name => {
    const { errors } = this.state;
    if ( ! errors[ name ] ) return '';

    return <span className="PasswordResetForm__error">{errors[ name ]}</span>;
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

        <label htmlFor="PasswordResetForm-email">Email</label>
        <input
          id="PasswordResetForm-email"
          type="email"
          name="email"
          value={ this.state.email }
          onChange={this.handleInputChange}
          required
        />
        {this.renderFieldError('email')}

        <button>Reset password</button>

      </form>
    );
  }
}

export default PasswordResetForm;
