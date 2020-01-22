import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import SideDraw from '../../components/SideDraw/SideDraw';
import Form from '../../components/Form/Form';

class Department extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      departments: [],

      columns: [
        { accessor: 'id', Header: 'ID' },
        { accessor: 'code', Header: 'Code' },
        { accessor: 'description', Header: 'Description' }
      ],

      pageSize: 20,
      currentPage: 1,

      showForm: false,

      formData: {
        code: '',
        description: ''
      },

      errors: {}
    };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeSideDraw = this.closeSideDraw.bind(this);
  }

  schema = {
    code: Joi.string(),
    description: Joi.string()
  };

  async componentWillMount() {
    if (/new$/.test(this.props.match.path)) {
      this.setState({ showForm: true });
    }
  }

  async componentDidMount() {
    const departments = [];

    const res = await httpService.get('/departments');

    if (res) {
      res.data.data.forEach(department => {
        departments.push(this.mapToViewModel(department));
      });
    }

    this.setState({ departments });
  }

  handleAddNew(e) {
    this.setState({ showForm: true });
  }

  closeSideDraw(e) {
    this.setState({ showForm: false });
  }

  mapToViewModel(department) {
    return {
      id: department.id,
      code: department.code,
      description: department.description
    };
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  updateDepartmentList(res) {
    const newDept = res.data.data;

    this.setState({ departments: [...this.state.departments, newDept] });
  }

  async doSubmit(event, stopProcessing) {
    console.log('submitting', this.state.formData);
    const res = await httpService.post('/departments', this.state.formData);

    stopProcessing();

    if (res) {
      toast.success('Department successfully added!');
      this.updateDepartmentList(res);
      this.Form.reset();
      this.closeSideDraw();
    }
  }

  renderDepartmentForm() {
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        {this.renderInput('code', 'code')}
        {this.renderInput('department', 'description')}

        {this.renderButton('save')}
      </form>
    );
  }

  render() {
    const { departments, columns } = this.state;

    return (
      <React.Fragment>
        {this.state.departments ? (
          <Section>
            <TableView
              title='departments'
              columns={columns}
              data={departments}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.handleAddNew}
            ></TableView>

            <SideDraw
              title='new department'
              openDraw={this.state.showForm}
              onClose={this.closeSideDraw}
            >
              <p>Add a new department</p>
              {this.renderDepartmentForm()}
            </SideDraw>
          </Section>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Department);
