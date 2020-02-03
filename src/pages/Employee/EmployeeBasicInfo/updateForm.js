import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import httpService from '../../../services/httpService';
import nameMapper from '../../../helpers/nameMapper';
import obJectKeyEliminator from '../../../helpers/obJectKeyEliminator';
import InformationBlock from '../../../components/InformationBlock/InformationBlock';
import Form from '../../../components/Form/Form';
import Loader from '../../../components/Loader/Loader';

export default class UpdateForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        ippisNo: '',
        firstName: '',
        lastName: '',
        middleNames: '',
        initials: '',
        nrcNo: '',
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
        stateId: ''
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
      countryOptions: [],

      defaultValues: null
    };

    this.schema = {
      ippisNo: Joi.number(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      middleNames: Joi.string(),
      initials: Joi.string(),
      nrcNo: Joi.number(),
      dateOfBirth: Joi.string(),
      phoneNumber: Joi.number(),
      countryOfBirthId: Joi.number(),
      nationalityId: Joi.number(),
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
      professional: Joi.string()
    };
  }

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
        countryOptions: nameMapper(countries.data.data, 'country'),

        // Store default values in formData
        formData: obJectKeyEliminator(this.props.defaultValues, [
          'gender',
          'bloodGroup',
          'countryOfBirth',
          'nationality',
          'gpz',
          'lga',
          'maritalStatus',
          'senatorialDistrict',
          'state',
          'pfa'
        ])
      });
    }
  }

  render() {
    const { formData, bloodGroupOptions } = this.state;
    return bloodGroupOptions.length ? (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} ref={form => (this.Form = form)}>
          <p className="form-header">Update Employee Basic Information</p>
          <InformationBlock>
            {this.renderInput(
              'IPPIS No',
              'ippisNo',
              null,
              formData.ippisNo,
              'number',
              null,
              true
            )}
            {this.renderInput(
              'first Name',
              'firstName',
              null,
              formData.firstName
            )}
            {this.renderInput('last Name', 'lastName', null, formData.lastName)}
            {this.renderInput(
              'middle Names',
              'middleNames',
              formData.middleNames
            )}
            {this.renderInput('initials', 'initials', null, formData.initials)}
            {this.renderInput(
              'NRC number',
              'nrcNo',
              null,
              formData.nrcNo,
              'number'
            )}
            {this.renderInput(
              'date of birth',
              'dateOfBirth',
              null,
              formData.dateOfBirth,
              'date'
            )}
            {this.renderInput(
              'phone number',
              'phoneNumber',
              null,
              formData.phoneNumber,
              'number'
            )}
            {this.renderInput('email', 'email', null, formData.email, 'email')}

            {this.renderSelect(
              'pension fund administrator',
              'pfaId',
              this.state.pfaOptions,
              null,
              null,
              formData.pfaId
            )}
            {this.renderInput(
              'PFA number',
              'pfaNumber',
              null,
              formData.pfaNumber,
              'number'
            )}
            {this.renderSelect(
              'country of birth',
              'countryOfBirthId',
              this.state.countryOptions,
              null,
              null,
              formData.countryOfBirthId
            )}
            {this.renderSelect(
              'nationality',
              'nationalityId',
              this.state.countryOptions,
              null,
              null,
              formData.nationalityId
            )}
            {this.renderSelect(
              'gender',
              'genderId',
              [
                { id: 1, name: 'male' },
                { id: 2, name: 'female' }
              ],
              null,
              null,
              formData.genderId
            )}
            {this.renderSelect(
              'blood group',
              'bloodGroupId',
              this.state.bloodGroupOptions,
              null,
              null,
              formData.bloodGroupId
            )}
            {this.renderSelect(
              'marital status',
              'maritalStatusId',
              this.state.maritalStatusOptions,
              null,
              null,
              formData.maritalStatusId
            )}
            {this.renderSelect(
              'GPZ',
              'gpzId',
              this.state.gpzOptions,
              null,
              null,
              formData.stateId
            )}
            {this.renderSelect('state', 'stateId', this.state.stateOptions)}
            {this.renderSelect(
              'senatorial district',
              'senatorialDistrictId',
              this.state.senatorialDistrictOptions,
              null,
              null,
              formData.senatorialDistrictId
            )}
            {this.renderSelect(
              'LGA',
              'lgaId',
              this.state.lgaOptions,
              null,
              null,
              formData.lgaId
            )}
            {this.renderSelect('professional', 'professional', [
              { id: 'Y', name: 'Y' },
              { id: 'N', name: 'N' },
              null,
              null,
              formData.professional
            ])}
          </InformationBlock>
          {this.renderButton('update')}
        </form>
      </React.Fragment>
    ) : (
      <Loader />
    );
  }
}
