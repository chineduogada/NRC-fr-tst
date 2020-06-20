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
        sectionId: [],
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
        resumptionDate: [],
      },

      activeFormField: '',

      errors: {},
    };

    this.initialFormData = this.state.formData;
  }

  resetFormAndFormData() {
    const { showOnly } = this.props;
    this.setState({
      formData: this.initialFormData,
      activeFormField: showOnly,
    });
    this.Form.reset();
  }

  shouldComponentUpdate() {
    const { showOnly, options } = this.props;
    const { activeFormField } = this.state;

    if (showOnly !== activeFormField || options) {
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    const { formDataIsResquested, resetForm, showOnly } = this.props;
    const { activeFormField } = this.state;

    if (formDataIsResquested) {
      this.provideFormData();
    }

    if (showOnly !== activeFormField) {
      this.resetFormAndFormData();
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
    const { showOnly } = this.props;
    const otherConfig = [null, null, null, true];
    const currentDate = new Date().toISOString().split('T')[0];
    let fieldsForSelectElement = [
      {
        label: 'gender',
        key: 'gender',
        name: 'genderId',
        options: this.includeOptionForNullValues(options.genders),
      },
      {
        label: 'state',
        key: 'state',
        name: 'stateId',
        options: this.includeOptionForNullValues(options.states),
      },
      {
        label: 'LGA',
        key: 'LGA',
        name: 'lgaId',
        options: this.includeOptionForNullValues(options.lga),
      },
      {
        label: 'GPZ',
        key: 'GPZ',
        name: 'gpzId',
        options: this.includeOptionForNullValues(options.gpz),
      },
      {
        label: 'senatorial district',
        key: 'senatorialDistrict',
        name: 'senatorialDistrictId',
        options: this.includeOptionForNullValues(options.senatorialDistricts),
      },
      {
        label: 'district',
        key: 'district',
        name: 'districtId',
        options: this.includeOptionForNullValues(options.districts),
      },
      {
        label: 'department',
        key: 'department',
        name: 'departmentId',
        options: this.includeOptionForNullValues(options.departments),
      },
      {
        label: 'salary structure',
        key: 'salaryStructure',
        name: 'salaryStructureId',
        options: this.includeOptionForNullValues(options.salaryStructures),
      },
      {
        label: 'employee status',
        key: 'employeeStatus',
        name: 'employeeStatusId',
        options: this.includeOptionForNullValues(options.employeeStatuses),
      },
      {
        label: 'present job title',
        key: 'jobTitle',
        name: 'presentPositionJobTitleId',
        options: this.includeOptionForNullValues(options.jobTitles),
      },
      {
        label: 'present job type',
        key: 'jobType',
        name: 'presentPositionJobTypeId',
        options: this.includeOptionForNullValues(options.jobTypes),
      },
      {
        label: 'present job grade',
        key: 'jobGrade',
        name: 'presentPositionGradeId',
        options: this.includeOptionForNullValues(options.jobGrades),
      },
      {
        label: 'present step',
        key: 'step',
        name: 'presentPositionStepId',
        options: this.includeOptionForNullValues(options.steps),
      },
      {
        label: 'section',
        key: 'section',
        name: 'sectionId',
        options: this.includeOptionForNullValues(options.sections),
      },
    ];

    let dateFields = [
      {
        type: 'date',
        label: 'date of birth',
        fieldName: 'dateOfBirth',
        key: 'dateOfBirth',
      },
      {
        type: 'date',
        label: 'resumption date',
        fieldName: 'resumptionDate',
        key: 'resumptionDate',
      },
      {
        type: 'date',
        label: 'expected retirement date',
        fieldName: 'expectedRetirementDate',
        key: 'expectedRetirementDate',
      },
    ];

    const getFieldToShow = (fields, fieldKey) => {
      return fields.filter((field) => field.key === fieldKey);
    };

    if (showOnly) {
      fieldsForSelectElement = getFieldToShow(fieldsForSelectElement, showOnly);
      dateFields = getFieldToShow(dateFields, showOnly);
    }

    return (
      <form ref={(form) => (this.Form = form)}>
        {fieldsForSelectElement.length ? (
          <InformationBlock>
            {fieldsForSelectElement.map((field, index) => {
              return this.renderReactSelect(
                field.label,
                field.name,
                field.options,
                null,
                null,
                this.state.formData[field.name],
                true
              );
            })}
          </InformationBlock>
        ) : null}

        {dateFields.length ? (
          <InformationBlock>
            {dateFields.map((field, index) => {
              return (
                <RangeInput
                  field="useInput"
                  type={field.type}
                  label={field.label}
                  fieldName={field.fieldName}
                  consumeRange={this.handleChange}
                  defaultValue={currentDate}
                />
              );
            })}
          </InformationBlock>
        ) : null}
      </form>
    );
  }

  render() {
    const { formData } = this.state;
    const { options } = this.props;

    return <Fragment>{this.renderForm(formData, options)}</Fragment>;
  }
}
