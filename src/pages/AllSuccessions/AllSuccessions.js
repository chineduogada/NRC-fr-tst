import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import Joi from 'joi-browser';
import nameMapper from '../../helpers/nameMapper';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import SideDraw from '../../components/SideDraw/SideDraw';
import Form from '../../components/Form/Form';
import objectKeyEliminator from '../../helpers/obJectKeyEliminator';
import classes from './AllSuccessions.module.scss';
import SuccessionForm from './SuccessionForm';

class Successions extends Component {
  constructor(props) {
    super(props);

    this.tableRowOptions = [
      { id: 0, name: 'inactive' },
      { id: 0, name: 'active' }
    ];

    this.state = {
      filteredDataFromServer: [],

      columns: [
        { accessor: 'name', Header: 'Pension Fund Admin' },
        { accessor: 'deparmtent', Header: 'Department' },
        { accessor: 'section', Header: 'Section' },
        { accessor: 'jobTitle', Header: 'Job Title' },
        { accessor: 'yearsOfExp', Header: 'Years of Experience' },
        { accessor: 'employeeCount', Header: 'Employye Count' },
        { accessor: 'reportTo', Header: 'Report To' }
      ],

      pageSize: 20,
      currentPage: 1,

      showForm: false,

      rowToPreview: null,

      isDeleteting: false
    };

    this.initialFormState = { ...this.state.formData };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleTableRowOptionChange = this.handleTableRowOptionChange.bind(
      this
    );
    //   this.addDataObject = this.addDataObject.bind(this);
    //   this.updateDataObject = this.updateDataObject.bind(this);
    //   this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const filteredDataFromServer = [];

    const res = await httpService.get('/pfa');

    if (res) {
      res.data.data.forEach(pfa => {
        filteredDataFromServer.push(this.mapToViewModel(pfa));
      });
    }

    this.setState({ filteredDataFromServer });
  }

  handleAddNew(e) {
    this.setState({ showForm: true, rowToPreview: null });
  }

  closeForm(e) {
    this.setState({ showForm: false, rowToPreview: null });
  }

  mapToViewModel(row) {
    return {
      id: row.id,
      name: row.name,
      status: row.status.status,
      statusId: row.statusId
    };
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  handleTableRowOptionChange({ currentTarget }) {
    console.log(currentTarget.id);
  }

  handleRowClick({ currentTarget }) {
    this.props.history.push(`/successions/${currentTarget.id}`);
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
      filteredDataFromServer: [
        filteredNewDataObject,
        ...this.state.filteredDataFromServer
      ]
    });
  }

  resetFormData() {
    this.setState({ formData: this.initialFormState });
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

  /**
   * Updates the table row each time a new data object is added
   */
  updateTableRow() {
    // create a copy of the filtered data stored in the state
    const oldState = [...this.state.filteredDataFromServer];
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

    this.setState({ filteredDataFromServer: oldState });
  }

  renderForm() {
    return (
      <div className={classes.CreationForm}>
        <SuccessionForm
          title='define succession conditions'
          subTitle='Please fill out the source details to continue'
        />
        <div className={classes.Close} onClick={this.closeForm}>
          <IoMdClose className={classes.CloseIcon} />
          <span>close</span>
        </div>
      </div>
    );
  }

  render() {
    const { showForm, filteredDataFromServer, columns } = this.state;

    return (
      <React.Fragment>
        {filteredDataFromServer.length ? (
          <Section>
            {showForm ? (
              this.renderForm()
            ) : (
              <TableView
                title='succession definitions'
                message='Double click a row to preview'
                columns={columns}
                data={filteredDataFromServer}
                clickHandler={this.handleRowClick}
                addNewButtonHandler={this.handleAddNew}
              ></TableView>
            )}
          </Section>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Successions);
