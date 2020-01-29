import React from 'react';
import { toast } from 'react-toastify';
import httpService from '../../services/httpService';
import Form from '../../components/Form/Form';
import Schema from './JoiSchema';

export default class ImportForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        resource: '',
        file: ''
      },

      errors: {}
    };
  }

  schema = Schema;

  async doSubmit(event) {
    const formData = new FormData();
    formData.append('resource', this.state.formData.resource);
    formData.append('file', this.state.formData.file);
    const res = await httpService.post('/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (res) {
      toast.success('Import successful');
      this.stopProcessing();
    }
  }

  render() {
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        {this.renderSelect(
          'select resource',
          'resource',
          this.props.resourceOptions || [],
          this.props.getSelectedResource
        )}

        {this.renderInput('file', 'file', null, null, 'file')}

        {this.renderButton('import')}
      </form>
    );
  }
}
