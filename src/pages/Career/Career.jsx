import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { setOptions } from '../../store/options/actionCreators';
import nameMapper from '../../helpers/nameMapper';
import autobind from '../../helpers/autobind';
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
      data: null,

      showForm: false,
      showModal: false,

      formData: {
        transactionDate: '',
        ippisNo: '',
        memoReference: '',
        reasonCodeId: '',
        newJobTitleId: '',
        attachedDoc: '',
        remarks: '',
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
    ippisNo: Joi.number(),
    transactionDate: Joi.string(),
    memoReference: Joi.string(),
    reasonCodeId: Joi.number(),
    newJobTitleId: Joi.number(),
    attachedDoc: Joi.string().allow('').optional(),
    remarks: Joi.string().allow('').optional(),
  };

  async fetchCareer() {
    const res = await httpService.get(`/careers/${this.id}`);

    if (res) {
      console.log(res.data);
      this.setState({
        data: res.data.data,
        formData: this.filterForForm(res.data.data),
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
        value: (
          <Link to={`/employees/${data.ippisNo}`} target="_blank">
            {data.employee.firstName} {data.employee.lastName}
          </Link>
        ),
      },
      { name: 'memo reference', value: data.memoReference },
      {
        name: 'reason code',
        value: data.reasonCode.code,
      },
      {
        name: 'old job title',
        value: data.oldJobTitle ? data.oldJobTitle.description : 'null',
      },
      {
        name: 'new job title',
        value: data.newJobTitle.description,
      },
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
      remarks: data.remarks,
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
    const { formData } = this.state;

    return (
      <form ref={(form) => (this.Form = form)} onSubmit={this.handleSubmit}>
        {this.renderInput(
          'transaction date',
          'transactionDate',
          null,
          formData.transactionDate,
          'date'
        )}
        {this.renderInput(
          'memo reference',
          'memoReference',
          null,
          formData.memoReference
        )}
        {this.renderSelect(
          'reason code',
          'reasonCodeId',
          nameMapper(this.props.options.careerReasonCodes, 'code'),
          null,
          false,
          Number(formData.reasonCodeId)
        )}
        {this.renderSelect(
          'new job title',
          'newJobTitleId',
          nameMapper(this.props.options.jobTitles, 'description'),
          null,
          false,
          Number(formData.newJobTitleId)
        )}
        {this.renderTextArea('remarks', 'remarks', null, formData.remarks)}

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
    const { showForm, showModal, data } = this.state;

    return (
      <React.Fragment>
        {data ? (
          <Section title="career">
            <div className={`${classes.Actions} ${classes.Right}`}>
              <Button label="update" fill onClick={this.handleUpdateBtnClick} />
              <Button label="delete" danger onClick={this.handleDelete} />
              <Button
                label="view employee"
                plain
                onClick={this.handleViewEmployee}
                id={data.ippisNo}
              />
            </div>

            <InformationBlock title="basic">
              {this.displayInfo(this.mapDataForView(data))}
            </InformationBlock>

            <InformationBlock title="remark">{data.remarks}</InformationBlock>

            <SideDraw
              title="Career"
              openDraw={showForm}
              onClose={this.closeSideDraw}
            >
              {this.renderUpdateForm()}
            </SideDraw>

            <Modal
              title="delete career record"
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
      careerReasonCodes: state.options.careerReasonCode,
      jobTitles: state.options.jobTitle,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setOptions: (payload) => dispatch(setOptions(payload)) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Career));
