import React, { Component } from 'react';
import classes from './Template.module.scss';

export default class extends Component {
  checkAndRender(name, value) {
    return value ? (
      <li>
        <span>{name}:</span>
        <span>{value}</span>
      </li>
    ) : null;
  }

  renderTemplate(row, index) {
    return (
      <ul key={index} className={classes.Row}>
        {this.checkAndRender('ippis number', row.id)}
        <li>
          <span>full name:</span>
          <span>
            {row.lastName} {row.firstName} {row.middleNames}
          </span>
        </li>

        {this.checkAndRender('initials', row.initials)}
        {this.checkAndRender('date of birth', row.dateOfBirth)}
        {this.checkAndRender('gender', row.gender)}
        {this.checkAndRender('geopolitical zone', row.gpz)}
        {this.checkAndRender('state', row.state)}
        {this.checkAndRender('senatorial district', row.senatorialDistrict)}
        {this.checkAndRender('LGA', row.lga)}
        {this.checkAndRender('department', row.department)}
        {this.checkAndRender('district', row.district)}
        {this.checkAndRender('salary structure', row.salaryStructure)}
        {this.checkAndRender('resumption date', row.resumptionDate)}
        {this.checkAndRender(
          'expected retirement date',
          row.expectedRetirementDate
        )}
        {this.checkAndRender('present job grade', row.presentJobGrade)}
        {this.checkAndRender('present job title', row.presentJobTitle)}
      </ul>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div className={classes.ReportTemplate}>
        <div className={`d-flex ${classes.Header}`}>
          <div className={classes.Brand}>
            <div className={classes.Logo}></div>
            <h4>PRM</h4>
          </div>

          <div className={classes.ReportTitle}>
            <h1>Report</h1>
          </div>

          <p>{new Date().toISOString()}</p>
        </div>

        <hr />

        <div>{data.map((row, index) => this.renderTemplate(row, index))}</div>
      </div>
    );
  }
}
