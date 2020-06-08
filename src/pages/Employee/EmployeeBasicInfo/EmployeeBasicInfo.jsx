import React, { Component } from 'react';
import httpService from '../../../services/httpService';
import nameMapper from '../../../helpers/nameMapper';
import EmployeeInfoBlock from '../EmployeeInfoBlock/EmployeeInfoBlock';
import Loader from '../../../components/Loader/Loader';
import UpdateForm from './updateForm';
import Button from '../../../components/Button/Button';

export default class EmployeeBasicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basicInformation: null,
      otherInformation: null,

      originalData: {},

      options: {
        bloodGroupOptions: [],
        pfaOptions: [],
        gpzOptions: [],
        maritalStatusOptions: [],
        senatorialDistrictOptions: [],
        stateOptions: [],
        lgaOptions: [],
        countryOptions: [],
        genders: [],
      },

      showForm: false,
    };

    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleUpdateSuccess = this.handleUpdateSuccess.bind(this);
  }

  async fetchSelectComponentOptions() {
    const [
      bloodGroups,
      pfa,
      gpz,
      maritalStatuses,
      senatorialDistricts,
      states,
      lga,
      countries,
      genders,
    ] = await httpService.all([
      httpService.get('/blood-groups'),
      httpService.get('/pfa?statusId=1'),
      httpService.get('/gpz'),
      httpService.get('/marital-statuses'),
      httpService.get('/senatorial-districts'),
      httpService.get('/states'),
      httpService.get('/lga'),
      httpService.get('/countries'),
      httpService.get('/genders'),
    ]);

    if (bloodGroups) {
      const options = {
        bloodGroupOptions: bloodGroups.data.data,
        pfaOptions: pfa.data.data,
        gpzOptions: gpz.data.data,
        lgaOptions: lga.data.data,
        maritalStatusOptions: maritalStatuses.data.data,
        senatorialDistrictOptions: senatorialDistricts.data.data,
        stateOptions: states.data.data,
        countryOptions: countries.data.data,
        genders: genders.data.data,
      };

      this.setState({
        options,
      });
    }
  }

  async fetchEmployeeData() {
    const res = await httpService.get(`/employees/${this.props.ippisNo}`);

    if (res) {
      const basicInformation = this.mapToBasicView(res.data.data);

      this.setState({
        basicInformation,
        originalData: res.data.data,
      });
    }
  }

  async componentDidMount() {
    this.fetchEmployeeData();
    this.fetchSelectComponentOptions();
  }

  mapToBasicView(data) {
    const {
      pfa,
      gpz,
      state,
      countryOfBirth,
      nationality,
      gender,
      bloodGroup,
      lga,
      maritalStatus,
      senatorialDistrict,
    } = data;
    return [
      { label: 'first name', value: data.firstName },
      { label: 'last name', value: data.lastName },
      { label: 'middle names', value: data.middleNames },
      { label: 'initials', value: data.initials },
      { label: 'date of birth', value: data.dateOfBirth },
      { label: 'phone number', value: data.phoneNumber },
      {
        label: 'country of birth',
        value: countryOfBirth ? countryOfBirth.country : null,
      },
      { label: 'nationality', value: nationality ? nationality.country : null },
      { label: 'email', value: data.email },
      { label: 'PFA number', value: data.pfaNumber },
      { label: 'PFA', value: pfa ? pfa.name : null },
      { label: 'gender', value: gender ? gender.type : null },
      { label: 'blood group', value: bloodGroup ? bloodGroup.type : null },
      { label: 'geo political zone', value: gpz ? gpz.description : null },
      { label: 'LGA', value: lga ? lga.lga : null },
      {
        label: 'marital status',
        value: maritalStatus ? maritalStatus.status : null,
      },
      {
        label: 'senatorial district',
        value: senatorialDistrict ? senatorialDistrict.name : null,
      },
      { label: 'state', value: state ? state.state : null },
      { label: 'professional', value: data.professional },
      { label: 'address', value: data.address },
    ];
  }

  async handleUpdateSuccess() {
    this.props.onUpdate();
    await this.fetchEmployeeData();
    this.setState({ showForm: false });
  }

  handleUpdateButtonClick() {
    this.setState({ showForm: !this.state.showForm });
  }

  render() {
    const { basicInformation, showForm } = this.state;
    return basicInformation ? (
      <div>
        <div className="Action">
          {showForm ? (
            <Button
              label="cancel"
              onClick={this.handleUpdateButtonClick}
              plain
            />
          ) : (
            <Button
              label="update basic details"
              onClick={this.handleUpdateButtonClick}
              highlight
            />
          )}
        </div>
        {showForm ? (
          <div>
            <UpdateForm
              options={this.state.options}
              ippisNo={this.props.ippisNo}
              defaultValues={this.state.originalData}
              onSuccess={this.handleUpdateSuccess}
            />
          </div>
        ) : (
          <React.Fragment>
            <EmployeeInfoBlock data={basicInformation} title="" />
            {/* <EmployeeInfoBlock data={otherInformation} title="" /> */}
          </React.Fragment>
        )}
      </div>
    ) : (
      <Loader />
    );
  }
}
