import React from 'react';
import { toast } from 'react-toastify';
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
      },

      ippisNoVerified: false,
      
      errors: {}
    };
    
    this.schema = schema;
  }


  async doSubmit(event) {
    
  }

  render() {
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        {this.renderInput('site code', 'siteCode' )}
        {this.renderInput('site name', 'siteName' )}
        {this.renderInput('address', 'address' )}

        {this.renderButton('import')}
      </form>
    );
  }
}
