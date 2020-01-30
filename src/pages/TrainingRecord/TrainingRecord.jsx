import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import currency from '../../helpers/currency';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import InformationBlock from '../../components/InformationBlock/InformationBlock';
import SideDraw from '../../components/SideDraw/SideDraw';
import Modal from '../../components/Modal/Modal';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import classes from './TrainingRecord.module.scss';

class TrainingRecord extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      dataFilteredForView: null,
      dataForView: null,
      dataForForm: null,

      showForm: false,
      showModal: false,

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

      isDeleteting: false,

      errors: {}
    };

    this.initialFormState = { ...this.state.formData };

    this.closeSideDraw = this.closeSideDraw.bind(this);
    this.updateDatabase = this.updateDatabase.bind(this);
    this.handleUpdateBtnClick = this.handleUpdateBtnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleProceedDelete = this.handleProceedDelete.bind(this);
    this.deleteObject = this.deleteObject.bind(this);
    this.handleViewEmployee = this.handleViewEmployee.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  schema = {
    tYear: Joi.string().allow('').optional(),
    trainingTypeId: Joi.number(),
    ippisNo: Joi.number(),
    serialCount: Joi.number(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    numDays: Joi.number(),
    individualActualCost: Joi.number(),
    trainingLocation: Joi.string(),
    residential: Joi.string(),
    employeeComment: Joi.string().allow('').optional()
  };

  async fetchTraining() {
    const res = await httpService.get(`/training-records/${this.id}`);

    if (res) {
      this.setState({
        dataFilteredForView: this.filterDataForView(res.data.data),
        dataForView: this.mapDataForView(res.data.data),
        dataForForm: this.filterForForm(res.data.data)
      });
    }
  }

  async componentDidMount() {
    await this.fetchTraining();
  }

  closeSideDraw(e) {
    this.setState({ showForm: false });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  mapDataForView(data) {
    return [
      { name: 'l year', value: data.tYear },
      { name: 'ippisNo', value: data.ippisNo },
      {
        name: 'full name',
        value: `${data.employee.firstName} ${data.employee.lastName}`
      },
      { name: 'training type', value: data.trainingType.type },
      {
        name: 'start date',
        value: data.startDate
      },
      {
        name: 'end date',
        value: data.endDate
      },
      { name: 'individual actual cost', value: currency(data.individualActualCost) || null },
      { name: 'residential', value: data.residential },
    ];
  }

  filterForForm(record) {
      return {
        tYear: record.tYear,
        ippisNo: record.ippisNo,
        trainingTypeId: record.trainingType.id,
        serialCount: record.serialCount,
        startDate: record.startDate,
        endDate: record.endDate,
        numDays: record.numDays,
        individualActualCost: record.individualActualCost,
        trainingLocation: record.trainingLocation,
        residential: record.residential,
        employeeComment: record.employeeComment
    }
  }

  filterDataForView(record) {
    return {
      tYear: record.tYear,
      ippisNo: record.ippisNo,
      employee: `${record.employee.firstName} ${record.employee.lastName}`,
      trainingType: record.trainingType.type,
      serialCount: record.serialCount,
      startDate: record.startDate,
      endDate: record.endDate,
      numDays: record.numDays,
      individualActualCost: record.individualActualCost,
      trainingLocation: record.trainingLocation,
      residential: record.residential,
      employeeComment: record.employeeComment
    };
  }

  handlePageChange = page => {
    if (page) {
      this.setState({ currentPage: page });
    }
  };

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  handleUpdateBtnClick(event) {
    this.setState({ showForm: true, formData: this.state.dataForForm });
  }

  async updateDatabase() {
    const res = await httpService.patch(
      `/training-records/${this.id}`,
      this.state.formData
    );

    if (res) {
      await this.fetchTraining();
      toast.success('Training record successfully updated!');
      this.stopProcessing();
      this.closeSideDraw();
      this.resetFormData();
    }
  }

  async deleteObject() {
    this.setState({ isDeleteting: true });
    const res = await httpService.delete(`/training-records/${this.id}`);

    if (res) {
      toast.success('Training record successfully deleted!');
      this.props.history.push('/training-records');
      this.closeSideDraw();
    }
  }

  handleProceedDelete() {
    this.deleteObject();
  }

  async handleDelete(event) {
    this.setState({ showModal: true });
  }

  handleViewEmployee({ currentTarget }) {
    this.props.history.push(`/employee/${currentTarget.id}`);
  }

  async doSubmit(event) {
    console.log('updating')
    return this.updateDatabase();
  }

  renderUpdateForm() {
    const { dataForForm } = this.state;

    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        {this.renderInput('t year', 'tYear', null, dataForForm.tYear, 'date')}
        {this.renderSelect('training type', 'trainingTypeId', [
          { id: 1, name: 'corporate' },
          { id: 2, name: 'community' }
        ])}
        {this.renderInput('serial count', 'serialCount', dataForForm.serialCount, null, 'number')}
        {this.renderInput('start date', 'startDate', null, dataForForm.startDate, 'date')}
        {this.renderInput('end date', 'endDate', null, dataForForm.endDate, 'date')}
        {this.renderInput('number of days', 'numDays', null, dataForForm.numDays, 'number')}
        {this.renderInput(
          'individual actual cost',
          'individualActualCost',
          null,
          dataForForm.individualActualCost,
          'number'
        )}
        {this.renderInput('training location', 'trainingLocation', null, dataForForm.trainingLocation)}
        {this.renderSelect('residential', 'residential', [
          { id: 'Y', name: 'Y' },
          { id: 'N', name: 'N' }
        ])}
        {this.renderTextArea('employee comment', 'employeeComment', null, dataForForm.employeeComment)}

        {this.renderButton('save')}
      </form>
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
    const {
      showForm,
      showModal,
      dataForView,
      dataForForm
    } = this.state;

    return (
      <React.Fragment>
        {dataForView ? (
          <Section title='training record'>
            <div className={`${classes.Actions} ${classes.Right}`}>
              <Button label='update' fill onClick={this.handleUpdateBtnClick} />
              <Button label='delete' danger onClick={this.handleDelete} />
              <Button
                label='view employee'
                plain
                onClick={this.handleViewEmployee}
                id={dataForForm.ippisNo}
              />
            </div>

            <InformationBlock title='basic'>
              {this.displayInfo(dataForView)}
            </InformationBlock>

            <InformationBlock title='employee comment'>
              {dataForForm.employeeComment}
            </InformationBlock>

            <SideDraw
              title='Record'
              openDraw={showForm}
              onClose={this.closeSideDraw}
            >
              {this.renderUpdateForm()}
            </SideDraw>

            <Modal
              title='delete record'
              openModal={showModal}
              onClose={this.closeModal}
            >
              <p>This operation can not be reversed. Proceed?</p>
              <div className={`${classes.Actions} ${classes.Right}`}>
                <Button
                  label='proceed'
                  danger
                  onClick={this.handleProceedDelete}
                  disabled={this.state.isDeleteting}
                />
              </div>
            </Modal>
          </Section>
        ) : (
          <Loader message='please wait' />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(TrainingRecord);
