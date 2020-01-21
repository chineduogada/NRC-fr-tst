import React, { Component } from 'react';
import classes from './Employee.module.scss';
import TabsComponent from '../../components/Tabs/Tabs';
import Button from '../../components/Button/Button';
import EmployeeBasicInfo from './EmployeeBasicInfo/EmployeeBasicInfo';
import EmployeeJobInfo from './EmployeeJobInfo/EmployeeJobInfo';
import EmployeeAppointmentInfo from './EmployeeAppointmentInfo/EmployeeAppointmentInfo';
import EmployeeRelationInfo from './EmployeeRelationInfo/EmployeeRelationInfo';
import EmployeeCareerInfo from './EmployeeCareerInfo/EmployeeCareerInfo';
import imgTemp from '../../assets/images/red-paper-airplane-fly-dark-blue-background_44481-304.jpg';

export default class Employee extends Component {
  state = {
    currentIppisNumber: null,
    tabs: [
      { label: 'Basic Information', key: 'basicInformation' },
      { label: 'Job Information', key: 'jobInformation' },
      { label: 'Appointment', key: 'appointment' },
      { label: 'Relation', key: 'relation' },
      { label: 'Career', key: 'career' },
      { label: 'skills', key: 'skills' }
    ],

    activeTab: 'basicInformation'
  };

  handleTabChange = tab => {
    this.setState({ activeTab: tab });
  };

  renderTabComponent() {
    const { activeTab } = this.state;

    if (activeTab === 'basicInformation') {
      return <EmployeeBasicInfo ippisNo={this.props.match.params.ippisNo} />;
    } else if (activeTab === 'appointment') {
      return (
        <EmployeeAppointmentInfo ippisNo={this.props.match.params.ippisNo} />
      );
    } else if (activeTab === 'jobInformation') {
      return (
        <EmployeeJobInfo
          ippisNo={this.props.match.params.ippisNo}
          changeCurrentIppis={() =>
            this.setState({
              currentIppisNumber: this.props.match.params.ippisNo
            })
          }
        />
      );
    } else if (activeTab === 'relation') {
      return <EmployeeRelationInfo ippisNo={this.props.match.params.ippisNo} />;
    } else if (activeTab === 'career') {
      return <EmployeeCareerInfo ippisNo={this.props.match.params.ippisNo} />;
    }
  }

  render() {
    const { tabs, activeTab } = this.state;

    return (
      <section className={classes.Employee}>
        <header>
          <div className={classes.Profile}>
            <div className={classes.ImgWrapper}>
              <img src={imgTemp} alt='employee' />
            </div>

            <div className={classes.ProfileInfo}>
              <ul>
                <li className={classes.EmployeeIppis}>
                  {this.props.match.params.ippisNo}
                </li>
                <li className={classes.EmployeeName}>ebere jackson isohio</li>
                <li className={classes.EmployeeDept}>
                  Administration and Human Resources
                </li>
                <li className={classes.EmployeeJobType}>contract staff</li>
                <li className={`${classes.EmployeeStatus} active`}>active</li>
              </ul>
            </div>
          </div>

          <div className={classes.Controls}>
            <Button fill label='edit' />
            <Button fill label='actions' />
          </div>
        </header>

        <main className=''>
          <TabsComponent
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={this.handleTabChange}
          />

          {this.renderTabComponent()}
        </main>
        <footer></footer>
      </section>
    );
  }
}
