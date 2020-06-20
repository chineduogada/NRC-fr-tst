import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { setOptions } from '../../store/options/actionCreators';
import nameMapper from '../../helpers/nameMapper';
import StaticModel from '../../components/StaticModel/StaticModel';
import classes from './Skills.module.scss';

class Skills extends StaticModel {
  constructor(props) {
    super(props);
    this.name = 'Skills';
    this.formData = {
      skill: '',
      statusId: '',
    };
    this.schema = {
      skill: Joi.string(),
      statusId: Joi.number(),
    };
    this.resourcePath = '/skills';
    this.keysToIgnoreOnRowClick = [''];
    this.columns = [
      { accessor: 'skill', Header: 'Skill' },
      { accessor: 'status.status', Header: 'Status' },
    ];
  }

  updateStore(data) {
    this.props.setOptions({ skill: data });
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
            'skill',
            'skill',
            null,
            this.state.rowToPreview.skill
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
        <p>Add a new skill</p>

        {this.renderInput('skill', 'skill')}
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
    data: state.options.skill,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setOptions: (payload) => dispatch(setOptions(payload)) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Skills));
