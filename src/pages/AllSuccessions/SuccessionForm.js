import React from 'react';
import { toast } from 'react-toastify';
import Section from '../../hoc/Section/Section';
import httpService from '../../services/httpService';
import Form from '../../components/Form/Form';
import Schema from './JoiSchema';
import InformationBlock from '../../components/InformationBlock/InformationBlock';
import EmployeeVerifier from '../../components/EmployeeVerifier/EmployeeVerifier';
import nameMapper, { mapForReactSelect } from '../../helpers/nameMapper';

export default class ImportForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        departmentId: '',
        sectionId: '',
        jobTitleId: '',
        employeeCount: '',
        basicQualId: '',
        basicSkillId: '',
        basicTrainingId: '',
        yearsOfExp: '',
        otherQualifications: [],
        otherSkills: [],
        otherTrainings: [],
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

    this.initialFormState = this.state.formData;

    this.handleEmployeeSelection = this.handleEmployeeSelection.bind(this);
    this.handleEmployeeInputChange = this.handleEmployeeInputChange.bind(this);
  }

  schema = Schema;

  isSourceDetailsFilled() {
    const {
      departmentId,
      sectionId,
      jobTitleId,
      employeeCount
    } = this.state.formData;
    return departmentId && sectionId && jobTitleId && employeeCount;
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

  fillUpFormData() {
    const { data } = this.props;

    console.log(data);

    if (data) {
      const formData = {
        departmentId: data.departmentId,
        sectionId: data.sectionId,
        jobTitleId: data.jobTitleId,
        employeeCount: data.employeeCount,
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
    console.log(this.props.options);
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
    const res = await httpService.post('/successions', this.state.formData);

    this.stopProcessing();

    if (res) {
      toast.success('Definition successfully added');
      this.runOnSuccess(res);
      this.Form.reset();
      this.resetFormData();
      this.setState({ justAddedADefinition: true });
      this.Form.querySelector(`.formControl`).focus();
    }
  }

  render() {
    const { options, formData, justAddedADefinition } = this.state;
    console.log('all sections here', options.sections);

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
              nameMapper(options.sections, 'description'),
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
          </InformationBlock>
          {this.renderButton('submit definition')}
        </form>
      </Section>
    );
  }
}
