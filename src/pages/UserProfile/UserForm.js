import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import httpService from '../../services/httpService';
import { forceLogout } from '../../services/Credentials';
import Form from '../../components/Form/Form';

export default class ChangePassword extends Form {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      errors: {}
    };

    this.initialFormState = { ...this.state.formData };
    this.updateUser = this.updateUser.bind(this);
  }

  schema = {
    oldPassword: Joi.string(),
    newPassword: Joi.string(),
    confirmPassword: Joi.string()
  };

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  async updateUser(stopProcessing) {
    const res = await httpService.put(
      `/auth/reset-password/${this.props.user.username}`,
      this.state.formData
    );

    if (res) {
      toast.success('Password was successfuly updated! Logging out');
      forceLogout();
    }
    this.stopProcessing();
  }

  doSubmit(event) {
    this.updateUser();
  }

  renderForm() {
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        <h5 className="form-title">Change Password</h5>
        {this.renderInput(
          'current password',
          'oldPassword',
          null,
          null,
          'password'
        )}
        {this.renderInput(
          'new password',
          'newPassword',
          null,
          null,
          'password'
        )}
        {this.renderInput(
          'confirm  password',
          'confirmPassword',
          null,
          null,
          'password'
        )}

        {this.renderButton('save')}
      </form>
    );
  }

  render() {
    return this.renderForm();
  }
}
