import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import SideDraw from '../../components/SideDraw/SideDraw';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import classes from './Department.module.scss';

class Department extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      departments: [],

      columns: [
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

      rowToPreview: null,

      isDeleteting: false,

      errors: {}
    };

    this.initialFormState = { ...this.state.formData };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeSideDraw = this.closeSideDraw.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.addDepartment = this.addDepartment.bind(this);
    this.updateDepartment = this.updateDepartment.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  schema = {
    code: Joi.string(),
    description: Joi.string()
  };

  async componentWillMount() {
    if (/\?new$/.test(this.props.location.search)) {
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
    this.setState({ showForm: true, rowToPreview: null });
  }

  closeSideDraw(e) {
    this.setState({ showForm: false, rowToPreview: null });
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

  handleRowClick(event) {
    if (event.detail > 1) {
      const rowToPreview = this.state.departments.filter(
        department => department.id === event.currentTarget.id * 1
      )[0];

      this.setState({
        rowToPreview,
        showForm: true,
        formData: _.pick(rowToPreview, ['code', 'description'])
      });
    }
  }

  updateDepartmentList(res) {
    const newDept = res.data.data;

    this.setState({ departments: [...this.state.departments, newDept] });
  }

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  updateTableRow() {
    const oldState = [...this.state.departments];
    const id = this.state.rowToPreview.id;
    const formData = this.state.formData;
    const rowIndex = oldState.findIndex(row => row.id === id);

    oldState[rowIndex] = { ...formData, id };

    this.setState({ departments: oldState });
  }

  async updateDepartment(stopProcessing) {
    const res = await httpService.patch(
      `/departments/${this.state.rowToPreview.id}`,
      this.state.formData
    );

    stopProcessing();

    if (res) {
      toast.success('Department successfully updated!');
      this.updateTableRow();
      this.closeSideDraw();
      this.resetFormData();
    }
  }

  removeTableRow() {
    const oldState = [...this.state.departments];
    let rowIndex = oldState.findIndex(
      row => row.id === this.state.rowToPreview.id
    );

    oldState.splice(rowIndex, 1);

    this.setState({ departments: oldState });
  }

  async handleDelete(event) {
    if (!this.state.isDeleteting) {
      this.setState({ isDeleteting: true });

      const res = await httpService.delete(
        `/departments/${this.state.rowToPreview.id}`
      );

      if (res) {
        toast.success('Department successfully deleted!');
        this.removeTableRow();
        this.updateForm.reset();
        this.resetFormData();
        this.closeSideDraw();
        this.setState({ isDeleteting: false });
      }
    }
  }

  async addDepartment(stopProcessing) {
    const res = await httpService.post('/departments', this.state.formData);

    stopProcessing();

    if (res) {
      toast.success('Department successfully added!');
      this.updateDepartmentList(res);
      this.Form.reset();
      this.resetFormData();
      this.closeSideDraw();
    }
  }

  async doSubmit(event, stopProcessing) {
    if (this.state.rowToPreview) {
      return this.updateDepartment(stopProcessing);
    }

    this.addDepartment(stopProcessing);
  }

  renderUpdateForm() {
    return (
      <div className={classes.Preview}>
        <div className={classes.Actions}>
          <Button
            label="delete"
            danger
            onClick={this.handleDelete}
            disabled={this.state.isDeleteting}
          />
        </div>
        <form
          ref={form => (this.updateForm = form)}
          onSubmit={this.handleSubmit}
        >
          {this.renderInput('code', 'code', null, this.state.rowToPreview.code)}
          {this.renderInput(
            'description',
            'description',
            null,
            this.state.rowToPreview.description
          )}

          {this.renderButton('update')}
        </form>
      </div>
    );
  }

  renderDepartmentForm() {
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        <p>Add a new department</p>

        {this.renderInput('code', 'code')}
        {this.renderInput('description', 'description')}

        {this.renderButton('save')}
      </form>
    );
  }

  render() {
    const { departments, columns } = this.state;

    return (
      <React.Fragment>
        {this.state.departments.length ? (
          <Section>
            <TableView
              title="departments"
              message="Double click a row to preview"
              columns={columns}
              data={departments}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.handleAddNew}
            ></TableView>

            <SideDraw
              title="department"
              openDraw={this.state.showForm}
              onClose={this.closeSideDraw}
            >
              {this.state.rowToPreview
                ? this.renderUpdateForm()
                : this.renderDepartmentForm()}
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
