import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
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
import objectKeyEliminator from '../../helpers/obJectKeyEliminator';
import classes from './IncidenceReasonCodes.module.scss';

class IncidenceReasonCodes extends Form {
  constructor(props) {
    super(props);

    this.tableRowOptions = [
      {id: 0, name: 'inactive'},
      {id: 0, name: 'active'},
    ]

    this.state = {
      filteredDataFromServer: [],

      columns: [
        { accessor: 'code', Header: 'Code' },
      ],

      pageSize: 20,
      currentPage: 1,

      showForm: false,

      formData: {
        code: '',
      },

      rowToPreview: null,

      isDeleteting: false,

      errors: {}
    };

    this.initialFormState = { ...this.state.formData };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeSideDraw = this.closeSideDraw.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleTableRowOptionChange = this.handleTableRowOptionChange.bind(this);
    this.addDataObject = this.addDataObject.bind(this);
    this.updateDataObject = this.updateDataObject.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  schema = {
    code: Joi.string(),
  };

  async componentDidMount() {
    const filteredDataFromServer = [];

    const res = await httpService.get('/incidence-reason-codes');

    if (res) {
      res.data.data.forEach(row => {
        filteredDataFromServer.push(this.mapToViewModel(row));
      });
    }

    this.setState({ filteredDataFromServer });
  }

  handleAddNew(e) {
    this.setState({ showForm: true, rowToPreview: null });
  }

  closeSideDraw(e) {
    this.setState({ showForm: false, rowToPreview: null });
  }

  mapToViewModel(data) {
    return {
      id: data.id,
      code: data.code,
    };
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  handleTableRowOptionChange({ currentTarget }) {
    console.log(currentTarget.id)
  }

  handleRowClick(event) {
    if (event.detail > 1) {
      const rowToPreview = this.state.filteredDataFromServer.filter(
        row => row.id === event.currentTarget.id * 1
      )[0];

      this.setState({
        rowToPreview,
        showForm: true,
        formData: objectKeyEliminator(rowToPreview, ['id'])
      });
    }
  }

  /**
   * Adds the newly created data object to the list of data objects initially returned from the server
   * @param { Response } res Axios response object
   */
  updateObjectList(res) {
    const newDept = res.data.data;

    this.setState({ filteredDataFromServer: [...this.state.filteredDataFromServer, newDept] });
  }

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  /**
   * Updates the table row each time a new data object is added
   */
  updateTableRow() {
    const oldState = [...this.state.filteredDataFromServer];
    const id = this.state.rowToPreview.id;
    const formData = this.state.formData;
    const rowIndex = oldState.findIndex(row => row.id === id);

    oldState[rowIndex] = { ...formData, id };

    this.setState({ filteredDataFromServer: oldState });
  }

  async updateDataObject(stopProcessing) {
    const res = await httpService.patch(
      `/incidence-reason-codes/${this.state.rowToPreview.id}`,
      this.state.formData
    );

    stopProcessing();

    if (res) {
      toast.success('Reason code successfully updated!');
      this.updateTableRow();
      this.closeSideDraw();
      this.resetFormData();
    }
  }

  /**
   *  Updates the table row each time an existing data object is deleted
   */
  removeTableRow() {
    const oldState = [...this.state.filteredDataFromServer];
    let rowIndex = oldState.findIndex(
      row => row.id === this.state.rowToPreview.id
    );

    oldState.splice(rowIndex, 1);

    this.setState({ filteredDataFromServer: oldState });
  }

  async handleDelete(event) {
    if (!this.state.isDeleteting) {
      this.setState({ isDeleteting: true });

      const res = await httpService.delete(
        `/incidence-reason-codes/${this.state.rowToPreview.id}`
      );

      if (res) {
        toast.success('Reason code successfully deleted!');
        this.removeTableRow();
        this.updateForm.reset();
        this.resetFormData();
        this.closeSideDraw();
        this.setState({ isDeleteting: false });
      }
    }
  }

  async addDataObject(stopProcessing) {
    const res = await httpService.post('/incidence-reason-codes', this.state.formData);

    stopProcessing();

    if (res) {
      toast.success('Reason code successfully added!');
      this.updateObjectList(res);
      this.Form.reset();
      this.resetFormData();
      this.closeSideDraw();
    }
  }

  async doSubmit(event, stopProcessing) {
    if (this.state.rowToPreview) {
      return this.updateDataObject(stopProcessing);
    }

    this.addDataObject(stopProcessing);
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

          {this.renderButton('update')}
        </form>
      </div>
    );
  }

  renderCreateForm() {
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        <p>Add a new reason code</p>

        {this.renderInput('code', 'code')}

        {this.renderButton('save')}
      </form>
    );
  }

  render() {
    const { filteredDataFromServer, columns } = this.state;

    return (
      <React.Fragment>
        {filteredDataFromServer.length ? (
          <Section>
            <TableView
              title={
                <span>
                  <Link
                    style={{ marginRight: '0.5em' }}
                    className='link secondary'
                    to='/settings/static-models'
                  >
                    <IoMdArrowRoundBack className='icon' />
                  </Link>
                  <span>incidence reason codes</span>
                </span>
              }
              message='Double click a row to previews'
              columns={columns}
              data={filteredDataFromServer}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.handleAddNew}
            >
              
            </TableView>

            <SideDraw
              title='reason code'
              openDraw={this.state.showForm}
              onClose={this.closeSideDraw}
            >
              {this.state.rowToPreview
                ? this.renderUpdateForm()
                : this.renderCreateForm()}
            </SideDraw>
          </Section>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(IncidenceReasonCodes);
