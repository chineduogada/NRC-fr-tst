import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
// import Joi from '@hapi/joi';
import yup from 'yup';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import SideDraw from '../../components/SideDraw/SideDraw';
import Form from '../../components/Form/Form';

class AllTrainingRecords extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      actualData: null,

      columns: [
        { accessor: 'lYear', Header: 'LYear' },
        { accessor: 'ippisNo', Header: 'IPPSI No' },
        { accessor: 'employee', Header: 'Employee Name' },
        { accessor: 'trainingType', Header: 'Training Type' },
        { accessor: 'resourceOrg', Header: 'Resource Org' },
        { accessor: 'residential', Header: 'Residential' },
        { accessor: 'approved', Header: 'Approved' },
        { accessor: 'objectiveMet', Header: 'Objective Met' }
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
        numDays: '',
        individualActualCost: '',
        trainingLocation: '',
        residential: '',
        employeeComment: ''
      },

      errors: {}
    };

    this.initialFormState = { ...this.state.formData };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeSideDraw = this.closeSideDraw.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.postNewData = this.postNewData.bind(this);
  }

  schema = yup.object({
    tYear: yup.string().optional(),
    trainingTypeId: yup.number(),
    ippisNo: yup.number(),
    serialCount: yup.number(),
    startDate: yup.string(),
    endDate: yup.string(),
    numDays: yup.number(),
    individualActualCost: yup.number(),
    trainingLocation: yup.string(),
    residential: yup.string(),
    employeeComment: yup.string().notRequired()
  });

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

  mapToViewModel(record) {
    return {
      id: record.id,
      lYear: record.lYear,
      ippisNo: record.ippisNo,
      employee: `${record.employee.firstName} ${record.employee.lastName}`,
      trainingType: record.trainingType.type,
      resourceOrg: record.resourceOrg,
      trainingTypeId: record.trainingTypeId,
      objective: record.objective,
      expectedStartDate: record.expectedStartDate,
      expectedEndDate: record.expectedEndDate,
      expectedCost: record.expectedCost,
      expectedAttendeeNo: record.expectedAttendeeNo,
      actualStartDate: record.actualStartDate,
      actualEndDate: record.actualEndDate,
      actualCost: record.actualCost,
      actualAttendeeNo: record.actualAttendeeNo,
      email: record.email,
      mainResourcePerson: record.mainResourcePerson,
      authorisor1Id: record.authorisor1.ippisNo,
      authorisor2Id: record.authorisor2.ippisNo,
      reportSubmitted: record.reportSubmitted,
      residential: record.residential,
      approved: record.approved,
      objectiveMet: record.objectiveMet
    };
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  handleRowClick({ currentTarget }) {
    console.log(this.props);
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
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        <p>record a training</p>
        {this.renderInput('t year', 'tYear', null, null, 'date')}
        {this.renderSelect('training type', 'trainingTypeId', [
          { id: 1, name: 'corporate' },
          { id: 2, name: 'community' }
        ])}
        {this.renderInput('ippis no', 'ippisNo', null, null, 'number')}
        {this.renderInput('serial count', 'serialCount', null, null, 'number')}
        {this.renderInput('start date', 'startDate', null, null, 'date')}
        {this.renderInput('end date', 'endDate', null, null, 'date')}
        {this.renderInput('number of days', 'numDays', null, null, 'number')}
        {this.renderInput(
          'individual actual cost',
          'individualActualCost',
          null,
          null,
          'number'
        )}
        {this.renderInput('training location', 'trainingLocation')}
        {this.renderSelect('residential', 'residential', [
          { id: 'Y', name: 'Y' },
          { id: 'N', name: 'N' }
        ])}
        {this.renderTextArea('emplooyee comment', 'employeeComment')}

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
              title='all records'
              message='Click a row to preview'
              columns={columns}
              data={actualData}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.handleAddNew}
            ></TableView>

            <SideDraw
              title='record'
              openDraw={this.state.showDraw}
              onClose={this.closeSideDraw}
            >
              {this.renderForm()}
            </SideDraw>
          </Section>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(AllTrainingRecords);
