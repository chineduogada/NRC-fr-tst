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
        sectionOptions: [],
        employeeStatusOptions: [],
        salaryStructureOptions: [],
      },

      showForm: false,
    };

    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleUpdateSuccess = this.handleUpdateSuccess.bind(this);
  }

  async fetchSelectComponentOptions() {
    const [
      departments,
      districts,
      sections,
      employeeStatuses,
      salaryStructures,
    ] = await httpService.all([
      httpService.get('/departments?statusId=1'),
      httpService.get('/districts?statusId=1'),
      httpService.get('/sections?statusId=1'),
      httpService.get('/employee-statuses'),
      httpService.get('/salary-structures'),
    ]);

    if (departments) {
      const options = {
        departmentOptions: nameMapper(departments.data.data, 'description'),
        districtOptions: nameMapper(districts.data.data, 'siteName'),
        sectionOptions: nameMapper(sections.data.data, 'description'),
        employeeStatusOptions: nameMapper(
          employeeStatuses.data.data,
          'description'
        ),
        salaryStructureOptions: nameMapper(
          salaryStructures.data.data,
          'description'
        ),
      };
      this.setState({
        options,
      });
    }
  }

  async fetchEmployeeData() {
    const res = await httpService.get(`/employees/${this.props.ippisNo}/job`);

    if (res) {
      const jobInformation = this.mapToViewModel(res.data.data);

      this.setState({
        jobInformation,
        originalData: res.data.data,
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
        value: data && data.department ? data.department.description : null,
      },
      {
        label: 'district',
        value: data && data.district ? data.district.siteName : null,
      },
      // { label: 'location', value: data ? data.location : null },
      {
        label: 'section',
        value: data && data.section ? data.section.description : null,
      },
      {
        label: 'salary structure',
        value:
          data && data.salaryStructure
            ? data.salaryStructure.description
            : null,
      },
      {
        label: 'employee status',
        value:
          data && data.employeeStatus ? data.employeeStatus.description : null,
      },
      { label: 'pensionable', value: data ? data.pensionable : null },
      // {
      //   label: 'report to',
      //   value:
      //     data && data.reportToEmployee ? (
      //       <a href={`/employees/${data.reportToEmployee.ippisNo}`}>
      //         {`${data.reportToEmployee.firstName} ${data.reportToEmployee.lastName}`}
      //       </a>
      //     ) : null
      // }
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
            <UpdateForm
              options={this.state.options}
              ippisNo={this.props.ippisNo}
              defaultValues={this.state.originalData}
              onSuccess={this.handleUpdateSuccess}
            />
          </div>
        ) : (
          <React.Fragment>
            <EmployeeInfoBlock data={jobInformation} title="" />
          </React.Fragment>
        )}
      </div>
    ) : (
      <Loader />
    );
  }
}
