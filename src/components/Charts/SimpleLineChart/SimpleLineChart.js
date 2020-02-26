import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'Finance',
    active: 400,
    retired: 240,
    suspended: 24
  },
  {
    name: 'Public Relations',
    active: 300,
    retired: 139,
    suspended: 41
  },
  {
    name: 'Accounts',
    active: 573,
    retired: 98,
    suspended: 14
  },
  {
    name: 'Admin',
    active: 278,
    retired: 39,
    suspended: 14
  },
  {
    name: 'Customer Service',
    active: 389,
    retired: 48,
    suspended: 18
  },
  {
    name: 'Engineering',
    active: 239,
    retired: 380,
    suspended: 20
  }
];

export default class SimpleLineChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={this.props.data || []}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
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
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="ex-employee" stroke="#82ca9d" />
          <Line type="monotone" dataKey="suspended" stroke="#d81e5b" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
