import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import httpService from '../../services/httpService';
import prepareChartData from '../../helpers/prepareChartData';
import Select from '../../components/Select/Select';
import Loader from '../../components/Loader/Loader';

export default class Distributions extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      departments: {
        name: 'department',
        url: '/summary/employee-jobs?groupBy=departmentId',
        data: [],
        targetKeyInRow: 'departmentId',
        targetKeyInOption: 'description'
      },

      jobTitles: {
        name: 'job title',
        url: '/summary/employee-appointments?groupBy=presentPositionJobTitleId',
        data: [],
        targetKeyInRow: 'jobTitleId',
        targetKeyInOption: 'description'
      },

      jobTypes: {
        name: 'job type',
        url: '/summary/employee-appointments?groupBy=presentPositionJobTypeId',
        data: [],
        targetKeyInRow: 'jobTypeId',
        targetKeyInOption: 'type'
      },

      genders: {
        name: 'gender',
        url: '/summary/employees?groupBy=genderId',
        data: [],
        targetKeyInRow: 'genderId',
        targetKeyInOption: 'type'
      },

      maritalStatuses: {
        name: 'marital status',
        url: '/summary/employees?groupBy=maritalStatusId',
        data: [],
        targetKeyInRow: 'maritalStatusId',
        targetKeyInOption: 'status'
      },

      salaryStructures: {
        name: 'salary structure',
        url: '/summary/employee-jobs?groupBy=salaryStructureId',
        data: [],
        targetKeyInRow: 'salaryStructureId',
        targetKeyInOption: 'description'
      },

      LGA: {
        name: 'LGA',
        url: '/summary/employees?groupBy=lgaId',
        data: [],
        targetKeyInRow: 'lgaId',
        targetKeyInOption: 'lga'
      },

      states: {
        name: 'states',
        url: '/summary/employees?groupBy=stateId',
        data: [],
        targetKeyInRow: 'stateId',
        targetKeyInOption: 'state'
      },

      activeSummary: 'departments',
      options: {},

      isFetchingData: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async processSummaryData(res) {
    const { activeSummary, options } = this.state;
    const { targetKeyInRow, targetKeyInOption } = this.state[activeSummary];

    const oldState = { ...this.state[activeSummary] };
    let preparedData = [];

    if (res) {
      preparedData = await prepareChartData(
        res.data.data,
        options[activeSummary],
        targetKeyInRow,
        targetKeyInOption
      );
      this.setState({
        [activeSummary]: { ...oldState, data: preparedData },
        isFetchingData: false
      });
    }
  }

  async fetchAllOptions() {
    const [
      departments,
      salaryStructures,
      jobTypes,
      jobTitles,
      genders,
      states,
      lga,
      maritalStatuses
    ] = await httpService.all([
      httpService.get('/departments'),
      httpService.get('/salary-structures'),
      httpService.get('/job-types'),
      httpService.get('/job-titles'),
      httpService.get('/genders'),
      httpService.get('/states'),
      httpService.get('/lga'),
      httpService.get('/marital-statuses')
    ]);

    if (departments) {
      const options = {
        departments: departments.data.data,
        jobTypes: jobTypes.data.data,
        jobTitles: jobTitles.data.data,
        salaryStructures: salaryStructures.data.data,
        genders: genders.data.data,
        states: states.data.data,
        LGA: lga.data.data,
        maritalStatuses: maritalStatuses.data.data
      };

      this.setState({ options });
    }
  }

  async fetchActiveSummary() {
    const { activeSummary } = this.state;
    const { data, url } = this.state[activeSummary];

    if (!data.length) {
      this.setState({ isFetchingData: true });
      const res = await httpService.get(url);

      this.processSummaryData(res);
    }
  }

  async componentDidMount() {
    await this.fetchAllOptions();
    await this.fetchActiveSummary();
  }

  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  async handleChange({ currentTarget }) {
    await this.setState({ activeSummary: currentTarget.value });

    this.fetchActiveSummary();
  }

  render() {
    const { activeSummary, isFetchingData } = this.state;
    const { data, name } = this.state[activeSummary];

    const optionsToSelect = [
      { id: 'departments', name: 'departments' },
      { id: 'LGA', name: 'LGA' },
      // { id: 'salaryStructures', name: 'salary structures' },
      // { id: 'genders', name: 'genders' },
      { id: 'states', name: 'states' },
      { id: 'jobTitles', name: 'job titles' },
      { id: 'jobTypes', name: 'job types' },
      { id: 'maritalStatuses', name: 'marital statuses' }
    ];

    return (
      <div style={{ width: '100%' }}>
        <h4 style={{ fontSize: '1.2rem', color: '#058f43' }}>
          Employees grouped by {name}
        </h4>
        <div style={{ width: '100%', maxWidth: '200px' }}>
          <Select options={optionsToSelect} onChange={this.handleChange} />
        </div>
        {isFetchingData ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Loader />
          </div>
        ) : (
          <div style={{ fontSize: '0.85rem' }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: -10,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#058f43" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  }
}
