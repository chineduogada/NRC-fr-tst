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
import imgTemp from '../../assets/images/generic-avatar.jpg';
import classes from './Employee.module.scss';

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

      activeTab: 'basicInformation'
    };
  }

  handleTabChange = tab => {
    this.setState({ activeTab: tab });
  };

  renderTabComponent() {
    const { activeTab } = this.state;

    if (activeTab === 'basicInformation') {
      return <EmployeeBasicInfo ippisNo={this.ippisNo} />;
    } else if (activeTab === 'appointment') {
      return <EmployeeAppointmentInfo ippisNo={this.ippisNo} />;
    } else if (activeTab === 'jobInformation') {
      return (
        <EmployeeJobInfo
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
    const { tabs, activeTab } = this.state;

    return (
      <section className={classes.Employee}>
        <header>
          <div className={classes.Profile}>
            <div className={classes.ImgWrapper}>
              <img src={imgTemp} alt="employee" />
              <div className={classes.UploadBox}>
                <label for="upload-input">
                  <Button label="Change Image" block plain />
                </label>
                <input id="upload-input" type="file" hidden />
              </div>
            </div>

            <div className={classes.ProfileInfo}>
              <ul>
                <li className={classes.EmployeeIppis}>{this.ippisNo}</li>
                <li className={classes.EmployeeName}>ebere jackson isohio</li>
                <li className={classes.EmployeeDept}>
                  Administration and Human Resources
                </li>
                <li className={classes.EmployeeJobType}>contract staff</li>
                <li className={`${classes.EmployeeStatus} active`}>active</li>
              </ul>
            </div>
          </div>

          {/* <div className={classes.Controls}>
            <Button fill label='edit' />
            <Button fill label='actions' />
          </div> */}
        </header>

        <main className="">
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
