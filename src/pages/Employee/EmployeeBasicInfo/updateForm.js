import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import httpService from '../../../services/httpService';
import obJectKeyEliminator from '../../../helpers/obJectKeyEliminator';
import InformationBlock from '../../../components/InformationBlock/InformationBlock';
import Form from '../../../components/Form/Form';
import hashMap from '../../../helpers/hashMap';
import nameMapper from '../../../helpers/nameMapper';

class UpdateForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
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
      },

      errors: {},

      options: null,

      defaultValues: null,
    };

    this.schema = {
      ippisNo: Joi.number(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      middleNames: Joi.string(),
      initials: Joi.string().allow('').optional(),
      dateOfBirth: Joi.string(),
      phoneNumber: Joi.number(),
      countryOfBirthId: Joi.required(),
      nationalityId: Joi.required(),
      email: Joi.string().allow('').optional(),
      pfaNumber: Joi.number(),
      photo: Joi.string().allow('').optional(),
      pfaId: Joi.required(),
      genderId: Joi.required(),
      bloodGroupId: Joi.required(),
      gpzId: Joi.required(),
      lgaId: Joi.required(),
      maritalStatusId: Joi.required(),
      senatorialDistrictId: Joi.required(),
      stateId: Joi.required(),
      professional: Joi.string().allow('').optional(),
    };
  }

  async componentDidMount() {
    const { defaultValues } = this.props;
    this.setState({
      formData: defaultValues
        ? obJectKeyEliminator(defaultValues, [
            'id',
            'efxf01',
            'efxf02',
            'efxf03',
            'efxf04',
            'efxf05',
            'ef9f01',
            'ef9f02',
            'ef9f03',
            'ef9f04',
            'efdf01',
            'efdf02',
            'photo',
            'createdAt',
            'updatedAt',
            'gender',
            'bloodGroup',
            'countryOfBirth',
            'nationality',
            'gpz',
            'lga',
            'maritalStatus',
            'senatorialDistrict',
            'state',
            'pfa',
            'address',
          ])
        : this.state.formData,
    });
  }

  /**
   * Runs a callback passed as prop as soon as the API request is successful
   * and a response has been recieved
   */
  async onSuccess() {
    const { onSuccess } = this.props;

    if (onSuccess) {
      await onSuccess();
    }
  }

  async doSubmit() {
    const res = await httpService.patch(
      `/employees/${this.props.ippisNo}`,
      this.state.formData
    );

    if (res) {
      // Run some external callback passed as prop
      await this.onSuccess();
      this.stopProcessing();
      toast.success('Updated successful');
    }
  }

  render() {
    const { formData, options } = this.state;
    console.log(formData);
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} ref={(form) => (this.Form = form)}>
          <p className="form-header">Update Employee Basic Information</p>
          <InformationBlock>
            {this.renderInput(
              'IPPIS No',
              'ippisNo',
              null,
              formData.ippisNo || '',
              'number',
              null,
              true
            )}
            {this.renderInput(
              'first Name',
              'firstName',
              null,
              formData.firstName || ''
            )}
            {this.renderInput(
              'last Name',
              'lastName',
              null,
              formData.lastName || ''
            )}
            {this.renderInput(
              'middle Names',
              'middleNames',
              formData.middleNames || ''
            )}
            {this.renderInput(
              'initials',
              'initials',
              null,
              formData.initials || ''
            )}
            {this.renderInput(
              'date of birth',
              'dateOfBirth',
              null,
              formData.dateOfBirth || '',
              'date',
              null,
              true
            )}
            {this.renderInput(
              'phone number',
              'phoneNumber',
              null,
              formData.phoneNumber || '',
              'number'
            )}
            {this.renderInput(
              'email',
              'email',
              null,
              formData.email || '',
              'email'
            )}

            {this.renderSelect(
              'pension fund administrator',
              'pfaId',
              nameMapper(this.props.options.pfa, 'name'),
              null,
              null,
              formData.pfaId || ''
            )}
            {this.renderInput(
              'PFA number',
              'pfaNumber',
              null,
              formData.pfaNumber || '',
              'number'
            )}
            {this.renderSelect(
              'country of birth',
              'countryOfBirthId',
              nameMapper(this.props.options.countries, 'country'),
              null,
              null,
              formData.countryOfBirthId || ''
            )}
            {this.renderSelect(
              'nationality',
              'nationalityId',
              nameMapper(this.props.options.countries, 'country'),
              null,
              null,
              formData.nationalityId || ''
            )}
            {this.renderSelect(
              'gender',
              'genderId',
              nameMapper(this.props.options.genders, 'type'),
              null,
              null,
              formData.genderId || ''
            )}
            {this.renderSelect(
              'blood group',
              'bloodGroupId',
              nameMapper(this.props.options.bloodGroups, 'type'),
              null,
              null,
              formData.bloodGroupId || ''
            )}
            {this.renderSelect(
              'marital status',
              'maritalStatusId',
              nameMapper(this.props.options.maritalStatuses, 'status'),
              null,
              null,
              formData.maritalStatusId || ''
            )}
            {this.renderSelect(
              'GPZ',
              'gpzId',
              nameMapper(this.props.options.gpz, 'description'),
              null,
              null,
              formData.gpzId || ''
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
              ),
              null,
              null,
              formData.stateId || ''
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
              ),
              null,
              null,
              formData.senatorialDistrictId || ''
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
              ),
              null,
              null,
              formData.lgaId || ''
            )}
            {this.renderSelect(
              'professional',
              'professional',
              this.props.options.professional,
              null,
              null,
              formData.professional || ''
            )}
          </InformationBlock>
          {this.renderButton('update')}
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: {
      departments: state.options.department,
      districts: state.options.district,
      bloodGroups: state.options.bloodGroup,
      pfa: state.options.pfa,
      gpz: state.options.gpz,
      maritalStatuses: state.options.maritalStatus,
      senatorialDistricts: state.options.senatorialDistrict,
      states: state.options.state,
      lga: state.options.lga,
      countries: state.options.country,
      genders: state.options.gender,
      professional: state.options.professional,
    },
  };
};

export default connect(mapStateToProps)(UpdateForm);
