import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import nameMapper from '../../helpers/nameMapper';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import objectKeyEliminator from '../../helpers/obJectKeyEliminator';
import classes from './AllSuccessions.module.scss';
import SuccessionForm from './SuccessionForm';
import { transformText } from '../../helpers/strings';

class Successions extends Component {
  constructor(props) {
    super(props);

    this.tableRowOptions = [
      { id: 0, name: 'inactive' },
      { id: 0, name: 'active' }
    ];

    this.state = {
      filteredDataFromServer: null,

      columns: [
        { accessor: 'department', Header: 'Department' },
        { accessor: 'section', Header: 'Section' },
        { accessor: 'jobTitle', Header: 'Job Title' },
        { accessor: 'yearsOfExp', Header: 'Years of Experience' },
        { accessor: 'employeeCount', Header: 'Employee Count' }
      ],

      newData: {},

      pageSize: 20,
      currentPage: 1,

      showForm: false,

      rowToPreview: null,

      isDeleteting: false
    };

    this.options = null;

    this.initialFormState = { ...this.state.formData };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
  }

  async componentDidMount() {
    this.fetchOptionsFromServer();

    const filteredDataFromServer = [];

    const res = await httpService.get('/successions');

    if (res) {
      console.log(res.data);
      res.data.data.rows.forEach(row => {
        filteredDataFromServer.push(this.mapToViewModel(row));
      });
    }

    this.setState({ filteredDataFromServer });
  }

  async fetchOptionsFromServer() {
    const [
      skills,
      qualifications,
      trainingTypes,
      jobTitles,
      departments,
      sections
    ] = await httpService.all([
      httpService.get('/skills?statusId=1'),
      httpService.get('/qualifications?statusId=1'),
      httpService.get('/training-types?statusId=1'),
      httpService.get('/job-titles?statusId=1'),
      httpService.get('/departments?statusId=1'),
      httpService.get('/sections')
    ]);

    const options = {};

    if (skills) {
      options.skills = skills.data.data;
      options.qualifications = qualifications.data.data;
      options.trainings = trainingTypes.data.data;
      options.jobTitles = jobTitles.data.data;
      options.departments = departments.data.data;
      options.sections = sections.data.data;

      this.options = options;
    }
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
      department: row.department.description,
      jobTitle: row.jobTitle.description,
      section: row.section.section,
      employeeCount: row.employeeCount,
      yearsOfExp: row.yearsOfExp
    };
  }

  handleRowClick({ currentTarget }) {
    this.props.history.push(`/successions/${currentTarget.id}`);
  }

  /**
   * Adds the newly created data object to the list of data objects initially returned from the server
   * @param { Response } res Axios response object
   */
  updateObjectList(res) {
    const newDataObject = res.data.data.result;
    const filteredNewDataObject = this.mapToViewModel({
      ...newDataObject,
      ...this.getOptionValues()
    });
    console.log(newDataObject, filteredNewDataObject);
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
    const { departmentId, sectionId, jobTitleId } = this.state.newData;
    const { options } = this;

    console.log(options);

    return {
      department: options.departments.filter(
        option => option.id === departmentId * 1
      )[0],
      section: options.sections.filter(
        option => option.id === sectionId * 1
      )[0],
      jobTitle: options.jobTitles.filter(
        option => option.id === jobTitleId * 1
      )[0]
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
          title="define succession conditions"
          subTitle="Please fill out the source details to continue"
          options={this.options}
          onSuccess={this.handleOnSuccess}
        />
        <div className={classes.Close} onClick={this.closeForm}>
          <IoMdClose className={classes.CloseIcon} />
          <span>close</span>
        </div>
      </div>
    );
  }

  /**
   * A call back that runs when a new record is created
   * @param { Object } param0 data the data property in the
   * request body
   */
  async handleOnSuccess(res) {
    console.log(res);
    await this.setState({ newData: res.data.data.result });
    this.updateObjectList(res);
  }

  render() {
    const { showForm, filteredDataFromServer, columns } = this.state;

    return (
      <React.Fragment>
        {filteredDataFromServer ? (
          <Section>
            {showForm ? (
              this.renderForm()
            ) : (
              <TableView
                title="succession definitions"
                message="Double click a row to preview or update"
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
