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

class AllTrainingSchedules extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      actualData: null,

      columns: [
        { accessor: 'lYear', Header: 'Leave Year' },
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
        // actualStartDate: '2020-01-10',
        // actualEndDate: '2020-01-10',
        // actualCost: 2,
        // actualAttendeeNo: 3,
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

      ippisNoVerified: false,
      authorisor1Verified: false,
      authorisor2Verified: false,

      errors: {}
    };

    this.initialFormState = { ...this.state.formData };

    this.handleEmployeeSelection = this.handleEmployeeSelection.bind(this);
    this.handleEmployeeInputChange = this.handleEmployeeInputChange.bind(this);
    this.handleAuthorisor1Selection = this.handleAuthorisor1Selection.bind(
      this
    );
    this.handleAuthorisor1InputChange = this.handleAuthorisor1InputChange.bind(
      this
    );
    this.handleAuthorisor2Selection = this.handleAuthorisor2Selection.bind(
      this
    );
    this.handleAuthorisor2InputChange = this.handleAuthorisor2InputChange.bind(
      this
    );

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
    // actualStartDate: Joi.string(),
    // actualEndDate: Joi.string(),
    // actualCost: Joi.number(),
    // actualAttendeeNo: Joi.number(),
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
    if (/\?new$/.test(this.props.location.search)) {
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

  handleEmployeeSelection() {
    this.setState({ ippisNoVerified: true });
  }

  handleEmployeeInputChange(employee) {
    console.log(
      'employee ippis number',
      this.state.ippisNoVerified,
      this.state.authorisor1Verified
    );
    if (!employee) {
      this.setState({ ippisNoVerified: false });
    }
  }

  handleAuthorisor1Selection() {
    this.setState({ authorisor1Verified: true });
  }

  handleAuthorisor1InputChange(employee) {
    if (!employee) {
      this.setState({ authorisor1Verified: false });
    }
  }

  handleAuthorisor2Selection() {
    this.setState({ authorisor2Verified: true });
  }

  handleAuthorisor2InputChange(employee) {
    if (!employee) {
      this.setState({ authorisor2Verified: false });
    }
  }

  closeSideDraw(e) {
    this.setState({ showForm: false, rowToPreview: null });
    this.resetFormData();
    this.Form.reset();
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
    const {
      ippisNoVerified,
      authorisor1Verified,
      authorisor2Verified,
      formData
    } = this.state;

    const selfAuthWarning = 'Self-authorisation is not allowed';
    const sameAuthWarning = 'Authorisors must be different employees';

    const authorisor1IsTrainee = formData.ippisNo === formData.authorisor1Id;
    const authorisor2IsTrainee = formData.ippisNo === formData.authorisor2Id;
    const authorisorIsTrainee = authorisor1IsTrainee || authorisor2IsTrainee;
    const authorisor1IsAuthorisor2 =
      formData.authorisor1Id === formData.authorisor2Id;

    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        <p>Schedule a training</p>
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
            <p className='form-field-instruction'>
              Please specify authorisors to continue
            </p>
            {authorisor1IsAuthorisor2 ? (
              <span className='alert alert-danger'>{sameAuthWarning}</span>
            ) : null}

            <EmployeeVerifier
              checkOnResponseRecieved={employees => employees.length}
              onEmployeeSelection={this.handleAuthorisor1Selection}
              onInputChange={this.handleAuthorisor1InputChange}
            >
              {this.renderInput(
                'Authorisor 1',
                'authorisor1Id',
                'Please enter a valid IPPIS number',
                formData.authorisor1Id,
                'number'
              )}
              {authorisor1IsTrainee ? (
                <span className='alert alert-danger'>{selfAuthWarning}</span>
              ) : null}
            </EmployeeVerifier>
            <EmployeeVerifier
              checkOnResponseRecieved={employees => employees.length}
              onEmployeeSelection={this.handleAuthorisor2Selection}
              onInputChange={this.handleAuthorisor2InputChange}
            >
              {this.renderInput(
                'Authorisor 2',
                'authorisor2Id',
                'Please enter a valid IPPIS number',
                formData.authorisor2Id,
                'number'
              )}
              {authorisor2IsTrainee ? (
                <span className='alert alert-danger'>{selfAuthWarning}</span>
              ) : null}
            </EmployeeVerifier>

            {authorisor1Verified &&
            authorisor2Verified &&
            !authorisorIsTrainee &&
            !authorisor1IsAuthorisor2 ? (
              <>
                {this.renderInput('leave year', 'lYear', null, null, 'date')}
                {this.renderSelect('training type', 'trainingTypeId', [
                  { id: 1, name: 'corporate' },
                  { id: 2, name: 'community' }
                ])}
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
                {this.renderInput('resource organisation', 'resourceOrg')}
                {this.renderInput('email', 'email', null, null, 'email')}
                {this.renderInput('main resource person', 'mainResourcePerson')}
                {this.renderSelect('residential', 'residential', [
                  { id: 'Y', name: 'Y' },
                  { id: 'N', name: 'N' }
                ])}
              </>
            ) : null}
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
              title='all schedules'
              message='Click a row to preview'
              columns={columns}
              data={actualData}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.handleAddNew}
            ></TableView>

            <Modal
              title='schedule'
              openModal={this.state.showForm}
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

export default withRouter(AllTrainingSchedules);
