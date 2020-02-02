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
import Loader from '../../components/Loader/Loader';

export default class AddNewEmployee extends Form {
  state = {
    formData: {
      // BASIC INFORMATION FORM DATA
      ippisNo: '',
      firstName: '',
      lastName: '',
      middleNames: '',
      initials: '',
      nrcNo: '',
      dateOfBirth: '',
      phoneNumber: '',
      countryOfBirth: '',
      nationality: '',
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

      // JOB INFORMATION FORM DATA
      departmentId: '',
      section: '',
      districtId: '',
      location: '',
      reportTo: '',
      employeeStatus: '',
      pensionable: '',

      // APPOINTMENT INFORMATION FORM DATA
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
      presentPositionStepId: ''
    },

    errors: {},

    departmentOptions: [],
    districtOptions: [],
    bloodGroupOptions: [],
    jobTypeOptions: [],
    jobTitleOptions: [],
    jobGradeOptions: [],
    pfaOptions: [],
    gpzOptions: [],
    maritalStatusOptions: [],
    senatorialDistrictOptions: [],
    stateOptions: [],
    lgaOptions: [],
    countryOptions: []
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
      countries
    ] = await httpService.all([
      httpService.get('/departments'),
      httpService.get('/districts'),
      httpService.get('/blood-groups'),
      httpService.get('/job-types'),
      httpService.get('/job-titles'),
      httpService.get('/job-grades'),
      httpService.get('/pfa'),
      httpService.get('/gpz'),
      httpService.get('/marital-statuses'),
      httpService.get('/senatorial-districts'),
      httpService.get('/states'),
      httpService.get('/lga'),
      httpService.get('/countries')
    ]);

    if (departments) {
      this.setState({
        departmentOptions: nameMapper(departments.data.data, 'description'),
        districtOptions: nameMapper(districts.data.data, 'siteName'),
        bloodGroupOptions: nameMapper(bloodGroups.data.data, 'type'),
        jobTypeOptions: nameMapper(jobTypes.data.data, 'type'),
        jobTitleOptions: nameMapper(jobTitles.data.data, 'description'),
        jobGradeOptions: nameMapper(jobGrades.data.data, 'conpss'),
        pfaOptions: nameMapper(pfa.data.data, 'name'),
        gpzOptions: nameMapper(gpz.data.data, 'name'),
        lgaOptions: nameMapper(lga.data.data, 'lga'),
        maritalStatusOptions: nameMapper(maritalStatuses.data.data, 'status'),
        senatorialDistrictOptions: nameMapper(
          senatorialDistricts.data.data,
          'name'
        ),
        stateOptions: nameMapper(states.data.data, 'state'),
        countryOptions: nameMapper(countries.data.data, 'country')
      });
    }
  }

  schema = {
    // BASIC INFORMATION SCHEMA
    ippisNo: Joi.number(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    middleNames: Joi.string(),
    initials: Joi.string(),
    nrcNo: Joi.number(),
    dateOfBirth: Joi.string(),
    phoneNumber: Joi.number(),
    countryOfBirth: Joi.string(),
    nationality: Joi.string(),
    email: Joi.string().email(),
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

    // JOB INFORMATION SCHEMA

    departmentId: Joi.number(),
    districtId: Joi.number(),
    section: Joi.string(),
    location: Joi.string(),
    reportTo: Joi.number(),
    employeeStatus: Joi.string(),
    pensionable: Joi.string(),

    // APPOINTMENT INFORMATION SCHEMA
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
    presentPositionStepId: Joi.number()
  };

  async doSubmit(event, stopProcessing) {
    const res = await http.post('/employees', this.state.formData);
    stopProcessing();

    console.log(res);
    if (res) {
      toast.success('Employee successfully registered!');
      this.Form.reset();
    }
  }

  render() {
    return this.state.departmentOptions.length ? (
      <Section title='add new employee'>
        <PageNotice>
          Clicking the "save" button saves the data then clears the form to add
          another employee. Click "proceed to profile" button to save and
          redirect to the employee's profile
        </PageNotice>
        <form onSubmit={this.handleSubmit} ref={form => (this.Form = form)}>
          <InformationBlock title='basic information'>
            {this.renderInput('IPPISNO', 'ippisNo', null, null, 'number')}
            {this.renderInput('first Name', 'firstName')}
            {this.renderInput('last Name', 'lastName')}
            {this.renderInput('middle Names', 'middleNames')}
            {this.renderInput('initials', 'initials')}
            {this.renderInput('NRC number', 'nrcNo', null, null, 'number')}
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
              this.state.pfaOptions
            )}

            {this.renderInput('PFA number', 'pfaNumber', null, null, 'number')}

            {this.renderSelect('gender', 'genderId', [
              { id: 1, name: 'male' },
              { id: 2, name: 'female' }
            ])}
            {this.renderSelect(
              'blood group',
              'bloodGroupId',
              this.state.bloodGroupOptions
            )}
            {this.renderSelect(
              'marital status',
              'maritalStatusId',
              this.state.maritalStatusOptions
            )}
            {this.renderSelect(
              'country of birth',
              'countryOfBirth',
              this.state.countryOptions
            )}
            {this.renderSelect(
              'nationality',
              'nationality',
              this.state.countryOptions
            )}
            {this.renderSelect('GPZ', 'gpzId', this.state.gpzOptions)}
            {this.renderSelect('state', 'stateId', this.state.stateOptions)}
            {this.renderSelect(
              'senatorial district',
              'senatorialDistrictId',
              this.state.senatorialDistrictOptions
            )}
            {this.renderSelect('LGA', 'lgaId', this.state.lgaOptions)}
            {this.renderSelect('professional', 'professional', [
              { id: 'Y', name: 'Y' },
              { id: 'N', name: 'N' }
            ])}
          </InformationBlock>

          <InformationBlock title='job information'>
            {this.renderInput('section', 'section', null, null, 'number')}
            {this.renderInput('location', 'location', '')}
            {this.renderInput(
              'report to',
              'reportTo',
              'enter ippiNo...',
              null,
              'number'
            )}
            {this.renderSelect('employee status', 'employeeStatus', [
              { id: 'A', name: 'Active' },
              { id: 'R', name: 'Retired' },
              { id: 'S', name: 'Suspended' }
            ])}
            {this.renderSelect('pensionable', 'pensionable', [
              { id: 'Y', name: 'Y' },
              { id: 'N', name: 'N' }
            ])}
            {this.renderSelect(
              'department',
              'departmentId',
              this.state.departmentOptions
            )}
            {this.renderSelect(
              'district',
              'districtId',
              this.state.districtOptions
            )}
          </InformationBlock>

          <InformationBlock title='appointment information'>
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
              'expected retirement date',
              'expectedRetirementDate',
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
              this.state.jobTypeOptions
            )}
            {this.renderSelect(
              'first appointment job title',
              'firstAppointmentJobTitleId',
              this.state.jobTitleOptions
            )}
            {this.renderSelect(
              'first appointment grade',
              'firstAppointmentGradeId',
              this.state.jobGradeOptions
            )}
            {this.renderSelect(
              'first appointment step',
              'firstAppointmentStepId',
              this.state.jobGradeOptions
            )}
            {this.renderSelect(
              'present position job type',
              'presentPositionJobTypeId',
              this.state.jobTypeOptions
            )}
            {this.renderSelect(
              'present position job title',
              'presentPositionJobTitleId',
              this.state.jobTitleOptions
            )}
            {this.renderSelect(
              'present position grade',
              'presentPositionGradeId',
              this.state.jobGradeOptions
            )}
            {this.renderSelect(
              'present position step',
              'presentPositionStepId',
              this.state.jobGradeOptions
            )}
          </InformationBlock>

          {this.renderButton('save')}
          {this.renderButton('proceed to profile')}
        </form>
      </Section>
    ) : (
      <Loader message='please wait...' />
    );
  }
}
