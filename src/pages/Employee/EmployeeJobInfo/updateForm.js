import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import httpService from '../../../services/httpService';
import nameMapper from '../../../helpers/nameMapper';
import obJectKeyEliminator from '../../../helpers/obJectKeyEliminator';
import InformationBlock from '../../../components/InformationBlock/InformationBlock';
import Form from '../../../components/Form/Form';
import Loader from '../../../components/Loader/Loader';

export default class UpdateForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        departmentId: '',
        sectionId: '',
        districtId: '',
        location: '',
        reportTo: '',
        employeeStatusId: '',
        pensionable: '',
      },

      errors: {},

      options: null,

      defaultValues: null
    };

    this.schema = {
      departmentId: Joi.number(),
      districtId: Joi.number(),
      sectionId: Joi.string(),
      location: Joi.string(),
      reportTo: Joi.number(),
      employeeStatus: Joi.string(),
      pensionable: Joi.string(),
    };
  }

  async componentDidMount() {
    this.setState({
        formData: obJectKeyEliminator(this.props.defaultValues, [
          'ippisNo',
          'id',
          'department',
          'district',
          'employeeStatus',
          'section',
          'reportToEmployee'
        ]),
        options: this.props.options
    })
  }

  /**
   * Runs a callback passed as prop as soon as the API request is successful
   * and a response has been recieved
   */
  async onSuccess() {
    const { onSuccess } = this.props;
    
    if (onSuccess) {
        await onSuccess();
    }
  }
  
  async doSubmit() {
    // const res = await httpService.patch(`/employees/${this.props.ippisNo}/job`, this.state.formData);

    
    if (true) {
        // Run some external callback passed as prop
        await this.onSuccess();
        this.stopProcessing();
        toast.success('Updated successful');
    }
  }

  render() {
    const { formData, options } = this.state;
    return options ? (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} ref={form => (this.Form = form)}>
          <p className="form-header">update employee job information</p>
          <InformationBlock>
            {this.renderInput('section', 'sectionId', null, formData.sectionId, 'number')}
            {this.renderInput('location', 'location', null, formData.location)}
            {this.renderInput(
              'report to',
              'reportTo',
              'enter ippiNo...',
              formData.reportTo,
              'number'
            )}
            {this.renderSelect('employee status', 'employeeStatusId', [
              { id: 'A', name: 'Active' },
              { id: 'R', name: 'Retired' },
              { id: 'S', name: 'Suspended' }
            ], null, null, formData.employeeStatusId)}
            {this.renderSelect('pensionable', 'pensionable', [
              { id: 'Y', name: 'Y' },
              { id: 'N', name: 'N' }
            ], null, null, formData.pensionable)}
            {this.renderSelect(
              'department',
              'departmentId',
              this.state.options.departmentOptions,
              null, null, formData.departmentId
            )}
            {this.renderSelect(
              'district',
              'districtId',
              this.state.options.districtOptions,
              null, null, formData.districtId
            )}
          </InformationBlock>
          {this.renderButton('update')}
        </form>
      </React.Fragment>
    ) : null;
  }
}
