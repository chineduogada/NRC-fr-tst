import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import InformationBlock from '../../components/InformationBlock/InformationBlock';
import SideDraw from '../../components/SideDraw/SideDraw';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import classes from './TrainingSchedule.module.scss';

class TrainingSchedule extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      actualData: null,
      dataForView: null,
      authorisors: null,

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
        actualStartDate: '',
        actualEndDate: '',
        actualCost: '',
        actualAttendeeNo: '',
        resourceOrg: '',
        email: '',
        mainResourcePerson: '',
        residential: '',
        approved: '',
        authorisor1Id: '',
        authorisor2Id: '',
        reportSubmitted: '',
        objectiveMet: ''
      },

      rowToPreview: null,

      isDeleteting: false,

      errors: {}
    };

    this.initialFormState = { ...this.state.formData };

    this.closeSideDraw = this.closeSideDraw.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.updateTrainingSchedule = this.updateTrainingSchedule.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  async componentDidMount() {
    const res = await httpService.get(`/training-schedules/${this.id}`);

    if (res) {
      this.setState({
        actualData: this.filterReturnedData(res.data.data),
        dataForView: this.mapDataForView(res.data.data),
        authorisors: this.mapAuthorisors(res.data.data)
      });
    }
  }

  closeSideDraw(e) {
    this.setState({ showForm: false, rowToPreview: null });
  }

  mapAuthorisors(data) {
    return [
      {
        name: 'authorisor 2',
        value: `${data.employee.firstName} ${data.authorisor1.lastName}`
      },
      {
        name: 'authorisor 2',
        value: `${data.employee.firstName} ${data.authorisor2.lastName}`
      },
    ]
  }

  mapDataForView(data) {
    return [
      { name: 'l year', value: data.lYear },
      { name: 'ippisNo', value: data.ippisNo },
      {
        name: 'full name',
        value: `${data.employee.firstName} ${data.employee.lastName}`
      },
      { name: 'training type', value: data.trainingType.type },
      { name: 'resource organisation', value: data.resourceOrg },
      {
        name: 'expected start date',
        value: data.expectedStartDate
      },
      {
        name: 'expected end date',
        value: data.expectedEndDate
      },
      { name: 'expected cost', value: data.expectedCost },
      {
        name: 'expected attendee no',
        value: data.expectedAttendeeNo
      },
      {
        name: 'actual start date',
        value: data.actualStartDate || null
      },
      {
        name: 'actual start date',
        value: data.actualEndDate || null
      },
      { name: 'actual cost', value: data.actualCost || null },
      {
        name: 'actual attendee no',
        value: data.actualAttendeeNo || null
      },
      { name: 'email', value: data.email },
      {
        name: 'main resource person',
        value: data.mainResourcePerson
      },
      {
        name: 'report submitted',
        value: data.reportSubmitted
      },
      { name: 'residential', value: data.residential },
      { name: 'approved', value: data.approved },
      { name: 'objective met', value: data.objectiveMet }
    ];
  }

  filterReturnedData(data) {
    return {
      id: data.id,
      lYear: data.lYear,
      ippisNo: data.ippisNo,
      employee: `${data.employee.firstName} ${data.employee.lastName}`,
      trainingType: data.trainingType.type,
      resourceOrg: data.resourceOrg,
      trainingTypeId: data.trainingTypeId,
      objective: data.objective,
      expectedStartDate: data.expectedStartDate,
      expectedEndDate: data.expectedEndDate,
      expectedCost: data.expectedCost,
      expectedAttendeeNo: data.expectedAttendeeNo,
      actualStartDate: data.actualStartDate,
      actualEndDate: data.actualEndDate,
      actualCost: data.actualCost,
      actualAttendeeNo: data.actualAttendeeNo,
      email: data.email,
      mainResourcePerson: data.mainResourcePerson,
      authorisor1Id: data.authorisor1.ippisNo,
      authorisor2Id: data.authorisor2.ippisNo,
      reportSubmitted: data.reportSubmitted,
      residential: data.residential,
      approved: data.approved,
      objectiveMet: data.objectiveMet
    };
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  handleRowClick(event) {
    if (event.detail > 1) {
      const rowToPreview = this.state.actualData.filter(
        row => row.id === event.currentTarget.id * 1
      )[0];

      this.setState({
        rowToPreview,
        showForm: true,
        formData: rowToPreview
      });
    }
  }

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  async updateTrainingSchedule(stopProcessing) {
    const res = await httpService.put(
      `/TrainingSchedules/${this.state.rowToPreview.id}`,
      this.state.formData
    );

    stopProcessing();

    if (res) {
      toast.success('TrainingSchedule successfully updated!');
      this.closeSideDraw();
      this.resetFormData();
    }
  }

  async handleDelete(event) {
    this.setState({ isDeleteting: true });

    const res = await httpService.delete(
      `/training-schedules/${this.state.rowToPreview.id}`
    );

    if (res) {
      toast.success('TrainingSchedule successfully deleted!');
      this.updateForm.reset();
      this.resetFormData();
      this.closeSideDraw();
    }
  }

  async doSubmit(event, stopProcessing) {
    return this.updateTrainingSchedule(stopProcessing);
  }

  renderUpdateForm() {
    return (
      <div className={classes.Preview}>
        <div className={classes.Actions}>
          <Button
            label="delete"
            danger
            onClick={this.handleDelete}
            disabled={this.state.isDeleteting}
          />
        </div>
        <form
          ref={form => (this.updateForm = form)}
          onSubmit={this.handleSubmit}
        >
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
          {this.renderInput(
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
          )}
          {this.renderInput('resource organisation', 'resourceOrg')}
          {this.renderInput('email', 'email', null, null, 'email')}
          {this.renderInput('main resource person', 'mainResourcePerson')}
          {this.renderInput(
            'authorisor 1',
            'authorisorId1',
            'enter ippis..',
            null,
            'number'
          )}
          {this.renderInput(
            'authorisor 2',
            'authorisorId2',
            'enter ippis..',
            null,
            'number'
          )}
          {this.renderSelect('residential', 'residential', [
            { id: 'Y', name: 'Y' },
            { id: 'N', name: 'N' }
          ])}
          {this.renderSelect('approved', 'approved', [
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
          ])}
          {this.renderButton('update')}
        </form>
      </div>
    );
  }

  displayInfo(data) {
    return data.map((d, i) => {
      return (
        <div className={classes.DisplayInfo} key={i}>
          <p>{d.name}:</p>
          <span>{d.value}</span>
        </div>
      );
    });
  }

  render() {
    const { showForm, actualData, dataForView } = this.state;
    return (
      <React.Fragment>
        {actualData ? (
          <Section title="training schedule">
            <div className={`${classes.Actions} ${classes.Right}`}>
              <Button label="mark as complete" highlight />
              <Button label="update" fill />
              <Button label="delete" danger />
              <Button label="view authorizor 1" plain />
            </div>

            <InformationBlock title="basic">
              {this.displayInfo(dataForView)}
            </InformationBlock>

            <InformationBlock title="objective">
              {actualData.objective}
            </InformationBlock>

            <SideDraw
              title="schedule"
              openDraw={showForm}
              onClose={this.closeSideDraw}
            >
              {this.renderUpdateForm()}
            </SideDraw>
          </Section>
        ) : (
          <Loader message="please wait" />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(TrainingSchedule);
