import React, { Component } from 'react';
import TabsComponent from '../../components/Tabs/Tabs';
import Button from '../../components/Button/Button';
import EmployeeBasicInfo from './EmployeeBasicInfo/EmployeeBasicInfo';
import EmployeeJobInfo from './EmployeeJobInfo/EmployeeJobInfo';
import EmployeeAppointmentInfo from './EmployeeAppointmentInfo/EmployeeAppointmentInfo';
import EmployeeRelationInfo from './EmployeeRelationInfo/EmployeeRelationInfo';
import EmployeeCareerInfo from './EmployeeCareerInfo/EmployeeCareerInfo';
import EmployeeTrainingRecords from './EmployeeTrainingRecords/EmployeeTrainingRecords';
import EmployeeCareer from './EmployeeCareer/EmployeeCareer';
import EmployeeSkills from '../EmployeeSkills/EmployeeSkills';
import EmployeeQualifications from '../EmployeeQualifications/EmployeeQualifications';
import fileUploadAssistant from '../../helpers/fileUploadAssistant';
import httpService from '../../services/httpService';
import { mapEmployeeStatus } from '../../services/employeeService';
import { GetImage } from '../../services/employeeService';
import classes from './Employee.module.scss';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.ippisNo = this.props.match.params.ippisNo;

    this.state = {
      currentIppisNumber: null,
      tabs: [
        { label: 'Basic Information', key: 'basicInformation' },
        { label: 'Job Information', key: 'jobInformation' },
        { label: 'Appointment', key: 'appointment' },
        { label: 'Relations', key: 'relations' },
        { label: 'Career', key: 'career' },
        { label: 'Trainings', key: 'trainings' },
        { label: 'Skills', key: 'skills' },
        { label: 'Qualifications', key: 'qualifications' }
      ],

      uploading: false,
      justFetchingImage: true,

      employeeImageSrc: 'is loading',
      fullName: '',
      department: '',
      employeeStatus: '',
      presentJobType: '',

      activeTab: 'basicInformation'
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.fetchSimpleProfile = this.fetchSimpleProfile.bind(this);
  }

  async fetchSimpleProfile() {
    const res = await httpService.get(`/employees?ippisNo=${this.ippisNo}`);

    if (res) {
      const {
        photo,
        firstName,
        lastName,
        employeeJob,
        employeeAppointment
      } = res.data.data.rows[0];

      const profile = {
        employeeImageSrc: photo,
        fullName: `${firstName} ${lastName}`
      };

      if (employeeJob) {
        profile.department = employeeJob.department
          ? employeeJob.department.description
          : null;
        profile.employeeStatus = mapEmployeeStatus(
          employeeJob.employeeStatus ? employeeJob.employeeStatus.status : null
        );
      }

      if (employeeAppointment) {
        profile.presentJobType = employeeAppointment.presentJobType
          ? employeeAppointment.presentJobType.type
          : null;
      }

      this.setState({
        justFetchingImage: false,
        ...profile
      });
    }
  }

  async componentDidMount() {
    this.fetchSimpleProfile();
  }

  toggleUploading() {
    this.setState({ uploading: !this.state.uploading });
  }

  handleTabChange = tab => {
    this.setState({ activeTab: tab });
  };

  async handleImageChange({ currentTarget }) {
    this.toggleUploading();

    const file = fileUploadAssistant(currentTarget);
    const formData = new FormData();
    formData.append('photo', file);

    const res = await httpService.patch(
      `/employees/${this.ippisNo}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );

    if (res) {
      console.log(res);
      this.setState({ employeeImageSrc: res.data.data.photo });
      this.toggleUploading();
      this.fetchSimpleProfile();
    }
  }

  renderTabComponent() {
    const { activeTab } = this.state;

    if (activeTab === 'basicInformation') {
      return (
        <EmployeeBasicInfo
          onUpdate={this.fetchSimpleProfile}
          ippisNo={this.ippisNo}
        />
      );
    } else if (activeTab === 'appointment') {
      return (
        <EmployeeAppointmentInfo
          onUpdate={this.fetchSimpleProfile}
          ippisNo={this.ippisNo}
        />
      );
    } else if (activeTab === 'jobInformation') {
      return (
        <EmployeeJobInfo
          onUpdate={this.fetchSimpleProfile}
          ippisNo={this.ippisNo}
          changeCurrentIppis={() =>
            this.setState({
              currentIppisNumber: this.ippisNo
            })
          }
        />
      );
    } else if (activeTab === 'relations') {
      return <EmployeeRelationInfo ippisNo={this.ippisNo} />;
    } else if (activeTab === 'career') {
      return <EmployeeCareer ippisNo={this.ippisNo} />;
    } else if (activeTab === 'trainings') {
      return <EmployeeTrainingRecords ippisNo={this.ippisNo} />;
    } else if (activeTab === 'skills') {
      return <EmployeeSkills ippisNo={this.ippisNo} />;
    } else if (activeTab === 'qualifications') {
      return <EmployeeQualifications ippisNo={this.ippisNo} />;
    }
  }

  render() {
    const {
      tabs,
      activeTab,
      justFetchingImage,
      employeeImageSrc,
      fullName,
      department,
      employeeStatus,
      presentJobType
    } = this.state;

    return (
      <section className={classes.Employee}>
        <header>
          <div className={classes.Profile}>
            <div className={classes.ImgWrapper}>
              {this.state.uploading || justFetchingImage ? (
                <Spinner size='bg' animation='border' />
              ) : (
                <GetImage imageSource={employeeImageSrc} />
              )}
              <div className={classes.UploadBox}>
                <label htmlFor='upload-input'>change image</label>
                <input
                  id='upload-input'
                  type='file'
                  accept='jpeg, jpg, png, svg'
                  hidden
                  onChange={this.handleImageChange}
                />
              </div>
            </div>

            <div className={classes.ProfileInfo}>
              <ul>
                <li className={classes.EmployeeIppis}>{this.ippisNo}</li>
                <li className={classes.EmployeeName}>{fullName}</li>
                <li className={classes.EmployeeDept}>{department}</li>
                <li className={classes.EmployeeJobType}>
                  {presentJobType} staff
                </li>
                <li
                  className={`${classes.EmployeeStatus} employee-status ${employeeStatus}`}
                >
                  {employeeStatus}
                </li>
              </ul>
            </div>
          </div>

          {/* <div className={classes.Controls}>
            <Button fill label='edit' />
            <Button fill label='actions' />
          </div> */}
        </header>

        <main className=''>
          <TabsComponent
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={this.handleTabChange}
          />
          <div className={classes.EmployeeTabBody}>
            {this.renderTabComponent()}
          </div>
        </main>
        <footer></footer>
      </section>
    );
  }
}
