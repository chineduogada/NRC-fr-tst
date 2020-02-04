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
        firstAppointmentDate: '',
        resumptionDate: '',
        confirmationDate: '',
        expectedRetirementDate: '',
        presentAppointmentDate: '',
        firstAppointmentJobTypeId: '',
        firstAppointmentJobTitleId: '',
        firstAppointmentGradeId: '',
        firstAppointmentStepId: '',
        presentPositionJobTypeId: '',
        presentPositionJobTitleId: '',
        presentPositionGradeId: '',
        presentPositionStepId: ''
      },

      errors: {},

      options: null,

      defaultValues: null
    };

    this.schema = {
      firstAppointmentDate: Joi.string(),
      resumptionDate: Joi.string(),
      confirmationDate: Joi.string(),
      expectedRetirementDate: Joi.string(),
      presentAppointmentDate: Joi.string(),
      firstAppointmentJobTypeId: Joi.number(),
      firstAppointmentJobTitleId: Joi.number(),
      firstAppointmentGradeId: Joi.number(),
      firstAppointmentStepId: Joi.number(),
      presentPositionJobTypeId: Joi.number(),
      presentPositionJobTitleId: Joi.number(),
      presentPositionGradeId: Joi.number(),
      presentPositionStepId: Joi.number()
    };
  }

  async componentDidMount() {
    this.setState({
        formData: { ...obJectKeyEliminator(this.props.defaultValues, [
          'id',
          'ippisNo',
          'createdAt',
          'updatedAt',
          'firstJobType',
          'firstJobTitle',
          'firstJobGrade',
          'presentJobType',
          'presentJobTitle',
          'presentJobGrade',
        ]), 
        firstAppointmentJobTypeId: '1',
        firstAppointmentJobTitleId: '3',
        firstAppointmentGradeId: '1',
        firstAppointmentStepId: '2',
        presentPositionJobTypeId: '1',
        presentPositionJobTitleId: '1',
        presentPositionGradeId: '1',
        presentPositionStepId: '1' },

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
    const res = await httpService.patch(`/employees/${this.props.ippisNo}/appointment`, this.state.formData);

    
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
          <p className="form-header">update employee appointment information</p>
          <InformationBlock>
          {this.renderInput(
              'first appointment date',
              'firstAppointmentDate',
              null,
              formData.firstAppointmentDate,
              'date',
              null,
              true
            )}
            {this.renderInput(
              'resumption date',
              'resumptionDate',
              null,
              formData.resumptionDate,
              'date',
              null,
              true
            )}
            {this.renderInput(
              'confirmation date',
              'confirmationDate',
              null,
              formData.confirmationDate,
              'date',
              null,
              true
            )}
            {this.renderInput(
              'expected retirement date',
              'expectedRetirementDate',
              null,
              formData.expectedRetirementDate,
              'date',
              null,
              true
            )}
            {this.renderInput(
              'present appointment date',
              'presentAppointmentDate',
              null,
              formData.presentAppointmentDate,
              'date',
              null,
              true
            )}

            {this.renderSelect(
              'first appointment job type',
              'firstAppointmentJobTypeId',
              this.state.options.jobTypeOptions,
              null,
              true,
              formData.firstAppointmentJobTypeId
            )}
            {this.renderSelect(
              'first appointment job title',
              'firstAppointmentJobTitleId',
              this.state.options.jobTitleOptions,
              null,
              true,
              formData.firstAppointmentJobTitleId
            )}
            {this.renderSelect(
              'first appointment grade',
              'firstAppointmentGradeId',
              this.state.options.jobGradeOptions,
              null,
              true,
              formData.firstAppointmentGradeId
            )}
            {this.renderSelect(
              'first appointment step',
              'firstAppointmentStepId',
              this.state.options.jobStepOptions,
              null,
              true,
              formData.firstAppointmentStepId
            )}
            {this.renderSelect(
              'present position job type',
              'presentPositionJobTypeId',
              this.state.options.jobTypeOptions,
              null,
              null,
              formData.presentPositionJobTypeId
            )}
            {this.renderSelect(
              'present position job title',
              'presentPositionJobTitleId',
              this.state.options.jobTitleOptions,
              null,
              true,
              formData.presentPositionJobTitleId
            )}
            {this.renderSelect(
              'present position grade',
              'presentPositionGradeId',
              this.state.options.jobGradeOptions,
              null,
              null,
              formData.presentPositionGradeId
            )}
            {this.renderSelect(
              'present position step',
              'presentPositionStepId',
              this.state.options.jobStepOptions,
              null,
              null,
              formData.presentPositionStepId
            )}
          </InformationBlock>
          {this.renderButton('update')}
        </form>
      </React.Fragment>
    ) : null;
  }
}
