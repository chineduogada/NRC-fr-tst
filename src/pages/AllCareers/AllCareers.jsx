import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import SideDraw from '../../components/SideDraw/SideDraw';
import Modal from '../../components/Modal/Modal';
import Form from '../../components/Form/Form';
import EmployeeVerifier from '../../components/EmployeeVerifier/EmployeeVerifier';

class AllCareers extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      actualData: null,

      columns: [
        { accessor: 'transactionDate', Header: 'Transaction Date' },
        { accessor: 'employee', Header: 'Employee' },
        { accessor: 'memoReference', Header: 'Memo Reference' },
        { accessor: 'reasonCode', Header: 'Reason Code' },
        { accessor: 'oldJobTitle', Header: 'Old Job Title' },
        { accessor: 'newJobTitle', Header: 'New Job Title' }
      ],

      pageSize: 20,
      currentPage: 1,

      showDraw: false,

      formData: {
        transactionDate: '',
        ippisNo: '',
        memoReference: '',
        reasonCodeId: '',
        newJobTitleId: '',
        attachedDoc: '',
        remarks: ''
      },

      ippisNoVerified: false,

      jobTitleOptions: [],
      reasonCodeOptions: [],

      errors: {}
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
    ippisNo: Joi.number(),
    transactionDate: Joi.string(),
    memoReference: Joi.string(),
    reasonCodeId: Joi.number(),
    newJobTitleId: Joi.number(),
    attachedDoc: Joi.string()
      .allow('')
      .optional(),
    remarks: Joi.string()
      .allow('')
      .optional()
  };

  async fetchData() {
    const actualData = [];

    const res = await httpService.get('/careers');

    if (res) {
      const { rows } = res.data.data;

      if (rows && rows.length) {
        rows.forEach(row => {
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
      ippisNo: record.ippisNo,
      employee: `${record.employee.firstName} ${record.employee.lastName}`,
      transactionDate: record.transactionDate,
      memoReference: record.memoReference,
      reasonCode: record.reasonCode.code,
      newJobTitle: record.newJobTitle.description,
      oldJobTitle: record.oldJobTitle.description,
      remarks: record.remarks
    };
  }

  handlePageChange = page => {
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
    console.log(this.props);
    this.props.history.push(`careers/${currentTarget.id}`);
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
    const res = await httpService.post('/careers', this.state.formData);

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
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        <p>New career record</p>

        <EmployeeVerifier
          checkOnResponseRecieved={employees => employees.length}
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
            {this.renderInput(
              'transaction date',
              'transactionDate',
              null,
              null,
              'date'
            )}
            {this.renderInput('memo reference', 'memoReference')}
            {this.renderSelect('reason code', 'reasonCodeId', [
              { id: 1, name: 'promotion' },
              { id: 2, name: 'demotion' }
            ])}
            {this.renderSelect('new job title', 'newJobTitleId', [
              { id: 1, name: 'managing director' },
              { id: 2, name: 'financial manager' }
            ])}
            {this.renderInput(
              'attached document',
              'attachedDoc',
              null,
              null,
              'file'
            )}
            {this.renderTextArea('remarks', 'remarks')}
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
              title='careers'
              message='Click a row to preview'
              columns={columns}
              data={actualData}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.handleAddNew}
            ></TableView>

            <Modal
              title='record'
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

export default withRouter(AllCareers);
