import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Loader from '../../components/Loader/Loader';
import nameMapper from '../../helpers/nameMapper';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import SideDraw from '../../components/SideDraw/SideDraw';
import Form from '../../components/Form/Form';
import classes from './Department.module.scss';

class Department extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.statusOptions = [
      { id: 1, status: 'active' },
      { id: 2, status: 'inactive' }
    ];

    this.state = {
      departments: [],

      columns: [
        { accessor: 'code', Header: 'Code' },
        { accessor: 'description', Header: 'Description' },
        { accessor: 'status', Header: 'Status' }
      ],

      pageSize: 20,
      currentPage: 1,

      showForm: false,

      formData: {
        code: '',
        description: '',
        statusId: ''
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
    description: Joi.string(),
    statusId: Joi.number()
  };

  async componentDidMount() {
    if (/\?new$/.test(this.props.location.search)) {
      this.setState({ showForm: true });
    }

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

  mapToViewModel(row) {
    console.log(row);
    return {
      id: row.id,
      code: row.code,
      description: row.description,
      status: row.status.status,
      statusId: row.statusId
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
        formData: _.pick(rowToPreview, ['code', 'description', 'statusId'])
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

  /**
   * Adds the newly created data object to the list of data objects initially returned from the server
   * @param { Response } res Axios response object
   */
  updateObjectList(res) {
    const newDataObject = res.data.data;
    const filteredNewDataObject = this.mapToViewModel({
      ...newDataObject,
      ...this.getOptionValues()
    });

    this.setState({
      departments: [filteredNewDataObject, ...this.state.departments]
    });
  }

  /**
   * Gets actual values of the options the user has updated
   */
  getOptionValues() {
    const { statusId } = this.state.formData;
    return {
      status: this.statusOptions.filter(option => option.id === statusId * 1)[0]
    };
  }

  // updateTableRow() {
  //   const oldState = [...this.state.departments];
  //   const id = this.state.rowToPreview.id;
  //   const formData = this.state.formData;
  //   const rowIndex = oldState.findIndex(row => row.id === id);

  //   oldState[rowIndex] = { ...formData, id };

  //   this.setState({ departments: oldState });
  // }
  updateTableRow() {
    // create a copy of the filtered data stored in the state
    const oldState = [...this.state.departments];
    // obtain the id or the row to be previewed
    const id = this.state.rowToPreview.id;
    // obtain the form data in the state (it contains the values the user just updated)
    const formData = this.state.formData;
    // map every option to the current value the user may have selected and join them with the from data
    const updatedRowToPreview = { ...formData, ...this.getOptionValues() };
    // obtain the index of the row the use jus
    const rowIndex = oldState.findIndex(row => row.id === id);
    // map the updated data to the desired view (Ex: for table display)
    const filteredUpdatedRow = this.mapToViewModel(updatedRowToPreview);
    // updating the copy of the filtered data from the server
    oldState[rowIndex] = { ...filteredUpdatedRow, id };

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
          {/* <Button
            label='delete'
            danger
            onClick={this.handleDelete}
            disabled={this.state.isDeleteting}
          /> */}
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
          {this.renderSelect(
            'status ',
            'statusId',
            nameMapper(this.statusOptions, 'status'),
            null,
            null,
            this.state.formData.statusId
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
        {this.renderSelect(
          'status ',
          'statusId',
          nameMapper(this.statusOptions, 'status')
        )}

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
