import React from 'react';
import Form from '../../Form/Form';
import Joi from 'joi-browser';

export default class registerDatabase extends Form {
  state = {
    data: {
      dialect: '',
      database: '',
      host: '',
      port: '',
      username: '',
      password: ''
    },
    errors: {}
  };

  schema = {
    dialect: Joi.string().label('Dialect'),
    database: Joi.string()
      .required()
      .label('Database'),
    host: Joi.string()
      .required()
      .label('Host'),
    port: Joi.number()
      .required()
      .label('Port'),
    username: Joi.string()
      .allow('')
      .label('Username'),
    password: Joi.string()
      .allow('')
      .label('Password')
  };

  handleSubmit() {
    console.log('DB Registered');
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div>
        <h2 className="form-title">register client database</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect('Dialect', 'dialect', [
            'mssql',
            'mysql',
            'postgresql'
          ])}
          {this.renderInput('Database', 'database')}
          {this.renderInput('Host', 'host')}
          {this.renderInput('Port', 'port', 'eg.8080', 'number')}
          {this.renderInput('Username', 'username')}
          {this.renderInput('Password', 'password', '', 'password')}
          {this.renderButton('Test Connection')}
        </form>
      </div>
    );
  }
}
