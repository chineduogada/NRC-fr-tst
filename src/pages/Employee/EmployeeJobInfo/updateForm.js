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
        departmentId: '',
        sectionId: '',
        salaryStructureId: '',
        districtId: '',
        // location: '',
        // reportTo: '',
        employeeStatusId: '',
        pensionable: '',
      },

      errors: {},

      options: null,

      defaultValues: null,
    };

    this.schema = {
      departmentId: Joi.number(),
      districtId: Joi.number(),
      sectionId: Joi.number(),
      salaryStructureId: Joi.number(),
      // location: Joi.string(),
      // reportTo: Joi.number(),
      employeeStatusId: Joi.number(),
      pensionable: Joi.string(),
    };
  }

  async componentDidMount() {
    const { defaultValues } = this.props;

    this.setState({
      formData: defaultValues
        ? obJectKeyEliminator(defaultValues, [
            'id',
            'ippisNo',
            'createdAt',
            'updatedAt',
            'department',
            'district',
            'employeeStatus',
            'section',
            'location',
            'reportTo',
            'reportToEmployee',
            'salaryStructure',
          ])
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
      `/employees/${this.props.ippisNo}/job`,
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
          <p className="form-header">update employee job information</p>
          <InformationBlock>
            {this.renderSelect(
              'section',
              'sectionId',
              nameMapper(this.props.options.sections, 'description'),
              null,
              null,
              formData.sectionId
            )}
            {this.renderSelect(
              'salary structure',
              'salaryStructureId',
              nameMapper(this.props.options.salaryStructures, 'description'),
              null,
              null,
              formData.salaryStructureId
            )}
            {/* {this.renderInput('location', 'location', null, formData.location)} */}
            {/* {this.renderInput(
              'report to',
              'reportTo',
              'enter ippiNo...',
              formData.reportTo,
              'number',
              null
            )} */}
            {this.renderSelect(
              'employee status',
              'employeeStatusId',
              nameMapper(this.props.options.employeeStatuses, 'description'),
              null,
              null,
              formData.employeeStatusId
            )}
            {this.renderSelect(
              'pensionable',
              'pensionable',
              this.props.options.pensionable,
              null,
              null,
              formData.pensionable
            )}
            {this.renderSelect(
              'department',
              'departmentId',
              nameMapper(this.props.options.departments, 'description'),
              null,
              null,
              formData.departmentId
            )}
            {this.renderSelect(
              'district',
              'districtId',
              nameMapper(this.props.options.districts, 'siteName'),
              null,
              null,
              formData.districtId
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
      departments: state.options.department,
      districts: state.options.district,
      sections: state.options.section,
      salaryStructures: state.options.salaryStructure,
      employeeStatuses: state.options.employeeStatus,
      pensionable: state.options.pensionable,
    },
  };
};

export default connect(mapStateToProps)(UpdateForm);
