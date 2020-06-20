import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import httpServices from '../../../services/httpService';
import prepareChartData from '../../../helpers/prepareChartData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Finance',
    active: 400,
    retired: 240,
    suspended: 24,
  },
  {
    name: 'Public Relations',
    active: 300,
    retired: 139,
    suspended: 41,
  },
  {
    name: 'Accounts',
    active: 573,
    retired: 98,
    suspended: 14,
  },
  {
    name: 'Admin',
    active: 278,
    retired: 39,
    suspended: 14,
  },
  {
    name: 'Customer Service',
    active: 389,
    retired: 48,
    suspended: 18,
  },
  {
    name: 'Engineering',
    active: 239,
    retired: 380,
    suspended: 20,
  },
];

class SimpleLineChart extends PureComponent {
  state = {
    data: [],
    primaryGroup: {
      name: 'department',
      targetKeyInRow: 'departmentId',
      targetKeyInOption: 'code',
      optionsUrl: '/departments',
    },
    secondaryGroup: {
      name: 'employee status',
      targetKeyInRow: 'employeeStatusId',
      targetKeyInOption: 'description',
      optionsUrl: '/employee-statuses',
    },
  };

  mapSecondaryGroupCount(
    targetKeyInOptions,
    targetKeyInRow,
    data = [],
    options = []
  ) {
    return data.map((row) => {
      const matchedOptionRow = options.filter(
        (option) => option.id === row[targetKeyInRow]
      )[0];

      return {
        ...row,
        [matchedOptionRow[targetKeyInOptions]]: row.count,
      };
    });
  }

  mergeByPrimaryGroup(data) {
    const { primaryGroup } = this.state;

    const mergedGroups = {};

    data.forEach((row) => {
      const currentPrimaryGroup =
        mergedGroups[row[primaryGroup.targetKeyInRow]] || {};
      mergedGroups[row[primaryGroup.targetKeyInRow]] = {
        ...currentPrimaryGroup,
        ...row,
      };
    });

    return Object.values(mergedGroups);
  }

  async processSummaryData(res) {
    const { primaryGroup, secondaryGroup } = this.state;
    const { options } = this.props;

    let preparedData = [];

    if (res) {
      preparedData = await prepareChartData(
        res.data.data,
        options.primaryOptions,
        primaryGroup.targetKeyInRow,
        primaryGroup.targetKeyInOption
      );

      const withMappedSecondaryOptions = this.mapSecondaryGroupCount(
        secondaryGroup.targetKeyInOption,
        secondaryGroup.targetKeyInRow,
        preparedData,
        options.secondaryOptions
      );

      const mergedPrimaryGroups = this.mergeByPrimaryGroup(
        withMappedSecondaryOptions
      );
      console.log(mergedPrimaryGroups);
      this.setState({
        data: mergedPrimaryGroups,
        isFetchingData: false,
      });
    }
  }

  async fetchData() {
    const { primaryGroup, secondaryGroup } = this.state;

    const res = await httpServices.get(
      `/summary/employee-jobs?groupBy=${primaryGroup.targetKeyInRow},${secondaryGroup.targetKeyInRow}`
    );

    if (res) {
      console.log(res.data.data);
      this.setState({ data: this.processSummaryData(res) });
    }
  }

  async componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={this.state.data || []}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="active"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="suspended" stroke="#8884d8" />
          <Line type="monotone" dataKey="ex-employee" stroke="#d81e5b" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: {
      primaryOptions: state.options.department,
      secondaryOptions: state.options.employeeStatus,
    },
  };
};

export default connect(mapStateToProps)(SimpleLineChart);
