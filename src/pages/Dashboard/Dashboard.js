import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import getCredentials from '../../services/Credentials';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import BasicDataCard from '../../components/DataCards/BasicDataCard/BasicDataCard';
import SimpleLineChart from '../../components/Charts/SimpleLineChart/SimpleLineChart';
import Distributions from './Distributions';
import PieCharts from './PieCharts';
import classes from './Dashboard.module.scss';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basicSummary: {
        numEmployees: {
          data: null,
          text: 'Employees',
          url: '/employees',
          addNew: '/employees/new'
        },
        numDepartments: {
          data: null,
          text: 'Departments',
          url: '/settings/static-models/departments',
          addNew: '/settings/static-models/departments?new'
        },
        numTrainingSchedules: {
          data: null,
          text: 'Training Schedules',
          url: '/training-schedules',
          addNew: '/training-schedules?new'
        },
        numJobIncidence: {
          data: null,
          text: 'Job Incidence',
          url: '/job-incidence',
          addNew: '/job-incidence?new'
        }
      },

      chart: '',

      data: [
        { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }
      ]
    };
  }

  fetchEmployees() {
    return httpService.get('/summary/employees');
  }

  fetchDepartments() {
    return httpService.get('/departments');
  }

  fetchTrainingSchedules() {
    return httpService.get('/training-schedules');
  }

  fetchJobIncidence() {
    return httpService.get('/job-incidence');
  }

  async setNumEmployee(res) {
    if (res) {
      const oldState = { ...this.state.basicSummary };
      const numEmployees = {
        ...oldState.numEmployees,
        data: res.data.data.length
      };

      const basicSummary = { ...oldState, numEmployees };

      this.setState({ basicSummary });
    }
  }

  async setNumDept(res) {
    if (res) {
      const oldState = { ...this.state.basicSummary };
      const numDepartments = {
        ...oldState.numDepartments,
        data: res.data.data.length
      };

      const basicSummary = { ...oldState, numDepartments };

      this.setState({ basicSummary });
    }
  }

  async setNumTrainingSchedules(res) {
    if (res) {
      const oldState = { ...this.state.basicSummary };
      const numTrainingSchedules = {
        ...oldState.numTrainingSchedules,
        data: res.data.data.count
      };

      const basicSummary = { ...oldState, numTrainingSchedules };

      this.setState({ basicSummary });
    }
  }

  async setNumJobIncidence(res) {
    if (res) {
      const oldState = { ...this.state.basicSummary };
      const numJobIncidence = {
        ...oldState.numJobIncidence,
        data: res.data.data.count
      };

      const basicSummary = { ...oldState, numJobIncidence };

      this.setState({ basicSummary });
    }
  }

  async componentDidMount() {
    const [employees, dept, trainingSch, incidence] = await httpService.all([
      this.fetchEmployees(),
      this.fetchDepartments(),
      this.fetchTrainingSchedules(),
      this.fetchJobIncidence()
    ]);

    if (employees) {
      this.setNumEmployee(employees);
      this.setNumDept(dept);
      this.setNumTrainingSchedules(trainingSch);
      this.setNumJobIncidence(incidence);
    }
  }

  render() {
    const { basicSummary } = this.state;
    const { firstName, username } = getCredentials();
    return (
      <Section
        id="post"
        title="dashboard"
        subTitle={`Welcome, ${firstName || username}`}
      >
        <Section>
          <div className={classes.News}>{<SimpleLineChart />}</div>
        </Section>

        <Section>
          <div className={classes.BasicSummary}>
            {Object.keys(basicSummary).map((summary, i) => {
              return (
                <BasicDataCard
                  key={i}
                  data={basicSummary[summary].data}
                  text={basicSummary[summary].text}
                  url={basicSummary[summary].url}
                  footer={
                    <Link to={basicSummary[summary].addNew}>
                      <IoIosAdd />
                      ADD NEW
                    </Link>
                  }
                />
              );
            })}
          </div>
        </Section>

        <Section>
          <PieCharts />
        </Section>

        <Section>
          <div className={classes.MainSummary}>
            <div className={classes.Summary}>
              <div>
                <Distributions />
              </div>
            </div>
          </div>
        </Section>
      </Section>
    );
  }
}
