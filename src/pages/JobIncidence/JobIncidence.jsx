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
import classes from './JobIncidence.module.scss';

class JobIncidence extends Form {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      data: null,
      options: {
        reasonCodes: [],
        decisionCodes: [],
      },
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
    reasonDescription: Joi.string().allow('').optional(),
    decisionCodeId: Joi.number(),
    decisionDescription: Joi.string().allow('').optional(),
    attachedDoc: Joi.string().allow('').optional(),
    remarks: Joi.string().allow('').optional(),
  };

  async fetchJobIncidence() {
    const res = await httpService.get(`/job-incidence/${this.id}`);

    if (res) {
      this.setState({
        data: res.data.data,
        formData: this.filterForForm(res.data.data),
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
        name: 'decision code',
        value: data.decisionCode.code,
      },
    ];
  }

  mapDataForIncidenceLines(data) {
    return [
      {
        name: 'reason description',
        value: data.reasonDescription,
      },
      {
        name: 'decision description',
        value: data.decisionDescription,
      },
    ];
  }

  mapDataRemarks(data) {
    return [
      {
        name: 'remarks',
        value: data.remarks,
      },
    ];
  }

  filterForForm(data) {
    return {
      transactionDate: data.transactionDate,
      ippisNo: data.ippisNo,
      memoReference: data.memoReference,
      reasonCodeId: data.reasonCodeId,
      decisionCodeId: data.decisionCodeId,
      reasonDescription: data.reasonDescription,
      decisionDescription: data.decisionDescription,
      attachedDoc: data.attachedDoc,
      remarks: data.remarks,
    };
  }

  filterDataForView(data) {
    return {
      employee: `${data.employee.firstName} ${data.employee.lastName}`,
      transactionDate: data.transactionDate,
      ippisNo: data.ippisNo,
      memoReference: data.memoReference,
      reasonCodeId: data.reasonCodeId,
      decisionCodeId: data.decisionCodeId,
      reasonDescription: data.reasonDescription,
      decisionDescription: data.decisionDescription,
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
      `/job-incidence/${this.id}`,
      this.state.formData
    );

    this.stopProcessing();

    if (res) {
      await this.fetchJobIncidence();
      toast.success('Job incidence successfully updated!');
      this.closeSideDraw();
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
          nameMapper(this.props.options.incidenceReasonCodes, 'code'),
          null,
          null,
          formData.reasonCodeId
        )}
        {this.renderTextArea(
          'reason description',
          'reasonDescription',
          null,
          formData.reasonDescription
        )}
        {this.renderSelect(
          'decision code',
          'decisionCodeId',
          nameMapper(this.props.options.incidenceDecisionCodes, 'code'),
          null,
          null,
          formData.decisionCodeId
        )}
        {this.renderTextArea(
          'decision description',
          'decisionDescription',
          null,
          formData.decisionDescription
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
          <p className="data-item-label">{d.name}:</p>
          <span className="data-item-value">{d.value}</span>
        </div>
      );
    });
  }

  render() {
    const { showForm, showModal, data } = this.state;

    return (
      <React.Fragment>
        {data ? (
          <Section title="job incidence">
            <div className={`${classes.Actions} ${classes.Right}`}>
              <Button label="update" fill onClick={this.handleUpdateBtnClick} />
              <Button label="delete" danger onClick={this.handleDelete} />
            </div>

            <InformationBlock title="basic">
              {this.displayInfo(this.mapDataForView(data))}
            </InformationBlock>

            <InformationBlock title="descriptions">
              {this.displayInfo(this.mapDataForIncidenceLines(data))}
            </InformationBlock>

            <InformationBlock title="remark">
              <p className="data-item-value">{data.remarks}</p>
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

const mapStateToProps = (state) => {
  return {
    options: {
      incidenceReasonCodes: state.options.incidenceReasonCode,
      incidenceDecisionCodes: state.options.incidenceDecisionCode,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setOptions: (payload) => dispatch(setOptions(payload)) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JobIncidence)
);
