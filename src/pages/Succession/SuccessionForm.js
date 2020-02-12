import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import Section from '../../hoc/Section/Section';
import httpService from '../../services/httpService';
import Form from '../../components/Form/Form';
import Schema from './JoiSchema';
import InformationBlock from '../../components/InformationBlock/InformationBlock';
import EmployeeVerifier from '../../components/EmployeeVerifier/EmployeeVerifier';
import ReactSelect from '../../components/ReactSelect/ReactSelect';
import nameMapper, { mapForReactSelect } from '../../helpers/nameMapper';
import LightBox from '../../components/LightBox/LightBox';
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

      otherQualifications: [],
      otherSkills: [],
      otherTrainings: [],

      justAddedADefinition: false,

      ippisNoVerified: false,

      errors: {},

      inProgress: false
    };

    this.optionalRequirmentMap = {
      otherSkills: {
        endpoint: 'other-succession-skills',
        key: 'skillId',
        option: this.props.options.skills,
      },
      otherTrainings: {
        endpoint: 'other-succession-trainings',
        key: 'trainingId',
        option: this.props.options.trainings,
      },
      otherQualifications: {
        endpoint: 'other-succession-qualifications',
        key: 'qualificationId',
        option: this.props.options.qualifications,
      }
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

  prepareToPushToFormData(data, name, options) {
    options.filter(option => );
    return {
      ...data,

    }
  }

  async removeExistingOptionalRequirement(name, toRemove) {
    this.setState({ inProgress: true });
    
    const { endpoint } = this.optionalRequirmentMap[name];
    
    // obtain a list of IDs
    const IDsOfRequirementsToRemove = toRemove.map(requirement => requirement.id);
    
    const res = await Promise.all(IDsOfRequirementsToRemove.map(async id => {
      await httpService.delete(`${endpoint}/${id}`);
    }));
    
    if (res) {
      console.log(res)
      this.setState({ inProgress: false });
      toast.success('operation successful');
    }
  }
  
  async addNewOptionalRequirement(name, toAdd) {
    this.setState({ inProgress: true });

    const { endpoint, key, options } = this.optionalRequirmentMap[name];

     // obtain a list of IDs
     const IDsOfRequirementsToAdd = toAdd.map(requirement => requirement.value);
     console.log(IDsOfRequirementsToAdd, toAdd)

    const data = prepareOptionalRequirements(IDsOfRequirementsToAdd, key, this.props.data.id);
    console.log(data);
    
    const res = await httpService.post(endpoint, data);

    
    if (res) {
      console.log(res)
      const preparedData = this.prepareToPushToFormData(res.data.data, name, options)
      this.setState({ inProgress: false, [name]: [...this.state[name], preparedData]});
      toast.success('operation successful');
    }
  }
  

  // This will manage updating otherSkills, otherQualifications
  // and otherTrainings arrays
  // The `optionalRequirment` is one of `otherSkills`,
  // `otherQualifications` and `otherTrainings`
  handleReactSelectChange({ currentTarget }, { action }) {
    const { name } = currentTarget;
    const value = currentTarget.value || [];
    const optionalRequirement = this.state[name];

    if (action === 'select-option') {
      const toAdd = value.filter(option => {
        return !optionalRequirement.map(requirement => requirement[this.optionalRequirmentMap[name].key]).includes(option.value)
      })

      this.addNewOptionalRequirement(name, toAdd);
    }

    if (action === 'remove-value') {
      const toRemove = optionalRequirement.filter(requirement => {
        return !value.map(option => option.value).includes(requirement[this.optionalRequirmentMap[name].key])
      });

      this.removeExistingOptionalRequirement(name, toRemove);
    }

    if (action === 'clear') {
      console.log('clear all');
    }

    // console.log(shouldAddNew, shouldRemove);
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
          getSelectObjectOnChange={(reactSelectComponent, triggeredAction) => {
            this.handleReactSelectChange(reactSelectComponent, triggeredAction);
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
        otherRequirement: data.otherRequirement,
        otherRequirement1: data.otherRequirement1,
        otherRequirement2: data.otherRequirement2
      };
      this.setState({ 
        formData, ippisNoVerified: true,
        otherQualifications: data.otherQualifications,
        otherSkills: data.otherSkills,
        otherTrainings: data.otherTrainings
      });
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
                    option => `${option.value}` !== `${formData.basicSkillId}`
                  ),
                  null,
                  mapForReactSelect(
                    nameMapper(options.skills, 'skill'),
                    'name'
                  ).filter(
                    ({ value }) => this.state.otherSkills.map(({ skill }) => skill.id).includes(value) 
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
                    option => `${option.value}` !== `${formData.basicQualId}`
                  ),
                  null,
                  mapForReactSelect(
                    nameMapper(options.qualifications, 'qualification'),
                    'name'
                  ).filter(
                    ({ value }) => this.state.otherQualifications.map(({ qualification }) => qualification.id).includes(value) 
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
                    option => `${option.value}` !== `${formData.basicTrainingId}`
                  ),
                  null,
                  mapForReactSelect(
                    nameMapper(options.trainings, 'type'),
                    'name'
                  ).filter(
                    ({ value }) => this.state.otherTrainings.map(({ training }) => training.id).includes(value) 
                  ),
                  true
                )}
                {this.renderInput('other requirement', 'otherRequirement', null, formData.otherRequirement)}
                {this.renderInput('other requirement 1', 'otherRequirement1', null, formData.otherRequirement1)}
                {this.renderInput('other requirement 2', 'otherRequirement2', null, formData.otherRequirement2)}
              </>
            ) : null}
            {this.renderButton('submit definition')}
          </InformationBlock>
        </form>
        {this.state.inProgress ? <LightBox /> : null}
      </Section>
    );
  }
}
