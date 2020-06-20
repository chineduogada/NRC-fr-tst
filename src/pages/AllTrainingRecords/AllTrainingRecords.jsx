import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import nameMapper from '../../helpers/nameMapper';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import Modal from '../../components/Modal/Modal';
import { setOptions } from '../../store/options/actionCreators';
import Form from '../../components/Form/Form';
import EmployeeVerifier from '../../components/EmployeeVerifier/EmployeeVerifier';

class AllTrainingRecords extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      actualData: null,

      columns: [
        { accessor: 'tYear', Header: 'TYear' },
        { accessor: 'ippisNo', Header: 'IPPSI No' },
        { accessor: 'employee', Header: 'Employee Name' },
        { accessor: 'trainingType', Header: 'Training Type' },
        { accessor: 'startDate', Header: 'Start Date' },
        { accessor: 'endDate', Header: 'End Date' },
        { accessor: 'residential', Header: 'Residential' },
        { accessor: 'individualActualCost', Header: 'Individual Actual Cost' },
        { accessor: 'trainingLocation', Header: 'Training Location' },
      ],

      pageSize: 20,
      currentPage: 1,

      showDraw: false,

      formData: {
        tYear: '',
        trainingTypeId: '',
        ippisNo: '',
        serialCount: '',
        startDate: '',
        endDate: '',
        individualActualCost: '',
        trainingLocation: '',
        residential: '',
        employeeComment: '',
      },

      ippisNoVerified: false,

      errors: {},
    };

    this.initialFormState = { ...this.state.formData };

    this.handleEmployeeSelection = this.handleEmployeeSelection.bind(this);
    this.handleEmployeeInputChange = this.handleEmployeeInputChange.bind(this);

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeSideDraw = this.closeSideDraw.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.postNewData = this.postNewData.bind(this);
  }

  schema = {
    tYear: Joi.string().allow('').optional(),
    trainingTypeId: Joi.number(),
    ippisNo: Joi.number(),
    serialCount: Joi.number(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    individualActualCost: Joi.number(),
    trainingLocation: Joi.string(),
    residential: Joi.string(),
    employeeComment: Joi.string().allow('').optional(),
  };

  async componentWillMount() {
    console.log(this.props);
    if (/\/new$/.test(this.props.location.pathname)) {
      this.setState({ showDraw: true });
    }
  }

  async fetchData() {
    const actualData = [];

    const res = await httpService.get('/training-records');

    if (res) {
      const { rows } = res.data.data;

      if (rows && rows.length) {
        rows.forEach((row) => {
          actualData.push(this.mapToViewModel(row));
        });
      }

      this.setState({ actualData });
    }
  }

  async componentDidMount() {
    await this.fetchData();
  }

  handleAddNew(e) {
    this.setState({ showDraw: true, rowToPreview: null });
  }

  closeSideDraw(e) {
    this.setState({ showDraw: false, rowToPreview: null });
  }

  /**
   * Destructures each object in the array of training records returned from the server
   * This destructuring is meant for the view (ie. the table on this page) and will not be used to map the values of input fields
   * when the user attempts to update a row (well, if updating is also allowed on this page)
   * @param {Object} record a returned training record
   */
  mapToViewModel(record) {
    return {
      id: record.id,
      tYear: record.tYear,
      ippisNo: record.ippisNo,
      employee: `${record.employee.firstName} ${record.employee.lastName}`,
      trainingType: record.trainingType.type,
      trainingTypeId: record.trainingType.id,
      serialCount: record.serialCount,
      startDate: record.startDate,
      endDate: record.endDate,
      individualActualCost: record.individualActualCost,
      trainingLocation: record.trainingLocation,
      residential: record.residential,
      employeeComment: record.employeeComment,
    };
  }

  handlePageChange = (page) => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  handleEmployeeSelection() {
    this.setState({ ippisNoVerified: true });
  }

  handleEmployeeInputChange(employee) {
    if (!employee) {
      this.setState({ ippisNoVerified: false });
    }
  }

  handleRowClick({ currentTarget }) {
    this.props.history.push(`training-records/${currentTarget.id}`);
  }

  updateTableRows(res) {
    // const newDept = res.data.data;
    this.props.history.go();
    // this.setState({ actualData: [...this.state.actualData, newDept] });
  }

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  async postNewData(stopProcessing) {
    console.log('still submitting');
    const res = await httpService.post(
      '/training-records',
      this.state.formData
    );

    stopProcessing();

    if (res) {
      await this.fetchData();
      toast.success('Training has been recorded successfully!');
      this.Form.reset();
      this.resetFormData();
      this.closeSideDraw();
    }
  }

  async doSubmit(event, stopProcessing) {
    this.postNewData(stopProcessing);
  }

  renderForm() {
    const { ippisNoVerified } = this.state;
    return (
      <form ref={(form) => (this.Form = form)} onSubmit={this.handleSubmit}>
        <p>Add a training record</p>

        <EmployeeVerifier
          checkOnResponseRecieved={(employees) => employees.length}
          onEmployeeSelection={this.handleEmployeeSelection}
          onInputChange={this.handleEmployeeInputChange}
        >
          {this.renderInput(
            'IPPIS no.',
            'ippisNo',
            'Please enter a valid IPPIS number',
            null,
            'number'
          )}
        </EmployeeVerifier>

        {ippisNoVerified ? (
          <>
            {this.renderInput('t year', 'tYear', null, null, 'date')}
            {this.renderSelect(
              'training type',
              'trainingTypeId',
              nameMapper(this.props.options.trainingTypes, 'type')
            )}
            {this.renderInput(
              'serial count',
              'serialCount',
              null,
              null,
              'number'
            )}
            {this.renderInput('start date', 'startDate', null, null, 'date')}
            {this.renderInput('end date', 'endDate', null, null, 'date')}
            {this.renderInput(
              'individual actual cost',
              'individualActualCost',
              null,
              null,
              'number'
            )}
            {this.renderInput('training location', 'trainingLocation')}
            {this.renderSelect(
              'residential',
              'residential',
              this.props.options.residential
            )}
            {this.renderTextArea('employee comment', 'employeeComment')}
          </>
        ) : null}

        {this.renderButton('save')}
      </form>
    );
  }

  render() {
    const { actualData, columns } = this.state;

    return (
      <React.Fragment>
        {this.state.actualData ? (
          <Section>
            <TableView
              title="all records"
              message="Click a row to preview"
              columns={columns}
              data={actualData}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.handleAddNew}
            ></TableView>

            <Modal
              title="record"
              openModal={this.state.showDraw}
              onClose={this.closeSideDraw}
            >
              {this.renderForm()}
            </Modal>
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
      trainingTypes: state.options.trainingType,
      residential: state.options.residential,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setOptions: (payload) => dispatch(setOptions(payload)) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllTrainingRecords)
);
