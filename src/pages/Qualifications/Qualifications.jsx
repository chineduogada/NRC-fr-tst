import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { setOptions } from '../../store/options/actionCreators';
import nameMapper from '../../helpers/nameMapper';
import StaticModel from '../../components/StaticModel/StaticModel';
import classes from './Qualifications.module.scss';

class Qualifications extends StaticModel {
  constructor(props) {
    super(props);
    this.name = 'Qualifications';
    this.formData = {
      qualification: '',
      statusId: '',
    };
    this.schema = {
      qualification: Joi.string(),
      statusId: Joi.number(),
    };
    this.resourcePath = '/qualifications';
    this.keysToIgnoreOnRowClick = [''];
    this.columns = [
      { accessor: 'qualification', Header: 'Qualification' },
      { accessor: 'status.status', Header: 'Status' },
    ];
  }

  updateStore(data) {
    this.props.setOptions({ qualification: data });
  }

  renderUpdateForm() {
    return (
      <div className={classes.Preview}>
        <div className={classes.Actions}>
          {/* <Button
            label='delete'
            danger
            onClick={this.handleDelete}
            disabled={this.state.isDeleteting}
          /> */}
        </div>
        <form
          ref={(form) => (this.updateForm = form)}
          onSubmit={this.handleSubmit}
        >
          {this.renderInput(
            'qualification',
            'qualification',
            null,
            this.state.rowToPreview.qualification
          )}
          {this.renderSelect(
            'status ',
            'statusId',
            nameMapper(this.props.status, 'status'),
            null,
            null,
            this.state.formData.statusId
          )}

          {this.renderButton('update')}
        </form>
      </div>
    );
  }

  renderCreateForm() {
    return (
      <form ref={(form) => (this.Form = form)} onSubmit={this.handleSubmit}>
        <p>Add a new qualification</p>

        {this.renderInput('qualification', 'qualification')}
        {this.renderSelect(
          'status ',
          'statusId',
          nameMapper(this.props.status, 'status')
        )}

        {this.renderButton('save')}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.options.status,
    data: state.options.qualification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setOptions: (payload) => dispatch(setOptions(payload)) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Qualifications)
);
