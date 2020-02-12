import React from 'react';
import { toast } from 'react-toastify';
import Section from '../../hoc/Section/Section';
import httpService from '../../services/httpService';
import Form from '../../components/Form/Form';
import Schema from './JoiSchema';
import InformationBlock from '../../components/InformationBlock/InformationBlock';
import EmployeeVerifier from '../../components/EmployeeVerifier/EmployeeVerifier';
import ReactSelect from '../../components/ReactSelect/ReactSelect';
import nameMapper, { mapForReactSelect } from '../../helpers/nameMapper';
import prepareOptionalRequirements from '../../services/successionService';

export default class ImportForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        departmentId: '',
        sectionId: '',
        jobTitleId: '',
        employeeCount: '',
        reportTo: '',
        basicQualId: '',
        basicSkillId: '',
        basicTrainingId: '',
        yearsOfExp: '',
        otherRequirement: '',
        otherRequirement1: '',
        otherRequirement2: ''
      },

      options: {
        departments: [],
        sections: [],
        jobTitles: [],
        skills: [],
        qualifications: [],
        trainings: []
      },

      justAddedADefinition: false,

      ippisNoVerified: false,

      errors: {}
    };

    this.optionalRequirmentEndpoints = {
      otherSkills: 'other-succession-skills',
      otherTrainings: 'other-succession-trainings',
      otherQualifications: 'other-succession-qualifications',
    }

    this.initialFormState = this.state.formData;

    this.handleEmployeeSelection = this.handleEmployeeSelection.bind(this);
    this.handleEmployeeInputChange = this.handleEmployeeInputChange.bind(this);
    this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
  }

  schema = Schema;

  isSourceDetailsFilled() {
    const {
      departmentId,
      sectionId,
      jobTitleId,
      employeeCount
    } = this.state.formData;
    return (
      departmentId &&
      sectionId &&
      jobTitleId &&
      employeeCount &&
      this.state.ippisNoVerified
    );
  }

  isBasicRequirementsFilled() {
    const {
      basicSkillId,
      yearsOfExp,
      basicQualId,
      basicTrainingId
    } = this.state.formData;

    return yearsOfExp && basicSkillId && basicQualId && basicTrainingId;
  }

  removeOptionalRequirement

  handleReactSelectChange({ currentTarget }) {
    const 
  }

  renderReactSelect(label, name, options, disabled, selectedOption, isMulti) {
    const { formData, errors } = this.state;

    return (
      <ReactSelect
        label={label}
        closeMenuOnSelect={false}
        hideSelectedOptions={true}
        isMulti={isMulti}
        inputId={name}
        options={options}
        name={name}
        error={errors[name]}
        id={name}
        value={`${formData[name]}`}
        getSelectObjectOnChange={reactSelectComponent => {
          this.handleReactSelectChange(reactSelectComponent);
        }}
        ref={input => (this[name] = input)}
        disabled={disabled}
        defaultValue={selectedOption}
      />
    );
  }

  fillUpFormData() {
    const { data } = this.props;

    console.log(data);

    if (data) {
      const formData = {
        departmentId: data.departmentId,
        sectionId: data.sectionId,
        jobTitleId: data.jobTitleId,
        employeeCount: data.employeeCount,
        reportTo: data.reportTo,
        basicQualId: data.basicQualId,
        basicSkillId: data.basicSkillId,
        basicTrainingId: data.basicTrainingId,
        yearsOfExp: data.yearsOfExp,
        otherQualifications: data.otherQualifications,
        otherSkills: data.otherSkills,
        otherTrainings: data.otherTrainings,
        otherRequirement: data.otherRequirement,
        otherRequirement1: data.otherRequirement1,
        otherRequirement2: data.otherRequirement2
      };
      this.setState({ formData, ippisNoVerified: true });
    }
  }

  async componentDidMount() {
    this.setState({ options: this.props.options });
    this.fillUpFormData();
  }

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  handleEmployeeSelection() {
    this.setState({ ippisNoVerified: true });
  }

  handleEmployeeInputChange(employee) {
    if (!employee) {
      this.setState({ ippisNoVerified: false });
    }
  }

  /**
   * Runs a callback provided by an external
   * user of this component if the object of
   * this form was successfully created.
   * The call back will recieve the Request
   * object as an argument
   */

  runOnSuccess(res) {
    const { onSuccess } = this.props;
    if (onSuccess) {
      onSuccess(res);
    }
  }

  async doSubmit(event) {
    const res = await httpService.patch(
      `/successions/${this.props.data.id}`,
      this.state.formData
    );
    // console.log(this.state.formData);
    if (res) {
      toast.success('Definition successfully updated');
      this.runOnSuccess(res);
      this.Form.querySelector(`.formControl`).focus();
      this.stopProcessing();
    }
  }

  render() {
    const { options, formData, justAddedADefinition } = this.state;

    return (
      <Section title={this.props.title} subTitle={this.props.subTitle}>
        <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
          {justAddedADefinition ? <p>Add another one?</p> : null}
          <InformationBlock
            title="source details"
            subTitle="All the fields in this section are required"
          >
            {this.renderSelect(
              'department',
              'departmentId',
              nameMapper(options.departments, 'description'),
              null,
              null,
              formData.departmentId
            )}
            {this.renderSelect(
              'section',
              'sectionId',
              nameMapper(options.sections, 'section'),
              null,
              null,
              formData.sectionId
            )}
            {this.renderSelect(
              'jobTitle',
              'jobTitleId',
              nameMapper(options.jobTitles, 'description'),
              null,
              null,
              formData.jobTitleId
            )}
            {this.renderInput(
              'employee count',
              'employeeCount',
              null,
              formData.employeeCount,
              'number'
            )}
            <EmployeeVerifier
              checkOnResponseRecieved={employees => employees.length}
              onEmployeeSelection={this.handleEmployeeSelection}
              onInputChange={this.handleEmployeeInputChange}
            >
              {this.renderInput(
                'report to',
                'reportTo',
                'Enter a valid IPPIS number to continue',
                formData.reportTo,
                'number'
              )}
            </EmployeeVerifier>
          </InformationBlock>

          <InformationBlock
            showDropDown
            title="basic requirements"
            subTitle={
              this.isSourceDetailsFilled()
                ? 'Please specify the basic requirements for this succession. All fields are required.'
                : 'You need to fill out the source details above.'
            }
          >
            {this.isSourceDetailsFilled() ? (
              <>
                {this.renderSelect(
                  'basic skill',
                  'basicSkillId',
                  nameMapper(options.skills, 'skill'),
                  null,
                  null,
                  formData.basicSkillId
                )}
                {this.renderSelect(
                  'basic qualification',
                  'basicQualId',
                  nameMapper(options.qualifications, 'qualification'),
                  null,
                  null,
                  formData.basicQualId
                )}
                {this.renderSelect(
                  'basic training',
                  'basicTrainingId',
                  nameMapper(options.trainings, 'type'),
                  null,
                  null,
                  formData.basicTrainingId
                )}
                {this.renderInput(
                  'years of experience',
                  'yearsOfExp',
                  null,
                  formData.yearsOfExp,
                  'number'
                )}
              </>
            ) : null}
          </InformationBlock>

          <InformationBlock
            showDropDown
            title="other requirements"
            subTitle={
              this.isBasicRequirementsFilled()
                ? 'Please specify any other (optional) requirement for this succession'
                : 'Please provide basic requirements to proceed'
            }
          >
            {this.isBasicRequirementsFilled() ? (
              <>
                {this.renderReactSelect(
                  'other skills',
                  'otherSkills',
                  mapForReactSelect(
                    nameMapper(options.skills, 'skill'),
                    'name'
                  ).filter(
                    option => `${option.value}` !== formData.basicSkillId
                  ),
                  null,
                  null,
                  [...formData.otherSkills].map(
                    option => `${option.value}` !== formData.basicSkillId
                  ),
                  true
                )}
                {this.renderReactSelect(
                  'other qualifications',
                  'otherQualifications',
                  mapForReactSelect(
                    nameMapper(options.qualifications, 'qualification'),
                    'name'
                  ).filter(
                    option => `${option.value}` !== formData.basicQualId
                  ),
                  null,
                  null,
                  [...formData.otherQualifications].map(
                    option => `${option.value}` !== formData.basicQualId
                  ),
                  true
                )}
                {this.renderReactSelect(
                  'other trainings',
                  'otherTrainings',
                  mapForReactSelect(
                    nameMapper(options.trainings, 'type'),
                    'name'
                  ).filter(
                    option => `${option.value}` !== formData.basicTrainingId
                  ),
                  null,
                  null,
                  [...formData.otherTrainings].map(
                    option => `${option.value}` !== formData.basicTrainingIdId
                  ),
                  true
                )}
                {this.renderInput('other requirement', 'otherRequirement')}
                {this.renderInput('other requirement 1', 'otherRequirement1')}
                {this.renderInput('other requirement 2', 'otherRequirement2')}
              </>
            ) : null}
            {this.renderButton('submit definition')}
          </InformationBlock>
        </form>
      </Section>
    );
  }
}
