import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import httpService from '../../../services/httpService';
import nameMapper from '../../../helpers/nameMapper';
import obJectKeyEliminator from '../../../helpers/obJectKeyEliminator';
import InformationBlock from '../../../components/InformationBlock/InformationBlock';
import Form from '../../../components/Form/Form';

class UpdateForm extends Form {
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
        presentPositionStepId: '',
      },

      errors: {},
      defaultValues: null,
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
      presentPositionStepId: Joi.number(),
    };
  }

  async componentDidMount() {
    const { defaultValues } = this.props;

    this.setState({
      formData: defaultValues
        ? {
            ...obJectKeyEliminator(defaultValues, [
              'id',
              'ippisNo',
              'createdAt',
              'updatedAt',
              'firstJobType',
              'firstJobTitle',
              'firstJobGrade',
              'firstJobStep',
              'presentJobType',
              'presentJobTitle',
              'presentJobGrade',
              'presentPositionStep',
            ]),
          }
        : this.state.formData,
    });
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
    const res = await httpService.patch(
      `/employees/${this.props.ippisNo}/appointment`,
      this.state.formData
    );

    if (res) {
      // Run some external callback passed as prop
      await this.onSuccess();
      this.stopProcessing();
      toast.success('Updated successful');
    }
  }

  render() {
    const { formData } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} ref={(form) => (this.Form = form)}>
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
              nameMapper(this.props.options.jobTypes, 'type'),
              null,
              true,
              formData.firstAppointmentJobTypeId
            )}
            {this.renderSelect(
              'first appointment job title',
              'firstAppointmentJobTitleId',
              nameMapper(this.props.options.jobTitles, 'description'),
              null,
              true,
              formData.firstAppointmentJobTitleId
            )}
            {this.renderSelect(
              'first appointment grade',
              'firstAppointmentGradeId',
              nameMapper(this.props.options.jobGrades, 'con'),
              null,
              true,
              formData.firstAppointmentGradeId
            )}
            {this.renderSelect(
              'first appointment step',
              'firstAppointmentStepId',
              nameMapper(this.props.options.steps, 'step'),
              null,
              true,
              formData.firstAppointmentStepId
            )}
            {this.renderSelect(
              'present position job type',
              'presentPositionJobTypeId',
              nameMapper(this.props.options.jobTypes, 'type'),
              null,
              null,
              formData.presentPositionJobTypeId
            )}
            {this.renderSelect(
              'present position job title',
              'presentPositionJobTitleId',
              nameMapper(this.props.options.jobTitles, 'description'),
              null,
              true,
              formData.presentPositionJobTitleId
            )}
            {this.renderSelect(
              'present position grade',
              'presentPositionGradeId',
              nameMapper(this.props.options.jobGrades, 'con'),
              null,
              null,
              formData.presentPositionGradeId
            )}
            {this.renderSelect(
              'present position step',
              'presentPositionStepId',
              nameMapper(this.props.options.steps, 'step'),
              null,
              null,
              formData.presentPositionStepId
            )}
          </InformationBlock>
          {this.renderButton('update')}
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: {
      jobTypes: state.options.jobType,
      jobTitles: state.options.jobTitle,
      jobGrades: state.options.jobGrade,
      steps: state.options.step,
    },
  };
};

export default connect(mapStateToProps)(UpdateForm);
