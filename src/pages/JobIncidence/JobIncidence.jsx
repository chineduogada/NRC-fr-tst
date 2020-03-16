import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import InformationBlock from '../../components/InformationBlock/InformationBlock';
import SideDraw from '../../components/SideDraw/SideDraw';
import Modal from '../../components/Modal/Modal';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import classes from './JobIncidence.module.scss';

class JobIncidence extends Form {
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
        transactionDate: '',
        ippisNo: '',
        memoReference: '',
        reasonCodeId: '',
        reasonDescription: '',
        decisionCodeId: '',
        decisionDescription: '',
        attachedDoc: '',
        remarks: ''
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
    ippisNo: Joi.number(),
    transactionDate: Joi.string(),
    memoReference: Joi.string(),
    reasonCodeId: Joi.number(),
    reasonDescription: Joi.string()
      .allow('')
      .optional(),
    decisionCodeId: Joi.number(),
    decisionDescription: Joi.string()
      .allow('')
      .optional(),
    attachedDoc: Joi.string()
      .allow('')
      .optional(),
    remarks: Joi.string()
      .allow('')
      .optional()
  };

  async fetchJobIncidence() {
    const res = await httpService.get(`/job-incidence/${this.id}`);

    if (res) {
      this.setState({
        dataFilteredForView: this.filterDataForView(res.data.data),
        dataForView: this.mapDataForView(res.data.data),
        dataForForm: this.filterForForm(res.data.data)
      });
    }
  }

  async componentDidMount() {
    await this.fetchJobIncidence();
  }

  closeSideDraw(e) {
    this.setState({ showForm: false });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  mapDataForView(data) {
    return [
      { name: 'transaction date', value: data.transactionDate },
      { name: 'ippisNo', value: data.ippisNo },
      {
        name: 'full name',
        value: `${data.employee.firstName} ${data.employee.lastName}`
      },
      { name: 'memo reference', value: data.memoReference },
      {
        name: 'reason code',
        value: data.reasonCode.code
      },
      {
        name: 'decision code',
        value: data.decisionCode.code
      }
    ];
  }

  mapDataForIncidenceLines(data) {
    return [
      {
        name: 'incidence line 1',
        value: data.incidenceLine1
      },
      {
        name: 'incidence line 2',
        value: data.incidenceLine2
      },
      {
        name: 'incidence line 3',
        value: data.incidenceLine3
      },
      {
        name: 'incidence line 4',
        value: data.incidenceLine4
      },
      {
        name: 'incidence line 5',
        value: data.incidenceLine5
      }
    ];
  }

  mapDataRemarks(data) {
    return [
      {
        name: 'remarks',
        value: data.remarks
      }
    ];
  }

  filterForForm(data) {
    return {
      transactionDate: data.transactionDate,
      ippisNo: data.ippisNo,
      memoReference: data.memoReference,
      reasonCodeId: data.reasonCodeId,
      incidenceLine1: data.incidenceLine1,
      incidenceLine2: data.incidenceLine2,
      incidenceLine3: data.incidenceLine3,
      incidenceLine4: data.incidenceLine4,
      incidenceLine5: data.incidenceLine5,
      attachedDoc: data.attachedDoc,
      remarks: data.remarks
    };
  }

  filterDataForView(data) {
    return {
      employee: `${data.employee.firstName} ${data.employee.lastName}`,
      transactionDate: data.transactionDate,
      ippisNo: data.ippisNo,
      memoReference: data.memoReference,
      reasonCodeId: data.reasonCodeId,
      incidenceLine1: data.incidenceLine1,
      incidenceLine2: data.incidenceLine2,
      incidenceLine3: data.incidenceLine3,
      incidenceLine4: data.incidenceLine4,
      incidenceLine5: data.incidenceLine5,
      attachedDoc: data.attachedDoc,
      remarks: data.remarks
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
      `/job-incidence/${this.id}`,
      this.state.formData
    );

    this.stopProcessing();

    if (res) {
      await this.fetchJobIncidence();
      toast.success('Job incidence successfully updated!');
      this.closeSideDraw();
      this.resetFormData();
    }
  }

  async deleteObject() {
    this.setState({ isDeleteting: true });
    const res = await httpService.delete(`/job-incidence/${this.id}`);

    if (res) {
      toast.success('Job incidence successfully deleted!');
      this.props.history.push('/job-incidence');
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
    this.props.history.push(`/employees/${currentTarget.id}`);
  }

  async doSubmit(event) {
    console.log('updating');
    return this.updateDatabase();
  }

  renderUpdateForm() {
    const { dataForForm } = this.state;

    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        {this.renderInput(
          'transaction date',
          'transactionDate',
          null,
          dataForForm.transactionDate,
          'date'
        )}
        {this.renderInput(
          'memo reference',
          'memoReference',
          null,
          dataForForm.memoReference
        )}
        {this.renderSelect('reason code', 'reasonCodeId', [
          { id: 1, name: 'fighting' },
          { id: 2, name: 'stealing' }
        ])}
        {this.renderInput(
          'transaction date',
          'transactionDate',
          null,
          null,
          'date'
        )}
        {this.renderInput(
          'incindence line 1',
          'incidenceLine1',
          null,
          dataForForm.incidenceLine1
        )}
        {this.renderInput(
          'incindence line 2',
          'incidenceLine2',
          null,
          dataForForm.incidenceLine2
        )}
        {this.renderInput(
          'incindence line 3',
          'incidenceLine3',
          null,
          dataForForm.incidenceLine3
        )}
        {this.renderInput(
          'incindence line 4',
          'incidenceLine4',
          null,
          dataForForm.incidenceLine4
        )}
        {this.renderInput(
          'incindence line 5',
          'incidenceLine5',
          null,
          dataForForm.incidenceLine5
        )}
        {this.renderTextArea('remarks', 'remarks', null, dataForForm.remarks)}

        {this.renderButton('save')}
      </form>
    );
  }

  displayInfo(data) {
    return data.map((d, i) => {
      return (
        <div className={classes.DisplayInfo} key={i}>
          <p className="data-item-label">{d.name}:</p>
          <span className="data-item-value">{d.value}</span>
        </div>
      );
    });
  }

  render() {
    const { showForm, showModal, dataForView, dataForForm } = this.state;

    return (
      <React.Fragment>
        {dataForView ? (
          <Section title="job incidence">
            <div className={`${classes.Actions} ${classes.Right}`}>
              <Button label="update" fill onClick={this.handleUpdateBtnClick} />
              <Button label="delete" danger onClick={this.handleDelete} />
              <Button
                label="view employee"
                plain
                onClick={this.handleViewEmployee}
                id={dataForForm.ippisNo}
              />
            </div>

            <InformationBlock title="basic">
              {this.displayInfo(dataForView)}
            </InformationBlock>

            <InformationBlock title="incidence lines">
              {this.displayInfo(
                this.mapDataForIncidenceLines(this.state.dataFilteredForView)
              )}
            </InformationBlock>

            <InformationBlock title="remark">
              <p className="data-item-value">{dataForForm.remarks}</p>
            </InformationBlock>

            <SideDraw
              title="job incidence"
              openDraw={showForm}
              onClose={this.closeSideDraw}
            >
              {this.renderUpdateForm()}
            </SideDraw>

            <Modal
              title="delete job incidence"
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

export default withRouter(JobIncidence);
