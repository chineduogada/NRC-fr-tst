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
import classes from './Career.module.scss';

class Career extends Form {
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
        newJobTitleId: '',
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
    newJobTitleId: Joi.number(),
    attachedDoc: Joi.string()
      .allow('')
      .optional(),
    remarks: Joi.string()
      .allow('')
      .optional()
  };

  async fetchCareer() {
    const res = await httpService.get(`/careers/${this.id}`);

    if (res) {
      this.setState({
        dataFilteredForView: this.filterDataForView(res.data.data),
        dataForView: this.mapDataForView(res.data.data),
        dataForForm: this.filterForForm(res.data.data)
      });
    }
  }

  async componentDidMount() {
    await this.fetchCareer();
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
        name: 'old job title',
        value: data.oldJobTitleId
      },
      {
        name: 'new job title',
        value: data.newJobTitleId
      }
    ];
  }

  filterForForm(data) {
    return {
      transactionDate: data.transactionDate,
      ippisNo: data.ippisNo,
      memoReference: data.memoReference,
      reasonCodeId: data.reasonCodeId,
      newJobTitleId: data.newJobTitleId,
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
      newJobTitleId: data.newJobTitleId,
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
      `/careers/${this.id}`,
      this.state.formData
    );

    if (res) {
      await this.fetchCareer();
      toast.success('Career record successfully updated!');
      this.stopProcessing();
      this.closeSideDraw();
      this.resetFormData();
    }
  }

  async deleteObject() {
    this.setState({ isDeleteting: true });
    const res = await httpService.delete(`/careers/${this.id}`);

    if (res) {
      toast.success('Career record successfully deleted!');
      this.props.history.push('/careers');
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
          { id: 1, name: 'promotion' },
          { id: 2, name: 'demotion' }
        ])}
        {this.renderSelect('new job title', 'newJobTitleId', [
          { id: 1, name: 'managing director' },
          { id: 2, name: 'some other title' }
        ])}
        {this.renderTextArea('remarks', 'remarks', null, dataForForm.remarks)}

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
    const { showForm, showModal, dataForView, dataForForm } = this.state;

    return (
      <React.Fragment>
        {dataForView ? (
          <Section title='career'>
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

            <InformationBlock title='remark'>
              {dataForForm.remarks}
            </InformationBlock>

            <SideDraw
              title='Career'
              openDraw={showForm}
              onClose={this.closeSideDraw}
            >
              {this.renderUpdateForm()}
            </SideDraw>

            <Modal
              title='delete career record'
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

export default withRouter(Career);
