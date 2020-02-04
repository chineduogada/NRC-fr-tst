import React, { Component } from 'react';
import EmployeeInfoBlock from '../EmployeeInfoBlock/EmployeeInfoBlock';
import httpService from '../../../services/httpService';
import nameMapper from '../../../helpers/nameMapper';
import Loader from '../../../components/Loader/Loader';
import UpdateForm from './updateForm';
import Button from '../../../components/Button/Button';
// import { Link } from "react-router-dom";

export default class EmployeeBasicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobInformation: null,

      originalData: {},

      options: {
        departmentOptions: [],
        districtOptions: [],
      },

      showForm: false
    };

    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleUpdateSuccess = this.handleUpdateSuccess.bind(this);
  }

  async fetchSelectComponentOptions() {
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
      httpService.get('/districts?statusId=1')
    ]);

    const options = {
      departmentOptions: nameMapper(departments.data.data, 'description'),
      districtOptions: nameMapper(districts.data.data, 'siteName')
    }

    if (departments) {
      this.setState({
        options
      });
    }
  }

  async fetchEmployeeData() {
    const res = await httpService.get(`/employees/${this.props.ippisNo}/job`);

    if (res) {
      const jobInformation = this.mapToViewModel(res.data.data);

      this.setState({
        jobInformation,
        originalData: res.data.data
      });
    }
  }

  async componentDidMount() {
    this.fetchEmployeeData();
    this.fetchSelectComponentOptions();
  }

  mapToViewModel(data) {
    return [
      {
        label: 'department',
        value: data.department.description
      },
      { label: 'district', value: data.district.siteName },
      { label: 'location', value: data.location },
      { label: 'section', value: data.section.section },
      { label: 'employee status', value: data.employeeStatus.status },
      { label: 'pensionable', value: data.pensionable },
      {
        label: 'report to',
        value: (
          <a href={`/employees/${data.reportToEmployee.ippisNo}`}>
            {`${data.reportToEmployee.firstName} ${data.reportToEmployee.lastName}`}
          </a>
        )
      }
    ];
  }

  async handleUpdateSuccess() {
    await this.fetchEmployeeData();
    this.setState({ showForm: false })
  }

  handleUpdateButtonClick() {
    this.setState({ showForm: !this.state.showForm });
  }


  render() {
    const { jobInformation, showForm } = this.state;

    return jobInformation ? (
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
              label="update job details"
              onClick={this.handleUpdateButtonClick}
              highlight
            />
          )}
        </div>
        {showForm ? (
          <div>
            <UpdateForm options={this.state.options} ippisNo={this.props.ippisNo} defaultValues={this.state.originalData} onSuccess={this.handleUpdateSuccess} />
          </div>
        ) : (
          <React.Fragment>
            <EmployeeInfoBlock data={jobInformation} title='' />
          </React.Fragment>
        )}
      </div>
    ) : (
      <Loader />
    );
  }
}
