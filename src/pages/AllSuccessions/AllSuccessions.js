import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { connect } from 'react-redux';
import { setOptions } from '../../store/options/actionCreators';
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
      { id: 0, name: 'active' },
    ];

    this.state = {
      data: null,

      columns: [
        { accessor: 'department.description', Header: 'Department' },
        { accessor: 'section.description', Header: 'Section' },
        { accessor: 'jobTitle.description', Header: 'Job Title' },
        { accessor: 'yearsOfExp', Header: 'Years of Experience' },
        { accessor: 'employeeCount', Header: 'Employee Count' },
      ],

      newData: {},

      pageSize: 20,
      currentPage: 1,

      showForm: false,

      rowToPreview: null,

      isDeleteting: false,
    };

    this.options = null;

    this.initialFormState = { ...this.state.formData };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
  }

  async componentDidMount() {
    const res = await httpService.get('/successions');

    if (res) {
      this.setState({ data: res.data.data.rows });
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
      yearsOfExp: row.yearsOfExp,
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
      ...this.getOptionValues(),
    });
    console.log(newDataObject, filteredNewDataObject);
    this.setState({
      filteredDataFromServer: [
        filteredNewDataObject,
        ...this.state.filteredDataFromServer,
      ],
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
    const { options } = this.props;

    console.log(options);

    return {
      department: options.departments.filter(
        (option) => option.id === departmentId * 1
      )[0],
      section: options.sections.filter(
        (option) => option.id === sectionId * 1
      )[0],
      jobTitle: options.jobTitles.filter(
        (option) => option.id === jobTitleId * 1
      )[0],
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
    const rowIndex = oldState.findIndex((row) => row.id === id);
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
          options={this.props.options}
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
    const { showForm, data, columns } = this.state;

    return (
      <React.Fragment>
        {data ? (
          <Section>
            {showForm ? (
              this.renderForm()
            ) : (
              <TableView
                title="succession definitions"
                message="Double click a row to preview or update"
                columns={columns}
                data={data}
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

const mapStateToProps = (state) => {
  return {
    options: {
      departments: state.options.department,
      sections: state.options.section,
      jobTitles: state.options.jobTitle,
      skills: state.options.skill,
      qualifications: state.options.qualification,
      trainingTypes: state.options.trainingType,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setOptions: (payload) => dispatch(setOptions(payload)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Successions);
