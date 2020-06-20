import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { setOptions } from '../../store/options/actionCreators';
import nameMapper from '../../helpers/nameMapper';
import dates from '../../helpers/dates';
import autobind from '../../helpers/autobind';
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
      dataForView: null,
      data: null,

      showForm: false,
      showModal: false,

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

      isDeleteting: false,

      errors: {},
    };

    this.initialFormState = { ...this.state.formData };

    autobind(
      this,
      'handleUpdateBtnClick',
      'updateDatabase',
      'closeSideDraw',
      'closeModal',
      'deleteObject',
      'handleDelete',
      'handleProceedDelete'
    );
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

  async fetchTraining() {
    const res = await httpService.get(`/training-records/${this.id}`);

    if (res) {
      this.setState({
        data: res.data.data,
        dataForView: this.mapDataForView(res.data.data),
        formData: this.filterForForm(res.data.data),
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
      { name: 'training year', value: data.tYear },
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
      {
        name: 'number of days',
        value: dates.getDurationBetween(data.startDate, data.endDate),
      },
      {
        name: 'start date',
        value: data.startDate,
      },
      {
        name: 'end date',
        value: data.endDate,
      },
      {
        name: 'individual actual cost',
        value: currency(data.individualActualCost) || null,
      },
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

  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  handleUpdateBtnClick(event) {
    this.setState({ showForm: true });
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

  async doSubmit(event) {
    console.log('updating');
    return this.updateDatabase();
  }

  renderUpdateForm() {
    const { dataForForm, formData } = this.state;

    return (
      <form ref={(form) => (this.Form = form)} onSubmit={this.handleSubmit}>
        {this.renderInput(
          'training year',
          'tYear',
          null,
          formData.tYear,
          'date'
        )}
        {this.renderSelect(
          'training type',
          'trainingTypeId',
          nameMapper(this.props.options.trainingTypes, 'type'),
          null,
          null,
          Number(formData.trainingTypeId)
        )}
        {this.renderInput(
          'serial count',
          'serialCount',
          null,
          formData.serialCount,
          'number'
        )}
        {this.renderInput(
          'start date',
          'startDate',
          null,
          formData.startDate,
          'date'
        )}
        {this.renderInput(
          'end date',
          'endDate',
          null,
          formData.endDate,
          'date'
        )}
        {this.renderInput(
          'individual actual cost',
          'individualActualCost',
          null,
          formData.individualActualCost,
          'number'
        )}
        {this.renderInput(
          'training location',
          'trainingLocation',
          null,
          formData.trainingLocation
        )}
        {this.renderSelect(
          'residential',
          'residential',
          this.props.options.residential,
          null,
          null,
          formData.residential
        )}
        {this.renderTextArea(
          'employee comment',
          'employeeComment',
          null,
          formData.employeeComment
        )}

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
    const { showForm, showModal, formData } = this.state;

    return (
      <React.Fragment>
        {this.state.data ? (
          <Section title="training record">
            <div className={`${classes.Actions} ${classes.Right}`}>
              <Button label="update" fill onClick={this.handleUpdateBtnClick} />
              <Button label="delete" danger onClick={this.handleDelete} />
            </div>

            <InformationBlock title="basic">
              {this.displayInfo(this.mapDataForView(this.state.data))}
            </InformationBlock>

            <InformationBlock title="employee comment">
              {this.state.data.employeeComment}
            </InformationBlock>

            <SideDraw
              title="Record"
              openDraw={showForm}
              onClose={this.closeSideDraw}
            >
              {this.renderUpdateForm()}
            </SideDraw>

            <Modal
              title="delete record"
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
  connect(mapStateToProps, mapDispatchToProps)(TrainingRecord)
);
