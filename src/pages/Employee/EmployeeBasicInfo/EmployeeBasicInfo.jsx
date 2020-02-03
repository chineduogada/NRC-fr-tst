import React, { Component } from 'react';
import http from '../../../services/httpService';
import EmployeeInfoBlock from '../EmployeeInfoBlock/EmployeeInfoBlock';
import Loader from '../../../components/Loader/Loader';
import UpdateForm from './updateForm';
import Button from '../../../components/Button/Button';
import { toast } from 'react-toastify';

export default class EmployeeBasicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basicInformation: null,
      otherInformation: null,

      originalData: {},

      showForm: false
    };

    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
  }

  async componentDidMount() {
    const res = await http.get(`/employees/${this.props.ippisNo}`);

    if (res) {
      const basicInformation = this.mapToBasicView(res.data.data);
      const otherInformation = this.mapToOtherView(res.data.data);

      this.setState({
        basicInformation,
        otherInformation,
        originalData: res.data.data
      });
    }
  }

  mapToBasicView(data) {
    return [
      { label: 'first name', value: data.firstName },
      { label: 'last name', value: data.lastName },
      { label: 'middle names', value: data.middleNames },
      { label: 'initials', value: data.initials },
      { label: 'nrcNo', value: data.nrcNo },
      { label: 'date of birth', value: data.dateOfBirth },
      { label: 'phone number', value: data.phoneNumber },
      { label: 'country of birth', value: data.countryOfBirth.country },
      { label: 'nationality', value: data.nationality.country },
      { label: 'email', value: data.email },
      { label: 'pfa number', value: data.pfaNumber },
      { label: 'pfa', value: data.pfa.name },
      { label: 'gender', value: data.gender.type },
      { label: 'blood group', value: data.bloodGroup.type },
      { label: 'gpz', value: data.gpz.name },
      { label: 'lga', value: data.lga.lga },
      {
        label: 'marital status',
        value: data.maritalStatus.status
      },
      {
        label: 'senatorial district',
        value: data.senatorialDistrict.name
      },
      { label: 'state', value: data.state.state }
    ];
  }
  mapToOtherView(data) {
    return [
      { label: 'efxf01', value: data.efxf01 },
      { label: 'efxf02', value: data.efxf02 },
      { label: 'efxf03', value: data.efxf03 },
      { label: 'efxf04', value: data.efxf04 },
      { label: 'efxf05', value: data.efxf05 },
      { label: 'ef9f01', value: data.ef9f01 },
      { label: 'ef9f02', value: data.ef9f02 },
      { label: 'ef9f03', value: data.ef9f03 },
      { label: 'ef9f04', value: data.ef9f04 },
      { label: 'efdf01', value: data.efdf01 },
      { label: 'efdf02', value: data.efdf02 }
    ];
  }

  handleUpdateButtonClick() {
    this.setState({ showForm: !this.state.showForm });
  }

  render() {
    const { basicInformation, otherInformation, showForm } = this.state;
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
            <UpdateForm defaultValues={this.state.originalData} />
          </div>
        ) : (
          <React.Fragment>
            <EmployeeInfoBlock data={basicInformation} title="" />
            <EmployeeInfoBlock data={otherInformation} title="" />
          </React.Fragment>
        )}
      </div>
    ) : (
      <Loader />
    );
  }
}
