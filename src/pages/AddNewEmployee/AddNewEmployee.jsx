import React from 'react';
import Section from '../../hoc/Section/Section';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Form from '../../components/Form/Form';
import InformationBlock from '../../components/InformationBlock/InformationBlock';
import http from '../../services/httpService';
import httpService from '../../services/httpService';
import nameMapper from './../../helpers/nameMapper';
import PageNotice from '../../components/PageNotice/PageNotice';
import EmployeeVerifier from '../../components/EmployeeVerifier/EmployeeVerifier';
import Loader from '../../components/Loader/Loader';
import hashMap from '../../helpers/hashMap';

export default class AddNewEmployee extends Form {
  constructor(props) {
    super(props);

    this.handleEmployeeSelection = this.handleEmployeeSelection.bind(this);
    this.handleEmployeeInputChange = this.handleEmployeeInputChange.bind(this);
    this.handleIppisResponseRecieved = this.handleIppisResponseRecieved.bind(
      this
    );
    this.handleNrcNoResponseRecieved = this.handleNrcNoResponseRecieved.bind(
      this
    );
  }

  state = {
    formData: {
      // BASIC INFORMATION FORM DATA
      ippisNo: '',
      firstName: '',
      lastName: '',
      middleNames: '',
      initials: '',
      dateOfBirth: '',
      phoneNumber: '',
      countryOfBirthId: '',
      nationalityId: '',
      email: '',
      pfaNumber: '',
      pfaId: '',
      genderId: '',
      bloodGroupId: '',
      gpzId: '',
      lgaId: '',
      maritalStatusId: '',
      senatorialDistrictId: '',
      professional: '',
      stateId: '',
      address: '',

      // JOB INFORMATION FORM DATA
      departmentId: '',
      sectionId: '',
      districtId: '',
      // location: '',
      reportTo: '',
      employeeStatusId: '',
      pensionable: '',

      // APPOINTMENT INFORMATION FORM DATA
      firstAppointmentDate: '',
      resumptionDate: '',
      confirmationDate: '',
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

    optionsFetched: false,

    departmentOptions: [],
    districtOptions: [],
    genderOptions: [],
    bloodGroupOptions: [],
    jobTypeOptions: [],
    jobTitleOptions: [],
    jobGradeOptions: [],
    jobStepOptions: [],
    pfaOptions: [],
    gpzOptions: [],
    maritalStatusOptions: [],
    senatorialDistrictOptions: [],
    stateOptions: [],
    lgaOptions: [],
    countryOptions: [],
    sectionOptions: [],
    stepOptions: [],
    salaryStructureOptions: [],
    employeeStatusOptions: [],

    ippisNoVerified: false,
    nrcNoVerified: false,
  };

  async componentDidMount() {
    const [
      departments,
      districts,
      bloodGroups,
      jobTypes,
      jobTitles,
      jobGrades,
      pfa,
      gpz,
      maritalStatuses,
      senatorialDistricts,
      states,
      lga,
      countries,
      sections,
      steps,
      genders,
      salaryStructures,
      employeeStatuses,
    ] = await httpService.all([
      httpService.get('/departments?statusId=1'),
      httpService.get('/districts?statusId=1'),
      httpService.get('/blood-groups'),
      httpService.get('/job-types?statusId=1'),
      httpService.get('/job-titles?statusId=1'),
      httpService.get('/job-grades'),
      httpService.get('/pfa?statusId=1'),
      httpService.get('/gpz'),
      httpService.get('/marital-statuses'),
      httpService.get('/senatorial-districts'),
      httpService.get('/states'),
      httpService.get('/lga'),
      httpService.get('/countries'),
      httpService.get('/sections?statusId=1'),
      httpService.get('/steps'),
      httpService.get('/genders'),
      httpService.get('/salary-structures'),
      httpService.get('/employee-statuses'),
    ]);

    if (departments) {
      this.setState({
        departmentOptions: departments.data.data,
        districtOptions: districts.data.data,
        bloodGroupOptions: bloodGroups.data.data,
        jobTypeOptions: jobTypes.data.data,
        jobTitleOptions: jobTitles.data.data,
        jobGradeOptions: jobGrades.data.data,
        pfaOptions: pfa.data.data,
        gpzOptions: gpz.data.data,
        lgaOptions: lga.data.data,
        maritalStatusOptions: maritalStatuses.data.data,
        senatorialDistrictOptions: senatorialDistricts.data.data,
        stateOptions: states.data.data,
        countryOptions: countries.data.data,
        sectionOptions: sections.data.data,
        jobStepOptions: steps.data.data,
        genderOptions: genders.data.data,
        salaryStructureOptions: salaryStructures.data.data,
        employeeStatusOptions: employeeStatuses.data.data,
        optionsFetched: true,
      });
    }
  }

  schema = {
    // BASIC INFORMATION SCHEMA
    ippisNo: Joi.string().min(5).max(6).required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    middleNames: Joi.string(),
    initials: Joi.string().allow('').optional(),
    dateOfBirth: Joi.string(),
    phoneNumber: Joi.number(),
    countryOfBirthId: Joi.number(),
    nationalityId: Joi.number(),
    email: Joi.string().email().allow('').optional(),
    pfaNumber: Joi.number(),
    pfaId: Joi.number(),
    genderId: Joi.number(),
    bloodGroupId: Joi.number(),
    gpzId: Joi.number(),
    lgaId: Joi.number(),
    maritalStatusId: Joi.number(),
    senatorialDistrictId: Joi.number(),
    stateId: Joi.number(),
    professional: Joi.string(),
    address: Joi.string().allow('').optional(),

    // JOB INFORMATION SCHEMA

    departmentId: Joi.number(),
    districtId: Joi.number(),
    sectionId: Joi.number(),
    salaryStructureId: Joi.number(),
    // location: Joi.string(),
    reportTo: Joi.number().allow('').optional(),
    employeeStatusId: Joi.number(),
    pensionable: Joi.string(),

    // APPOINTMENT INFORMATION SCHEMA
    firstAppointmentDate: Joi.string(),
    resumptionDate: Joi.string(),
    confirmationDate: Joi.string(),
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

  handleEmployeeSelection() {
    this.setState({ reportToVerified: true });
  }

  handleEmployeeInputChange(employee) {
    const condition =
      `${this.reportTo.value}`.length > 5 &&
      `${this.reportTo.value}`.length <= 6;
    if (!employee || !condition) {
      this.setState({ reportToVerified: false });
    }
  }

  handleIppisResponseRecieved(employees) {
    console.log('ippis character length', this.ippisNo);
    if (
      !employees.length &&
      `${this.ippisNo.value}`.length >= 5 &&
      `${this.ippisNo.value}`.length <= 6
    ) {
      this.setState({ ippisNoVerified: true });
    } else {
      this.setState({ ippisNoVerified: false });
    }
  }

  handleNrcNoResponseRecieved(employees) {
    if (!employees.length) {
      this.state.errors['nrcNo'] = 'NRC number already exists';
      this.setState({ nrcNoVerified: true });
    } else {
      this.setState({ nrcNoVerified: false });
    }
  }

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  async doSubmit(event, stopProcessing) {
    const res = await http.post('/employees', this.state.formData);
    stopProcessing();

    console.log(res);
    if (res) {
      toast.success('Employee successfully registered!');
      this.Form.reset();
      this.resetFormData();
      this.ippisNo.focus();
    }
  }

  render() {
    const { nrcNoVerified, ippisNoVerified, formData } = this.state;

    return this.state.optionsFetched ? (
      <Section title="add new employee">
        <PageNotice>
          Clicking the "save" button saves the data then clears the form to add
          another employee. Click "proceed to profile" button to save and
          redirect to the employee's profile
        </PageNotice>
        <form onSubmit={this.handleSubmit} ref={(form) => (this.Form = form)}>
          <InformationBlock title="">
            <EmployeeVerifier
              preventDefault
              checkOnResponseRecieved={(employees) => !employees.length}
              onResponseReceived={this.handleIppisResponseRecieved}
            >
              {this.renderInput(
                'IPPIS No.',
                'ippisNo',
                'Please enter a valid IPPIS number',
                null,
                'number'
              )}
            </EmployeeVerifier>
          </InformationBlock>

          {ippisNoVerified ? (
            <>
              <InformationBlock title="basic information">
                {this.renderInput('first Name', 'firstName')}
                {this.renderInput('last Name', 'lastName')}
                {this.renderInput('middle Names', 'middleNames')}
                {this.renderInput('initials', 'initials')}
                {this.renderInput(
                  'date of birth',
                  'dateOfBirth',
                  null,
                  null,
                  'date'
                )}
                {this.renderInput(
                  'phone number',
                  'phoneNumber',
                  null,
                  null,
                  'number'
                )}
                {this.renderInput('email', 'email', null, null, 'email')}
                {this.renderSelect(
                  'pension fund administrator',
                  'pfaId',
                  nameMapper(this.state.pfaOptions, 'name')
                )}
                {this.renderInput(
                  'PFA number',
                  'pfaNumber',
                  null,
                  null,
                  'number'
                )}
                {this.renderSelect(
                  'gender',
                  'genderId',
                  nameMapper(this.state.genderOptions, 'type')
                )}
                {this.renderSelect(
                  'blood group',
                  'bloodGroupId',
                  nameMapper(this.state.bloodGroupOptions, 'type')
                )}
                {this.renderSelect(
                  'marital status',
                  'maritalStatusId',
                  nameMapper(this.state.maritalStatusOptions, 'status')
                )}
                {this.renderSelect(
                  'country of birth',
                  'countryOfBirthId',
                  nameMapper(this.state.countryOptions, 'country')
                )}
                {this.renderSelect(
                  'nationality',
                  'nationalityId',
                  nameMapper(this.state.countryOptions, 'country')
                )}
                {this.renderSelect(
                  'GPZ',
                  'gpzId',
                  nameMapper(this.state.gpzOptions, 'description')
                )}
                {this.renderSelect(
                  'state',
                  'stateId',
                  nameMapper(
                    hashMap(
                      this.state.stateOptions,
                      'gpzId',
                      Number(formData.gpzId)
                    ),
                    'state'
                  )
                )}
                {this.renderSelect(
                  'senatorial district',
                  'senatorialDistrictId',
                  nameMapper(
                    hashMap(
                      this.state.senatorialDistrictOptions,
                      'stateId',
                      Number(formData.stateId)
                    ),
                    'name'
                  )
                )}
                {this.renderSelect(
                  'LGA',
                  'lgaId',
                  nameMapper(
                    hashMap(
                      this.state.lgaOptions,
                      'stateId',
                      Number(formData.stateId)
                    ),
                    'lga'
                  )
                )}
                {this.renderSelect('professional', 'professional', [
                  { id: 'Y', name: 'Y' },
                  { id: 'N', name: 'N' },
                ])}
                {this.renderInput('address', 'address', null)}
              </InformationBlock>

              <InformationBlock title="job information">
                {this.renderInput(
                  `who ${
                    this.state.formData.firstName || 'this employee'
                  } reports to`,
                  'reportTo',
                  'Please enter a valid IPPIS number',
                  null,
                  'number'
                )}
                {this.renderSelect(
                  'section',
                  'sectionId',
                  nameMapper(this.state.sectionOptions, 'description')
                )}
                {this.renderSelect(
                  'salary structure',
                  'salaryStructureId',
                  nameMapper(this.state.salaryStructureOptions, 'description')
                )}
                {this.renderSelect(
                  'employee status',
                  'employeeStatusId',
                  nameMapper(this.state.employeeStatusOptions, 'description')
                )}
                {this.renderSelect('pensionable', 'pensionable', [
                  { id: 'Y', name: 'Y' },
                  { id: 'N', name: 'N' },
                ])}
                {this.renderSelect(
                  'department',
                  'departmentId',
                  nameMapper(this.state.departmentOptions, 'description')
                )}
                {this.renderSelect(
                  'district',
                  'districtId',
                  nameMapper(this.state.districtOptions, 'siteName')
                )}
              </InformationBlock>

              <InformationBlock title="appointment information">
                {this.renderInput(
                  'first appointment date',
                  'firstAppointmentDate',
                  null,
                  null,
                  'date'
                )}
                {this.renderInput(
                  'resumption date',
                  'resumptionDate',
                  null,
                  null,
                  'date'
                )}
                {this.renderInput(
                  'confirmation date',
                  'confirmationDate',
                  null,
                  null,
                  'date'
                )}
                {this.renderInput(
                  'present appointment date',
                  'presentAppointmentDate',
                  null,
                  null,
                  'date'
                )}

                {this.renderSelect(
                  'first appointment job type',
                  'firstAppointmentJobTypeId',
                  nameMapper(this.state.jobTypeOptions, 'type')
                )}
                {this.renderSelect(
                  'first appointment job title',
                  'firstAppointmentJobTitleId',
                  nameMapper(this.state.jobTitleOptions, 'description')
                )}
                {this.renderSelect(
                  'first appointment grade',
                  'firstAppointmentGradeId',
                  nameMapper(this.state.jobGradeOptions, 'con')
                )}
                {this.renderSelect(
                  'first appointment step',
                  'firstAppointmentStepId',
                  nameMapper(this.state.jobStepOptions, 'step')
                )}
                {this.renderSelect(
                  'present position job type',
                  'presentPositionJobTypeId',
                  nameMapper(this.state.jobTypeOptions, 'type')
                )}
                {this.renderSelect(
                  'present position job title',
                  'presentPositionJobTitleId',
                  nameMapper(this.state.jobTitleOptions, 'description')
                )}
                {this.renderSelect(
                  'present position grade',
                  'presentPositionGradeId',
                  nameMapper(this.state.jobGradeOptions, 'con')
                )}
                {this.renderSelect(
                  'present position step',
                  'presentPositionStepId',
                  nameMapper(this.state.jobStepOptions, 'step')
                )}
              </InformationBlock>
            </>
          ) : null}

          {this.renderButton('save')}
          {/* {this.renderButton('proceed to profile')} */}
        </form>
      </Section>
    ) : (
      <Loader message="please wait..." />
    );
  }
}
