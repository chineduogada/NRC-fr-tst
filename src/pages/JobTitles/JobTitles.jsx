import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { setOptions } from '../../store/options/actionCreators';
import nameMapper from '../../helpers/nameMapper';
import StaticModel from '../../components/StaticModel/StaticModel';
import classes from './JobTitles.module.scss';

class JobTitles extends StaticModel {
  constructor(props) {
    super(props);

    this.name = 'Job Titles';
    this.formData = {
      code: '',
      description: '',
      statusId: '',
    };
    this.schema = {
      code: Joi.string(),
      description: Joi.string(),
      statusId: Joi.number(),
    };
    this.resourcePath = '/job-titles';
    this.keysToIgnoreOnRowClick = [''];
    this.columns = [
      { accessor: 'code', Header: 'Code' },
      { accessor: 'description', Header: 'Description' },
      { accessor: 'status.status', Header: 'Status' },
    ];
  }

  updateStore(data) {
    this.props.setOptions({ jobTitle: data });
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
          {this.renderInput('code', 'code', null, this.state.rowToPreview.code)}
          {this.renderInput(
            'description',
            'description',
            null,
            this.state.rowToPreview.description
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
        <p>Add a new job title</p>

        {this.renderInput('code', 'code')}
        {this.renderInput('description', 'description')}
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
    data: state.options.jobTitle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setOptions: (payload) => dispatch(setOptions(payload)) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JobTitles)
);
