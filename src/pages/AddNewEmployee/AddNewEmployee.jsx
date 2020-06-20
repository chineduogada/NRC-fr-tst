import React from 'react';
import Section from '../../hoc/Section/Section';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { setOptions } from '../../store/options/actionCreators';
import nameMapper from '../../helpers/nameMapper';
import Form from '../../components/Form/Form';
import InformationBlock from '../../components/InformationBlock/InformationBlock';
import httpService from '../../services/httpService';
import PageNotice from '../../components/PageNotice/PageNotice';
import EmployeeVerifier from '../../components/EmployeeVerifier/EmployeeVerifier';
import Loader from '../../components/Loader/Loader';
import hashMap from '../../helpers/hashMap';
import autobind from '../../helpers/autobind';

class AddNewEmployee extends Form {
  constructor(props) {
    super(props);

    autobind(
      this,
      'handleEmployeeSelection',
      'handleEmployeeInputChange',
      'handleIppisResponseRecieved',
      'handleNrcNoResponseRecieved'
    );

    this.initialFormState = { ...this.state.formData };
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
    ippisNoVerified: false,
    nrcNoVerified: false,
  };

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

  handleIppisResponseRecieved = (employees) => {
    console.log('ippis character length', this, this.ippisNo);
    if (
      !employees.length &&
      `${this.ippisNo.value}`.length >= 5 &&
      `${this.ippisNo.value}`.length <= 6
    ) {
      this.setState({ ippisNoVerified: true });
    } else {
      this.setState({ ippisNoVerified: false });
    }
  };

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
    const res = await httpService.post('/employees', this.state.formData);
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

    return this.props.options.bloodGroups.length ? (
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
                  'gender',
                  'genderId',
                  nameMapper(this.props.options.genders, 'type')
                )}
                {this.renderSelect(
                  'blood group',
                  'bloodGroupId',
                  nameMapper(this.props.options.bloodGroups, 'type')
                )}
                {this.renderSelect(
                  'marital status',
                  'maritalStatusId',
                  nameMapper(this.props.options.maritalStatuses, 'status')
                )}
                {this.renderSelect(
                  'country of birth',
                  'countryOfBirthId',
                  nameMapper(this.props.options.countries, 'country')
                )}
                {this.renderSelect(
                  'nationality',
                  'nationalityId',
                  nameMapper(this.props.options.countries, 'country')
                )}
                {this.renderSelect(
                  'GPZ',
                  'gpzId',
                  nameMapper(this.props.options.gpz, 'description')
                )}
                {this.renderSelect(
                  'state',
                  'stateId',
                  nameMapper(
                    hashMap(
                      this.props.options.states,
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
                      this.props.options.senatorialDistricts,
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
                      this.props.options.lga,
                      'stateId',
                      Number(formData.stateId)
                    ),
                    'lga'
                  )
                )}
                {this.renderSelect(
                  'pension fund administrator',
                  'pfaId',
                  nameMapper(this.props.options.pfa, 'name')
                )}
                {this.renderInput(
                  'PFA number',
                  'pfaNumber',
                  null,
                  null,
                  'number'
                )}
                {this.renderSelect(
                  'professional',
                  'professional',
                  this.props.options.professional
                )}
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
                  nameMapper(this.props.options.sections, 'description')
                )}
                {this.renderSelect(
                  'salary structure',
                  'salaryStructureId',
                  nameMapper(this.props.options.salaryStructures, 'description')
                )}
                {this.renderSelect(
                  'employee status',
                  'employeeStatusId',
                  nameMapper(this.props.options.employeeStatuses, 'description')
                )}
                {this.renderSelect(
                  'pensionable',
                  'pensionable',
                  this.props.options.pensionable
                )}
                {this.renderSelect(
                  'department',
                  'departmentId',
                  nameMapper(this.props.options.departments, 'description')
                )}
                {this.renderSelect(
                  'district',
                  'districtId',
                  nameMapper(this.props.options.districts, 'siteName')
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
                  nameMapper(this.props.options.jobTypes, 'type')
                )}
                {this.renderSelect(
                  'first appointment job title',
                  'firstAppointmentJobTitleId',
                  nameMapper(this.props.options.jobTitles, 'description')
                )}
                {this.renderSelect(
                  'first appointment grade',
                  'firstAppointmentGradeId',
                  nameMapper(this.props.options.jobGrades, 'con')
                )}
                {this.renderSelect(
                  'first appointment step',
                  'firstAppointmentStepId',
                  nameMapper(this.props.options.steps, 'step')
                )}
                {this.renderSelect(
                  'present position job type',
                  'presentPositionJobTypeId',
                  nameMapper(this.props.options.jobTypes, 'type')
                )}
                {this.renderSelect(
                  'present position job title',
                  'presentPositionJobTitleId',
                  nameMapper(this.props.options.jobTitles, 'description')
                )}
                {this.renderSelect(
                  'present position grade',
                  'presentPositionGradeId',
                  nameMapper(this.props.options.jobGrades, 'con')
                )}
                {this.renderSelect(
                  'present position step',
                  'presentPositionStepId',
                  nameMapper(this.props.options.steps, 'step')
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

const mapStateToProps = (state) => {
  return {
    options: {
      departments: state.options.department,
      districts: state.options.district,
      bloodGroups: state.options.bloodGroup,
      jobTypes: state.options.jobType,
      jobTitles: state.options.jobTitle,
      jobGrades: state.options.jobGrade,
      pfa: state.options.pfa,
      gpz: state.options.gpz,
      maritalStatuses: state.options.maritalStatus,
      senatorialDistricts: state.options.senatorialDistrict,
      states: state.options.state,
      lga: state.options.lga,
      countries: state.options.country,
      sections: state.options.section,
      steps: state.options.step,
      genders: state.options.gender,
      salaryStructures: state.options.salaryStructure,
      employeeStatuses: state.options.employeeStatus,
      professional: state.options.professional,
      pensionable: state.options.pensionable,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setOptions: (payload) => dispatch(setOptions(payload)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewEmployee);
