import React from 'react';
import { withRouter } from 'react-router-dom';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { setOptions } from '../../store/options/actionCreators';
import nameMapper from '../../helpers/nameMapper';
import StaticModel from '../../components/StaticModel/StaticModel';
import classes from './Districts.module.scss';

class Districts extends StaticModel {
  constructor(props) {
    super(props);

    this.name = 'Districts';
    this.formData = {
      siteCode: '',
      siteName: '',
      address: '',
      statusId: '',
    };
    this.schema = {
      siteCode: Joi.string(),
      siteName: Joi.string(),
      address: Joi.string().allow('').optional(),
      statusId: Joi.number(),
    };
    this.resourcePath = '/districts';
    this.keysToIgnoreOnRowClick = [''];
    this.columns = [
      { accessor: 'siteCode', Header: 'Site Code' },
      { accessor: 'siteName', Header: 'Site Name' },
      { accessor: 'address', Header: 'Address' },
      { accessor: 'status.status', Header: 'Status' },
    ];
  }

  updateStore(data) {
    this.props.setOptions({ district: data });
  }

  renderUpdateForm() {
    console.log(this.state.rowToPreview.statusId);
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
            'siteCode',
            'siteCode',
            null,
            this.state.rowToPreview.siteCode
          )}
          {this.renderInput(
            'siteName',
            'siteName',
            null,
            this.state.rowToPreview.siteName,
            null,
            null
          )}
          {this.renderInput(
            'address',
            'address',
            null,
            this.state.rowToPreview.address
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
        <p>Add a new district</p>

        {this.renderInput('site code', 'siteCode')}
        {this.renderInput('site name', 'siteName')}
        {this.renderInput('address', 'address')}
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
    data: state.options.district,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { setOptions: (payload) => dispatch(setOptions(payload)) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Districts)
);
