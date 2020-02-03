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

class EmployeeCareer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actualData: null,

      columns: [
        { accessor: 'transactionDate', Header: 'Transaction Date' },
        { accessor: 'employee', Header: 'Employee' },
        { accessor: 'memoReference', Header: 'Memo Reference' },
        { accessor: 'reasonCode', Header: 'Reason Code' },
        { accessor: 'oldJobTitle', Header: 'Old Job Title' },
        { accessor: 'newJobTitle', Header: 'New Job Title' }
      ],

      pageSize: 20,
      currentPage: 1,
    };

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  async fetchData() {
    const actualData = [];

    const res = await httpService.get(`/careers?ippisNo=${this.props.ippisNo}`);

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
      ippisNo: record.ippisNo,
      employee: `${record.employee.firstName} ${record.employee.lastName}`,
      transactionDate: record.transactionDate,
      memoReference: record.memoReference,
      reasonCode: record.reasonCode.code,
      newJobTitle: record.newJobTitle,
      oldJobTitle: record.oldJobTitle,
      remarks: record.remarks
    };
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  handleRowClick({ currentTarget }) {
    this.props.history.push(`/careers/${currentTarget.id}`);
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

export default withRouter(EmployeeCareer);
