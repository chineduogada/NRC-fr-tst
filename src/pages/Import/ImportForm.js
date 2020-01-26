import React from 'react';
import Form from '../../components/Form/Form';
import Schema from './JoiSchema';
import { toast } from 'react-toastify';

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
    setTimeout(() => {
      toast.success('Work in progress. Kindly check back. Thanks');
      this.stopProcessing();
    }, 2000);
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
