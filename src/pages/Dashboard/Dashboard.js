import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import getCredentials from '../../services/Credentials';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import BasicDataCard from '../../components/DataCards/BasicDataCard/BasicDataCard';
import SimpleLineChart from '../../components/Charts/SimpleLineChart/SimpleLineChart';
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
          url: '/departments',
          addNew: '/departments?new'
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
    return httpService.get('/employees');
  }

  fetchDepartments() {
    return httpService.get('/departments');
  }

  fetchTrainingSchedules() {
    return httpService.get('/job-types');
  }

  fetchJobIncidence() {
    return httpService.get('/blood-groups');
  }

  async setNumEmployee({ data }) {
    const oldState = { ...this.state.basicSummary };
    const numEmployees = { ...oldState.numEmployees, data: data.data.count };

    const basicSummary = { ...oldState, numEmployees };

    this.setState({ basicSummary });
  }

  async setNumDept({ data }) {
    const oldState = { ...this.state.basicSummary };
    const numDepartments = {
      ...oldState.numDepartments,
      data: data.data.length
    };

    const basicSummary = { ...oldState, numDepartments };

    this.setState({ basicSummary });
  }

  async setNumTrainingSchedules({ data }) {
    const oldState = { ...this.state.basicSummary };
    const numTrainingSchedules = {
      ...oldState.numTrainingSchedules,
      data: data.data.length
    };

    const basicSummary = { ...oldState, numTrainingSchedules };

    this.setState({ basicSummary });
  }

  async setNumJobIncidence({ data }) {
    const oldState = { ...this.state.basicSummary };
    const numJobIncidence = {
      ...oldState.numJobIncidence,
      data: data.data.length
    };

    const basicSummary = { ...oldState, numJobIncidence };

    this.setState({ basicSummary });
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
    const { firstName } = getCredentials();
    return (
      <Section id="post" title="dashboard" subTitle={`Welcome, ${firstName}`}>
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
          <div className={classes.MainSummary}>
            <div className={classes.Summary}>
              <header>
                <h4>Data to review</h4>
              </header>
            </div>

            <div className={classes.Summary}>
              <header>
                <h4>Recent activities</h4>
              </header>
            </div>
          </div>
        </Section>
      </Section>
    );
  }
}
