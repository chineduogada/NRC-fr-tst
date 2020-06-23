import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { setOptions } from '../../store/options/actionCreators';
import nameMapper from '../../helpers/nameMapper';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import currency from '../../helpers/currency';
import autobind from '../../helpers/autobind';
import Section from '../../hoc/Section/Section';
import InformationBlock from '../../components/InformationBlock/InformationBlock';
import SideDraw from '../../components/SideDraw/SideDraw';
import Modal from '../../components/Modal/Modal';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import classes from './TrainingSchedule.module.scss';

class TrainingSchedule extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      dataForView: null,
      data: null,
      authorisors: null,

      showForm: false,
      showModal: false,

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
        objectiveMet: '',
      },

      rowToPreview: null,

      isDeleteting: false,

      errors: {},
    };

    this.initialFormState = { ...this.state.formData };

    autobind(
      this,
      'closeSideDraw',
      'updateDatabase',
      'handleUpdateBtnClick',
      'handleDelete',
      'handleProceedDelete',
      'deleteObject',
      'approveSchedule',
      'closeModal'
    );
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
    actualStartDate: Joi.string().optional().allow(''),
    actualEndDate: Joi.string().optional().allow(''),
    actualCost: Joi.number().optional().allow(''),
    actualAttendeeNo: Joi.number().optional().allow(''),
    resourceOrg: Joi.string(),
    email: Joi.string(),
    mainResourcePerson: Joi.string(),
    residential: Joi.string(),
    approved: Joi.string(),
    authorisor1Id: Joi.number(),
    authorisor2Id: Joi.number(),
    reportSubmitted: Joi.string(),
    objectiveMet: Joi.string(),
  };

  async fetchTraining() {
    const res = await httpService.get(`/training-schedules/${this.id}`);

    if (res) {
      this.setState({
        data: res.data.data,
        formData: this.filterReturnedData(res.data.data),
        authorisors: this.mapAuthorisors(res.data.data),
      });
    }
  }

  async componentDidMount() {
    await this.fetchTraining();
  }

  closeSideDraw(e) {
    this.setState({ showForm: false, rowToPreview: null });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  mapAuthorisors(data) {
    return [
      {
        name: 'authorisor 1',
        value: (
          <Link to={`/employees/${data.authorisor1.ippisNo}`} target="_blank">
            {data.authorisor1.firstName} {data.authorisor1.lastName}
          </Link>
        ),
      },
      {
        name: 'authorisor 2',
        value: (
          <Link to={`/employees/${data.authorisor2.ippisNo}`} target="_blank">
            {data.authorisor2.firstName} {data.authorisor2.lastName}
          </Link>
        ),
      },
    ];
  }

  mapDataForView(data) {
    return [
      { name: 'leave year', value: data.lYear },
      { name: 'ippisNo', value: data.ippisNo },
      {
        name: 'full name',
        value: (
          <Link to={`/employees/${data.ippisNo}`} target="_blank">
            {data.employee.firstName} {data.employee.lastName}
          </Link>
        ),
      },
      { name: 'training type', value: data.trainingType.type },
      { name: 'resource organisation', value: data.resourceOrg },
      {
        name: 'expected start date',
        value: data.expectedStartDate,
      },
      {
        name: 'expected end date',
        value: data.expectedEndDate,
      },
      {
        name: 'expected cost',
        value: data.expectedCost ? currency(data.expectedCost) : null,
      },
      {
        name: 'expected attendee no',
        value: data.expectedAttendeeNo,
      },
      {
        name: 'actual start date',
        value: data.actualStartDate || null,
      },
      {
        name: 'actual start date',
        value: data.actualEndDate || null,
      },
      {
        name: 'actual cost',
        value: data.actualCost ? currency(data.actualCost) : null,
      },
      {
        name: 'actual attendee no',
        value: data.actualAttendeeNo || null,
      },
      { name: 'email', value: data.email },
      {
        name: 'main resource person',
        value: data.mainResourcePerson,
      },
      {
        name: 'report submitted',
        value: data.reportSubmitted,
      },
      { name: 'residential', value: data.residential },
      { name: 'approved', value: data.approved },
      { name: 'objective met', value: data.objectiveMet },
    ];
  }

  filterReturnedData(data) {
    return {
      lYear: data.lYear,
      ippisNo: data.ippisNo,
      resourceOrg: data.resourceOrg,
      trainingTypeId: data.trainingType.id,
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
      objectiveMet: data.objectiveMet,
    };
  }

  handlePageChange = (page) => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  handleUpdateBtnClick(event) {
    this.setState({ showForm: true });
  }

  async updateDatabase(stopProcessing) {
    const res = await httpService.patch(
      `/training-schedules/${this.id}`,
      this.state.formData
    );

    if (res) {
      await this.fetchTraining();
      toast.success('TrainingSchedule successfully updated!');
      this.stopProcessing();
      this.closeSideDraw();
    }
  }

  async deleteObject() {
    this.setState({ isDeleteting: true });
    const res = await httpService.delete(`/training-schedules/${this.id}`);

    if (res) {
      toast.success('Training schedule successfully deleted!');
      this.props.history.push('/training-schedules');
      this.closeSideDraw();
    }
  }

  handleProceedDelete() {
    this.deleteObject();
  }

  async handleDelete(event) {
    this.setState({ showModal: true });
  }

  async approveSchedule() {
    if (!this.isApproved()) {
      await this.setState({
        formData: { ...this.state.data, approved: 'Y' },
      });

      const res = await httpService.patch(
        `/training-schedules/${this.id}/approve`
      );

      if (res) {
        await this.fetchTraining();
        toast.success('TrainingSchedule successfully updated!');
        this.stopProcessing();
        this.closeSideDraw();
      }
    }
  }

  async doSubmit(event, stopProcessing) {
    return this.updateDatabase(stopProcessing);
  }

  renderUpdateForm() {
    const { formData } = this.state;

    return (
      <div className={classes.Preview}>
        <form
          ref={(form) => (this.updateForm = form)}
          onSubmit={this.handleSubmit}
        >
          {this.renderInput(
            'leave year',
            'lYear',
            null,
            formData.lYear,
            'date',
            null,
            true
          )}
          {this.renderSelect(
            'training type',
            'trainingTypeId',
            nameMapper(this.props.options.trainingTypes, 'type'),
            null,
            null,
            Number(formData.trainingTypeId)
          )}
          {this.renderTextArea(
            'objective',
            'objective',
            null,
            formData.objective
          )}
          {this.renderInput(
            'expected start date',
            'expectedStartDate',
            null,
            formData.expectedStartDate,
            'date',
            null,
            true
          )}
          {this.renderInput(
            'expected end date',
            'expectedEndDate',
            null,
            formData.expectedEndDate,
            'date',
            null,
            true
          )}
          {this.renderInput(
            'expected cost',
            'expectedCost',
            null,
            formData.expectedCost,
            'number',
            null,
            true
          )}
          {this.renderInput(
            'expected attendee no',
            'expectedAttendeeNo',
            null,
            formData.expectedAttendeeNo,
            'number',
            null,
            true
          )}
          {this.renderInput(
            'actual start date',
            'actualStartDate',
            null,
            formData.actualStartDate,
            'date'
          )}
          {this.renderInput(
            'actual end date',
            'actualEndDate',
            null,
            formData.actualEndDate,
            'date'
          )}
          {this.renderInput(
            'actual cost',
            'actualCost',
            null,
            formData.actualCost,
            'number'
          )}
          {this.renderInput(
            'actual attendee no',
            'actualAttendeeNo',
            null,
            formData.actualAttendeeNo,
            'number'
          )}
          {this.renderInput(
            'resource organisation',
            'resourceOrg',
            null,
            formData.resourceOrg
          )}
          {this.renderInput('email', 'email', null, formData.email, 'email')}
          {this.renderInput(
            'main resource person',
            'mainResourcePerson',
            null,
            formData.mainResourcePerson
          )}
          {this.renderInput(
            'authorisor 1',
            'authorisorId1',
            'enter ippis..',
            formData.authorisor1Id,
            'number',
            null,
            true
          )}
          {this.renderInput(
            'authorisor 2',
            'authorisorId2',
            'enter ippis..',
            formData.authorisor2Id,
            'number',
            null,
            true
          )}
          {this.renderSelect(
            'residential',
            'residential',
            this.props.options.residential,
            null,
            null,
            formData.residential
          )}
          {this.renderSelect(
            'report submitted',
            'reportSubmitted',
            this.props.options.residential,
            null,
            null,
            formData.reportSubmitted
          )}
          {this.renderSelect(
            'objective met',
            'objectiveMet',
            this.props.options.residential,
            null,
            null,
            formData.objectiveMet
          )}

          {this.renderButton('update')}
        </form>
      </div>
    );
  }

  isApproved() {
    return this.state.data.approved.toLowerCase() === 'y';
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
    const { showForm, showModal, data } = this.state;

    return (
      <React.Fragment>
        {data ? (
          <Section title="training schedule">
            <div className={`${classes.Actions} ${classes.Right}`}>
              <Button
                label={this.isApproved() ? 'approved' : 'approve'}
                highlight
                disabled={this.isApproved()}
                onClick={this.approveSchedule}
              />
              <Button label="update" fill onClick={this.handleUpdateBtnClick} />
              <Button label="delete" danger onClick={this.handleDelete} />
            </div>

            <InformationBlock title="basic">
              {this.displayInfo(this.mapDataForView(data))}
            </InformationBlock>

            <InformationBlock title="authorisors">
              {this.displayInfo(this.mapAuthorisors(data))}
            </InformationBlock>

            <InformationBlock title="objective">
              <p>{data.objective}</p>
            </InformationBlock>

            <SideDraw
              title="schedule"
              openDraw={showForm}
              onClose={this.closeSideDraw}
            >
              {this.renderUpdateForm()}
            </SideDraw>

            <Modal
              title="delete schedule"
              openModal={showModal}
              onClose={this.closeModal}
            >
              <p>This operation can not be reversed. Proceed?</p>
              <div className={`${classes.Actions} ${classes.Right}`}>
                <Button
                  label="proceed"
                  danger
                  onClick={this.handleProceedDelete}
                  disabled={this.state.isDeleteting}
                />
              </div>
            </Modal>
          </Section>
        ) : (
          <Loader message="please wait" />
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
  connect(mapStateToProps, mapDispatchToProps)(TrainingSchedule)
);
