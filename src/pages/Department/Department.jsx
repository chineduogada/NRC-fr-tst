import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import Table from '../../components/TableView/TableView';

class Department extends Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      departments: [],

      columns: [
        { accessor: 'id', Header: 'ID' },
        { accessor: 'code', Header: 'Code' },
        { accessor: 'desc', Header: 'Description' }
      ],

      pageSize: 20,
      currentPage: 1,

      redirect: false
    };
  }

  async componentDidMount() {
    const departments = [];

    const res = await httpService.get('/departments');
    console.log(res);

    if (res) {
      res.data.data.forEach(department => {
        departments.push(this.mapToViewModel(department));
      });
    }

    this.setState({ departments });
  }

  mapToViewModel(department) {
    return {
      id: department.id,
      code: department.code,
      desc: department.description
    };
  }

  /**
   * This redirects to the hompage once a post is successfully created/updated
   */
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  render() {
    const { departments, columns, currentPage } = this.state;

    return (
      <React.Fragment>
        {this.state.departments ? (
          <Section>
            <Table
              title='departments'
              columns={columns}
              data={departments}
              clickHandler={this.handleRowClick}
            ></Table>
          </Section>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Department);
