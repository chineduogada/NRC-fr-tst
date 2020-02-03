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
        { accessor: 'employeeStatus', Header: 'Employee Status' },
        { accessor: 'pensionable', Header: 'Pensionable' },
        { accessor: 'firstAppointmentDate', Header: 'First Appointment Date' },
        {
          accessor: 'presentAppointmentDate',
          Header: 'Present Appointment Date'
        },
        { accessor: 'presentJobType', Header: 'present job type' },
        { accessor: 'presentJobTitle', Header: 'present job title' }
      ],
      pageSize: 20,
      currentPage: 1
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
  }

  async componentDidMount() {
    const employees = [];
    const res = await http.get('/employees/');

    if (res) {
      res.data.data.rows.forEach(employee => {
        employees.push(this.mapToViewModel(employee));
      });

      this.setState({ employees });
    }
  }

  mapToViewModel(employee) {
    return {
      id: employee.ippisNo,
      name: `${employee.firstName} ${employee.lastName}`,
      department: employee.employeeJob.department.description,
      district: employee.employeeJob.district.siteName,
      employeeStatus: employee.employeeJob.employeeStatus.status,
      pensionable: employee.employeeJob.pensionable,
      firstAppointmentDate: employee.employeeAppointment.firstAppointmentDate,
      presentAppointmentDate:
        employee.employeeAppointment.presentAppointmentDate,
      presentJobType: employee.employeeAppointment.presentJobType.type,
      presentJobTitle: employee.employeeAppointment.presentJobTitle.description
    };
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
          title='employees'
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
