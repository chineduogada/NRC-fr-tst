import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import http from '../../services/httpService';
import Section from '../../hoc/Section/Section';
// import ReactTable from '../../components/ReactTable/Table';
import Table from '../../components/TableView/TableView';

class AllEmployees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      columns: [
        { accessor: 'id', Header: 'IPPIS No' },
        { accessor: 'name', Header: 'Name' },
        { accessor: 'department', Header: 'Department' },
        { accessor: 'district', Header: 'District' },
        {
          accessor: 'employeeStatus',
          Header: 'Employee Status',
          aggregate: 'count',
          Aggregate: ({ cell: { value } }) => `${value} Statuses`
        },
        { accessor: 'pensionable', Header: 'Pensionable' },
        { accessor: 'firstAppointmentDate', Header: 'First Appointment Date' },
        {
          accessor: 'presentAppointmentDate',
          Header: 'Present Appointment Date'
        },
        { accessor: 'presentJobType', Header: 'Present Job Type' },
        { accessor: 'presentJobTitle', Header: 'Present Job Title' }
      ],
      pageSize: 20,
      currentPage: 1
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
  }

  async fetchFromServer() {
    const limit = 500;
    let page = 1;
    let countEqualLimit = true; // assumes that the length of the result sets we get back before the last result set is equal to the pagination limit
    let responseDefined = true; // assumes that the response we get back is not undefined
    while (countEqualLimit && responseDefined) {
      const employees = [];

      const res = await http.get(`/employees?page=${page}&limit=${limit}`);

      if (res) {
        res.data.data.rows.forEach(employee => {
          employees.push(this.mapToViewModel(employee));
        });

        countEqualLimit = res.data.data.rows.length === limit;
        page++;

        const newState = [...this.state.employees, ...employees];

        this.setState({ employees: newState });
      } else {
        responseDefined = false;
      }
    }
  }

  async componentDidMount() {
    this.fetchFromServer();
  }

  // mapToViewModel(employee) {
  //   const { employeeJob, employeeAppointment } = employee;
  //   return {
  //     id: employee.ippisNo,
  //     name: `${employee.firstName} ${employee.lastName}`,
  //     department: employeeJob ? employeeJob.department.description : null,
  //     district: employeeJob ? employeeJob.district.siteName : null,
  //     employeeStatus: employeeJob ? employeeJob.employeeStatus.status : null,
  //     pensionable: employeeJob ? employeeJob.pensionable : null,
  //     firstAppointmentDate: employeeAppointment
  //       ? employeeAppointment.firstAppointmentDate
  //       : null,
  //     presentAppointmentDate: employeeAppointment
  //       ? employeeAppointment.presentAppointmentDate
  //       : null,
  //     presentJobType: employeeAppointment
  //       ? employeeAppointment.presentJobType.type
  //       : null,
  //     presentJobTitle: employeeAppointment
  //       ? employeeAppointment.presentJobTitle.description
  //       : null
  //   };
  // }

  mapToViewModel(employee) {
    const { employeeJob, employeeAppointment } = employee;

    const employeeInfo = {
      id: employee.ippisNo,
      name: `${employee.firstName} ${employee.lastName}`
    };

    if (employee.employeeJob) {
      employeeInfo.department = employeeJob.department
        ? employeeJob.department.description
        : null;
      employeeInfo.district = employeeJob.district
        ? employeeJob.district.siteName
        : null;
      employeeInfo.employeeStatus = employeeJob.employeeStatus
        ? employeeJob.employeeStatus.description
        : null;
      employeeInfo.pensionable = employeeJob.pensionable;
    }

    if (employee.employeeAppointment) {
      employeeInfo.firstAppointmentDate =
        employeeAppointment.firstAppointmentDate;
      employeeInfo.presentAppointmentDate =
        employeeAppointment.presentAppointmentDate;
      employeeInfo.presentJobType = employeeAppointment.presentJobType
        ? employeeAppointment.presentJobType.type
        : null;
      employeeInfo.presentJobTitle = employeeAppointment.presentJobTitle
        ? employeeAppointment.presentJobTitle.description
        : null;
    }

    return employeeInfo;
  }

  handleAddNew() {
    this.props.history.push('/employees/new');
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  handleRowClick({ currentTarget }) {
    console.log(currentTarget);
    this.props.history.push(`/employees/${currentTarget.id}`);
  }

  render() {
    const { employees, currentPage, columns } = this.state;

    return (
      <Section>
        <Table
          title="employees"
          columns={columns}
          data={employees}
          clickHandler={this.handleRowClick}
          currentPage={currentPage}
          addNewButtonHandler={this.handleAddNew}
        />
      </Section>
    );
  }
}

export default withRouter(AllEmployees);
