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
        reportTo: '',
        basicQualificationId: '',
        basicSkillId: '',
        basicTraining: '',
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
        sections: [
          { id: 1, name: 1 },
          { id: 2, name: 2 },
          { id: 3, name: 3 }
        ],
        jobTitles: [],
        skills: [],
        qualifications: [],
        trainings: []
      },

      ippisNoVerified: false,

      errors: {}
    };

    this.handleEmployeeSelection = this.handleEmployeeSelection.bind(this);
    this.handleEmployeeInputChange = this.handleEmployeeInputChange.bind(this);
  }

  schema = Schema;

  isSourceDetailsFilled() {
    const {
      departmentId,
      sectionId,
      jobTitleId,
      yearsOfExp,
      employeeCount
    } = this.state.formData;
    return (
      departmentId &&
      sectionId &&
      jobTitleId &&
      yearsOfExp &&
      employeeCount &&
      this.state.ippisNoVerified
    );
  }

  isBasicRequirementsFilled() {
    const {
      basicSkillId,
      basicQualificationId,
      basicTraining
    } = this.state.formData;
    return basicSkillId && basicQualificationId && basicTraining;
  }

  async componentDidMount() {
    const [
      skills,
      qualifications,
      trainingTypes,
      jobTitles,
      departments
    ] = await httpService.all([
      httpService.get('/skills?statusId=1'),
      httpService.get('/qualifications?statusId=1'),
      httpService.get('/training-types?statusId=1'),
      httpService.get('/job-titles?statusId=1'),
      httpService.get('/departments?statusId=1')
    ]);

    const options = { ...this.state.options };

    if (skills) {
      options.skills = nameMapper(skills.data.data, 'skill');
      options.qualifications = nameMapper(
        qualifications.data.data,
        'qualification'
      );
      options.trainings = nameMapper(trainingTypes.data.data, 'type');
      options.jobTitles = nameMapper(jobTitles.data.data, 'description');
      options.departments = nameMapper(departments.data.data, 'description');

      this.setState({ options });
    }
  }

  handleEmployeeSelection() {
    this.setState({ ippisNoVerified: true });
  }

  handleEmployeeInputChange(employee) {
    if (!employee) {
      this.setState({ ippisNoVerified: false });
    }
  }

  async doSubmit(event) {
    // const res = await httpService.post('/import', this.state.formData);
    const res = true;
    if (res) {
      // toast.success('Definition successfully added');
      toast.success('Coming Soon');
      this.stopProcessing();
    }
  }

  render() {
    const { options, formData } = this.state;

    return (
      <Section title={this.props.title} subTitle={this.props.subTitle}>
        <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
          <InformationBlock
            title='source details'
            subTitle='All the fields in this section are required'
          >
            {this.renderSelect(
              'department',
              'departmentId',
              options.departments,
              null,
              null,
              formData.departmentId
            )}
            {this.renderSelect(
              'section',
              'sectionId',
              options.sections,
              null,
              null,
              formData.sectionId
            )}
            {this.renderSelect(
              'jobTitle',
              'jobTitleId',
              options.jobTitles,
              null,
              null,
              formData.jobTitleId
            )}
            {this.renderInput(
              'years of experience',
              'yearsOfExp',
              null,
              formData.yearsOfExp,
              'number'
            )}
            {this.renderInput(
              'employee count',
              'employeeCount',
              null,
              formData.jobTitleId,
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
            title='basic requirements'
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
                  options.skills,
                  null,
                  null,
                  formData.basicSkillId
                )}
                {this.renderSelect(
                  'basic qualification',
                  'basicQualificationId',
                  options.qualifications,
                  null,
                  null,
                  formData.basicQualificationId
                )}
                {this.renderSelect(
                  'basic training',
                  'basicTraining',
                  options.trainings,
                  null,
                  null,
                  formData.basicTraining
                )}
              </>
            ) : null}
          </InformationBlock>

          <InformationBlock
            showDropDown
            title='other requirements'
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
                  mapForReactSelect(options.skills, 'name').filter(
                    option => `${option.value}` !== formData.basicSkillId
                  ),
                  null,
                  null,
                  [...formData.otherQualifications].map(
                    option => `${option.value}` !== formData.basicSkillId
                  ),
                  true
                )}
                {this.renderReactSelect(
                  'other qualifications',
                  'otherQualifications',
                  mapForReactSelect(options.qualifications, 'name').filter(
                    option =>
                      `${option.value}` !== formData.basicQualificationId
                  ),
                  null,
                  null,
                  null,
                  true
                )}
                {this.renderReactSelect(
                  'other trainings',
                  'otherTrainings',
                  mapForReactSelect(options.trainings, 'name').filter(
                    option => `${option.value}` !== formData.basicTraining
                  ),
                  null,
                  null,
                  null,
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
