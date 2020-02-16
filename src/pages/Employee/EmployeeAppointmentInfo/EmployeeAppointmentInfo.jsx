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
      appointmentInformation: null,

      originalData: {},

      options: {
        jobTypeOptions: [],
        jobTitleOptions: [],
        jobGradeOptions: [],
        jobStepOptions: []
      },

      showForm: false
    };

    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleUpdateSuccess = this.handleUpdateSuccess.bind(this);
  }

  async fetchSelectComponentOptions() {
    const [jobTypes, jobTitles, jobGrades, steps] = await httpService.all([
      httpService.get('/job-types?statusId=1'),
      httpService.get('/job-titles?statusId=1'),
      httpService.get('/job-grades'),
      httpService.get('/steps')
    ]);

    if (jobTypes) {
      const options = {
        jobTypeOptions: nameMapper(jobTypes.data.data, 'type'),
        jobTitleOptions: nameMapper(jobTitles.data.data, 'description'),
        jobGradeOptions: nameMapper(jobGrades.data.data, 'con'),
        jobStepOptions: nameMapper(steps.data.data, 'step')
      };
      this.setState({
        options
      });
    }
  }

  async fetchEmployeeData() {
    const res = await httpService.get(
      `/employees/${this.props.ippisNo}/appointment`
    );

    if (res) {
      const appointmentInformation = this.mapToViewModel(res.data.data);

      this.setState({
        appointmentInformation,
        originalData: res.data.data
      });
    }
  }

  async componentDidMount() {
    this.fetchEmployeeData();
    this.fetchSelectComponentOptions();
  }

  mapToViewModel(data) {
    const {
      firstJobGrade,
      firstJobType,
      firstJobTitle,
      presentJobGrade,
      presentJobType,
      presentJobTitle
    } = data;
    return [
      { label: 'first appointment date', value: data.firstAppointmentDate },
      { label: 'resumption date', value: data.resumptionDate },
      { label: 'confirmation date', value: data.confirmationDate },
      { label: 'expected retirement date', value: data.expectedRetirementDate },
      { label: 'present appointment date', value: data.presentAppointmentDate },
      {
        label: 'first job type',
        value: firstJobType ? data.firstJobType.type : null
      },
      {
        label: 'first job title',
        value: firstJobTitle ? data.firstJobTitle.description : null
      },
      {
        label: 'first job grade',
        value: firstJobGrade ? data.firstJobGrade.con : null
      },
      {
        label: 'first step',
        value: firstJobGrade ? data.firstJobGrade.con : null
      },
      {
        label: 'present job type',
        value: presentJobType ? data.presentJobType.type : null
      },
      {
        label: 'present job title',
        value: presentJobTitle ? data.presentJobTitle.description : null
      },
      {
        label: 'present job grade',
        value: presentJobGrade ? data.presentJobGrade.con : null
      },
      {
        label: 'present step',
        value: presentJobGrade ? data.presentJobGrade.con : null
      }
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
    const { basicInformation, appointmentInformation, showForm } = this.state;
    return appointmentInformation ? (
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
              label="update appointment details"
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
            <EmployeeInfoBlock data={appointmentInformation} />
          </React.Fragment>
        )}
      </div>
    ) : (
      <Loader />
    );
  }
}
