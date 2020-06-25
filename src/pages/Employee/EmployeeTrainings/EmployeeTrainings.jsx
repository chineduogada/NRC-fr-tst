import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import httpService from '../../../services/httpService';
import Section from '../../../hoc/Section/Section';
import TableView from '../../../components/TableView/TableView';
import ReactTable from '../../../components/ReactTable/Table';
import trainingMetaData from './metadata';

class EmployeeTrainingRecords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'records',

      actualData: {
        records: null,
        schedules: null,
      },

      columns: trainingMetaData.columns,

      pageSize: 20,
      currentPage: 1,
    };

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  async fetchData() {
    const { activeTab } = this.state;
    const url = trainingMetaData.baseUrlToFetchRows[activeTab];
    const res = await httpService.get(`${url}?ippisNo=${this.props.ippisNo}`);

    if (res) {
      const actualData = {
        [activeTab]: res.data.data.rows,
      };
      this.setState({
        actualData,
      });
    }
  }

  async componentDidMount() {
    this.fetchData();
  }

  // /**
  //  * Destructures each object in the array of training records returned from the server
  //  * This destructuring is meant for the view (ie. the table on this page) and will not be used to map the values of input fields
  //  * when the user attempts to update a row (well, if updating is also allowed on this page)
  //  * @param {Object} record a returned training record
  //  */
  // mapToViewModel(record) {
  //   return {
  //     id: record.id,
  //     tYear: record.tYear,
  //     ippisNo: record.ippisNo,
  //     employee: `${record.employee.firstName} ${record.employee.lastName}`,
  //     trainingType: record.trainingType.type,
  //     trainingTypeId: record.trainingType.id,
  //     serialCount: record.serialCount,
  //     startDate: record.startDate,
  //     endDate: record.endDate,
  //     numDays: record.numDays,
  //     individualActualCost: record.individualActualCost,
  //     trainingLocation: record.trainingLocation,
  //     residential: record.residential,
  //     employeeComment: record.employeeComment,
  //   };
  // }

  handleTabChange = async (event) => {
    event.preventDefault();

    const { activeTab, actualData } = this.state;

    const { id } = event.currentTarget;
    // if (activeTab !== id) {
    await this.setState({ activeTab: id });
    // }

    // console.log(actualData[activeTab]);

    if (actualData[activeTab]) {
      this.fetchData();
    }
  };

  handleRowClick({ currentTarget }) {
    const { activeTab } = this.state;
    const url = trainingMetaData.baseRouteOnRowClick[activeTab];
    this.props.history.push(`/${url}/${currentTarget.id}`);
  }

  render() {
    const { actualData, columns, activeTab } = this.state;

    return (
      <React.Fragment>
        <div>
          <Link
            className={`tab ${activeTab === 'records' ? 'active' : ''}`}
            id="records"
            onClick={this.handleTabChange}
          >
            Records
          </Link>

          <Link
            className={`tab ${activeTab === 'schedules' ? 'active' : ''}`}
            id="schedules"
            onClick={this.handleTabChange}
          >
            Schedules
          </Link>
        </div>
        {this.state.actualData[activeTab] ? (
          <Section>
            <TableView
              columns={columns[activeTab]}
              data={actualData[activeTab]}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={() =>
                this.props.history.push(
                  `/${trainingMetaData.linkToCreateNew[activeTab]}`
                )
              }
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
