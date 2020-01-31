import React from 'react';
import { toast } from 'react-toastify';
import httpService from '../../services/httpService';
import Form from '../../components/Form/Form';
import Schema from './JoiSchema';
import EmployeeVerifier from '../../components/EmployeeVerifier/EmployeeVerifier';

export default class ImportForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        resource: '',
        file: '',
        ippisNo: ''
      },

      ippisNoVerified: false,

      errors: {}
    };

    this.handleEmployeeSelection = this.handleEmployeeSelection.bind(this);
    this.handleEmployeeInputChange = this.handleEmployeeInputChange.bind(this);
  }

  schema = Schema;

  handleEmployeeSelection() {
    this.setState({ ippisNoVerified: true });
  }

  handleEmployeeInputChange(employee) {
    if (!employee) {
      this.setState({ ippisNoVerified: false });
    }
  }

  async doSubmit(event) {
    const file = this.file.files[0];
    const formData = new FormData();
    formData.append('resource', this.state.formData.resource);
    formData.append('file', file);
    const res = await httpService.post('/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (res) {
      toast.success('Import successful');
      this.stopProcessing();
    }
  }

  render() {
    const { ippisNoVerified } = this.state;

    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        <EmployeeVerifier
          onEmployeeSelection={this.handleEmployeeSelection}
          onInputChange={this.handleEmployeeInputChange}
        >
          {this.renderInput(
            'Please enter a valid IPPIS number',
            'ippisNo',
            'Ex. 12345',
            null,
            'number'
          )}
        </EmployeeVerifier>
        {ippisNoVerified ? (
          <span>
            {this.renderSelect(
              'select resource',
              'resource',
              this.props.resourceOptions || [],
              this.props.getSelectedResource
            )}
            {this.renderInput('file', 'file', null, null, 'file')}
          </span>
        ) : null}
        {this.renderButton('import')}
      </form>
    );
  }
}
