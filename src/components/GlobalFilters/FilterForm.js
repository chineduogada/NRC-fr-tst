import React, { Fragment } from 'react';
import Form from '../Form/Form';
import InformationBlock from '../InformationBlock/InformationBlock';
import schema from './JoiSchema';
import RangeInput from '../RangeInput/RangeInput';
// import classes from './GlobalFilters.module.scss';

export default class extends Form {
  constructor(props) {
    super(props);

    this.schema = schema;

    this.state = {
      formData: {
        genderId: [],
        stateId: [],
        lgaId: [],
        gpzId: [],
        senatorialDistrictId: [],
        departmentId: [],
        districtId: [],
        employeeStatusId: [],
        salaryStructureId: [],
        presentPositionJobTitleId: [],
        presentPositionJobTypeId: [],
        presentPositionGradeId: [],
        presentPositionStepId: [],
        expectedRetirementDate: [],
        dateOfBirth: [],
        resumptionDate: []
      },

      errors: {}
    };

    this.initialFormData = this.state.formData;
  }

  resetFormAndFormData() {
    // this.setState({ formData: this.initialFormData });
    this.Form.reset();
  }

  componentDidUpdate() {
    const { formDataIsResquested, resetForm } = this.props;

    if (formDataIsResquested) {
      this.provideFormData();
    }

    if (resetForm) {
      // this.resetFormAndFormData();
    }
  }

  provideFormData() {
    const { formDataConsumer } = this.props;
    if (formDataConsumer) {
      formDataConsumer(this.state.formData);
    }
  }

  includeOptionForNullValues(options = []) {
    if (this.props.includeNull) {
      return [...options, { value: 'null', label: 'Null Values' }];
    }

    return options;
  }

  renderForm(formData, options) {
    const otherConfig = [null, null, null, true];
    const currentDate = new Date().toISOString().split('T')[0];

    return (
      <form ref={form => (this.Form = form)}>
        <InformationBlock>
          {this.renderReactSelect(
            'gender',
            'genderId',
            this.includeOptionForNullValues(options.gender),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'state',
            'stateId',
            this.includeOptionForNullValues(options.state),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'LGA',
            'lgaId',
            this.includeOptionForNullValues(options.lga),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'GPZ',
            'gpzId',
            this.includeOptionForNullValues(options.gpz),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'senatorial district',
            'senatorialDistrictId',
            this.includeOptionForNullValues(options.senatorialDistrict),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'department',
            'departmentId',
            this.includeOptionForNullValues(options.department),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'district',
            'districtId',
            this.includeOptionForNullValues(options.district),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'salaryStructure',
            'salaryStructureId',
            this.includeOptionForNullValues(options.salaryStructure),
            ...otherConfig
          )}
          {this.renderReactSelect(
            'employeeStatus',
            'employeeStatusId',
            this.includeOptionForNullValues(options.employeeStatus),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'present job title',
            'presentPositionJobTitleId',
            this.includeOptionForNullValues(options.jobTitle),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'present job type',
            'presentPositionJobTypeId',
            this.includeOptionForNullValues(options.jobType),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'present job grade',
            'presentPositionGradeId',
            this.includeOptionForNullValues(options.jobGrade),
            ...otherConfig
          )}

          {this.renderReactSelect(
            'present step',
            'presentPositionStepId',
            this.includeOptionForNullValues(options.step),
            ...otherConfig
          )}
        </InformationBlock>

        <InformationBlock>
          <RangeInput
            field="useInput"
            type="date"
            label="date of date"
            fieldName="dateOfBirth"
            consumeRange={this.handleChange}
            defaultValue={currentDate}
          />
          <RangeInput
            field="useInput"
            type="date"
            label="resumption date"
            fieldName="resumptionDate"
            consumeRange={this.handleChange}
            defaultValue={currentDate}
          />
          <RangeInput
            field="useInput"
            type="date"
            label="expected retirement date"
            fieldName="expectedRetirementDate"
            consumeRange={this.handleChange}
            defaultValue={currentDate}
          />
        </InformationBlock>
      </form>
    );
  }

  render() {
    const { formData } = this.state;
    const { options, resetForm } = this.props;

    if (resetForm) {
      this.resetFormAndFormData();
    }

    return <Fragment>{this.renderForm(formData, options)}</Fragment>;
  }
}
