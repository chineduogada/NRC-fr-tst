import React from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import nameMapper from '../../helpers/nameMapper';
import schema from './schema';
import httpService from '../../services/httpService';
import Form from '../../components/Form/Form';

export default class ImportForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        siteCode: '',
        siteName: '',
        address: '',
        statusId: ''
      },
      
      errors: {}
    };

    this.initialFormState = { ...this.state.formData };
    
    this.schema = {
      siteCode: Joi.string(),
      siteName: Joi.string(),
      address: Joi.string().allow('').optional(),
      statusId: Joi.number()
    };
  }
  
  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  async addDataObject() {
    const res = await httpService.post('/districts', this.state.formData);

    this.stopProcessing();

    if (res) {
      toast.success('District successfully added!');
      this.Form.reset();
      this.resetFormData();

      // some external code to run goes here
      if (this.props.afterDataObjectCreated) {
        this.props.afterDataObjectCreated(res);
      }
    }
  }

  async doSubmit(event) {
    return await this.addDataObject();
  }

  render() {
    console.log(nameMapper(this.props.statusOptions, 'status'))
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        <p>Add a new department</p>

        {this.renderInput('site code', 'siteCode')}
        {this.renderInput('site name','siteName')}
        {this.renderInput('address','address')}
        {this.renderSelect('status ', 'statusId', nameMapper(this.props.statusOptions, 'status'))}

        {this.renderButton('save')}
      </form>
    );
  }
}
