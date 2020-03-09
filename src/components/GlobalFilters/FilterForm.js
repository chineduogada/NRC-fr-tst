import React, { Fragment } from 'react';
import Form from '../Form/Form';
import InformationBlock from '../InformationBlock/InformationBlock';
import schema from './JoiSchema';
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
        presentPositionGradeId: []
      },

      errors: {}
    };
  }

  componentDidUpdate() {
    const { formDataIsResquested } = this.props;

    if (formDataIsResquested) {
      this.provideFormData();
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

    return (
      <form>
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
        </InformationBlock>
      </form>
    );
  }

  render() {
    const { formData } = this.state;
    const { options } = this.props;

    return <Fragment>{this.renderForm(formData, options)}</Fragment>;
  }
}
