import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import SideDraw from '../../components/SideDraw/SideDraw';
import Form from '../../components/Form/Form';

class AllTrainingSchedules extends Form {
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

      showForm: false,

      formData: {
        lYear: '',
        trainingTypeId: '',
        ippisNo: '',
        objective: '',
        expectedStartDate: '',
        expectedEndDate: '',
        expectedCost: '',
        expectedAttendeeNo: '',
        actualStartDate: '2020-01-10',
        actualEndDate: '2020-01-10',
        actualCost: 2,
        actualAttendeeNo: 3,
        resourceOrg: '',
        email: '',
        mainResourcePerson: '',
        residential: '',
        approved: 'N',
        authorisor1Id: '',
        authorisor2Id: '',
        reportSubmitted: 'N',
        objectiveMet: 'N'
      },

      errors: {}
    };

    this.initialFormState = { ...this.state.formData };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.closeSideDraw = this.closeSideDraw.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.postNewData = this.postNewData.bind(this);
  }

  schema = {
    lYear: Joi.string(),
    trainingTypeId: Joi.number(),
    ippisNo: Joi.number(),
    objective: Joi.string(),
    expectedStartDate: Joi.string(),
    expectedEndDate: Joi.string(),
    expectedCost: Joi.number(),
    expectedAttendeeNo: Joi.number(),
    actualStartDate: Joi.string(),
    actualEndDate: Joi.string(),
    actualCost: Joi.number(),
    actualAttendeeNo: Joi.number(),
    resourceOrg: Joi.string(),
    email: Joi.string(),
    mainResourcePerson: Joi.string(),
    residential: Joi.string(),
    approved: Joi.string(),
    authorisor1Id: Joi.number(),
    authorisor2Id: Joi.number(),
    reportSubmitted: Joi.string(),
    objectiveMet: Joi.string()
  };

  async componentWillMount() {
    console.log(this.props);
    if (/\/new$/.test(this.props.location.pathname)) {
      this.setState({ showForm: true });
    }
  }

  async fetchData() {
    const actualData = [];

    const res = await httpService.get('/training-schedules');

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
    this.setState({ showForm: true, rowToPreview: null });
  }

  closeSideDraw(e) {
    this.setState({ showForm: false, rowToPreview: null });
  }

  mapToViewModel(schedule) {
    return {
      id: schedule.id,
      lYear: schedule.lYear,
      ippisNo: schedule.ippisNo,
      employee: `${schedule.employee.firstName} ${schedule.employee.lastName}`,
      trainingType: schedule.trainingType.type,
      resourceOrg: schedule.resourceOrg,
      trainingTypeId: schedule.trainingTypeId,
      objective: schedule.objective,
      expectedStartDate: schedule.expectedStartDate,
      expectedEndDate: schedule.expectedEndDate,
      expectedCost: schedule.expectedCost,
      expectedAttendeeNo: schedule.expectedAttendeeNo,
      actualStartDate: schedule.actualStartDate,
      actualEndDate: schedule.actualEndDate,
      actualCost: schedule.actualCost,
      actualAttendeeNo: schedule.actualAttendeeNo,
      email: schedule.email,
      mainResourcePerson: schedule.mainResourcePerson,
      authorisor1Id: schedule.authorisor1.ippisNo,
      authorisor2Id: schedule.authorisor2.ippisNo,
      reportSubmitted: schedule.reportSubmitted,
      residential: schedule.residential,
      approved: schedule.approved,
      objectiveMet: schedule.objectiveMet
    };
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  handleRowClick({ currentTarget }) {
    console.log(this.props);
    this.props.history.push(`training-schedules/${currentTarget.id}`);
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
      '/training-schedules',
      this.state.formData
    );

    stopProcessing();

    if (res) {
      await this.fetchData();
      toast.success('Training has been scheduled successfully!');
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
        <p>Schedule a training</p>
        {this.renderInput('l year', 'lYear', null, null, 'date')}
        {this.renderSelect('training type', 'trainingTypeId', [
          { id: 1, name: 'corporate' },
          { id: 2, name: 'community' }
        ])}
        {this.renderInput('ippis no', 'ippisNo', null, null, 'number')}
        {this.renderTextArea('objective', 'objective')}
        {this.renderInput(
          'expected start date',
          'expectedStartDate',
          null,
          null,
          'date'
        )}
        {this.renderInput(
          'expected end date',
          'expectedEndDate',
          null,
          null,
          'date'
        )}
        {this.renderInput(
          'expected cost',
          'expectedCost',
          null,
          null,
          'number'
        )}
        {this.renderInput(
          'expected attendee no',
          'expectedAttendeeNo',
          null,
          null,
          'number'
        )}
        {/* {this.renderInput(
          'actual start date',
          'actualStartDate',
          null,
          null,
          'date'
        )}
        {this.renderInput(
          'actual end date',
          'actualEndDate',
          null,
          null,
          'date'
        )}
        {this.renderInput('actual cost', 'actualCost', null, null, 'number')}
        {this.renderInput(
          'actual attendee no',
          'actualAttendeeNo',
          null,
          null,
          'number'
        )} */}
        {this.renderInput('resource organisation', 'resourceOrg')}
        {this.renderInput('email', 'email', null, null, 'email')}
        {this.renderInput('main resource person', 'mainResourcePerson')}
        {this.renderInput(
          'authorisor 1',
          'authorisor1Id',
          'enter ippis..',
          null,
          'number'
        )}
        {this.renderInput(
          'authorisor 2',
          'authorisor2Id',
          'enter ippis..',
          null,
          'number'
        )}
        {this.renderSelect('residential', 'residential', [
          { id: 'Y', name: 'Y' },
          { id: 'N', name: 'N' }
        ])}
        {/* {this.renderSelect('approved', 'approved', [
          { id: 'Y', name: 'Y' },
          { id: 'N', name: 'N' }
        ])}
        {this.renderSelect('report submitted', 'reportSubmitted', [
          { id: 'Y', name: 'Y' },
          { id: 'N', name: 'N' }
        ])}
        {this.renderSelect('objective met', 'objectiveMet', [
          { id: 'Y', name: 'Y' },
          { id: 'N', name: 'N' }
        ])} */}

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
              title="all schedules"
              message="Click a row to preview"
              columns={columns}
              data={actualData}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.handleAddNew}
            ></TableView>

            <SideDraw
              title="schedule"
              openDraw={this.state.showForm}
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

export default withRouter(AllTrainingSchedules);
