import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader/Loader';
import httpService from '../../../services/httpService';
import Section from '../../../hoc/Section/Section';
import TableView from '../../../components/TableView/TableView';
import ReactTable from '../../../components/ReactTable/Table';
import SideDraw from '../../../components/SideDraw/SideDraw';

class EmployeeTrainingRecords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actualData: null,

      columns: [
        { accessor: 'tYear', Header: 'TYear' },
        { accessor: 'ippisNo', Header: 'IPPSI No' },
        { accessor: 'employee', Header: 'Employee Name' },
        { accessor: 'trainingType', Header: 'Training Type' },
        { accessor: 'numDays', Header: 'Number of Days' },
        { accessor: 'startDate', Header: 'Start Date' },
        { accessor: 'endDate', Header: 'End Date' },
        { accessor: 'residential', Header: 'Residential' },
        { accessor: 'individualActualCost', Header: 'Individual Actual Cost' },
        { accessor: 'trainingLocation', Header: 'Training Location' }
      ],

      pageSize: 20,
      currentPage: 1,
    };

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  async fetchData() {
    const actualData = [];

    const res = await httpService.get(`/training-records?ippisNo=${this.props.ippisNo}`);

    if (res) {
      const { rows } = res.data.data;

      if (rows && rows.length) {
        rows.forEach(row => {
          actualData.push(this.mapToViewModel(row));
        });
      }

      this.setState({ actualData });
    }
  }

  async componentDidMount() {
    await this.fetchData();
  }

  /**
   * Destructures each object in the array of training records returned from the server
   * This destructuring is meant for the view (ie. the table on this page) and will not be used to map the values of input fields
   * when the user attempts to update a row (well, if updating is also allowed on this page)
   * @param {Object} record a returned training record
   */
  mapToViewModel(record) {
    return {
      id: record.id,
      tYear: record.tYear,
      ippisNo: record.ippisNo,
      employee: `${record.employee.firstName} ${record.employee.lastName}`,
      trainingType: record.trainingType.type,
      trainingTypeId: record.trainingType.id,
      serialCount: record.serialCount,
      startDate: record.startDate,
      endDate: record.endDate,
      numDays: record.numDays,
      individualActualCost: record.individualActualCost,
      trainingLocation: record.trainingLocation,
      residential: record.residential,
      employeeComment: record.employeeComment
    };
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  handleRowClick({ currentTarget }) {
    this.props.history.push(`/training-records/${currentTarget.id}`);
  }

  render() {
    const { actualData, columns } = this.state;

    return (
      <React.Fragment>
        {this.state.actualData ? (
          <Section>
            <TableView
              columns={columns}
              data={actualData}
              clickHandler={this.handleRowClick}
            ></TableView>
          </Section>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(EmployeeTrainingRecords);
