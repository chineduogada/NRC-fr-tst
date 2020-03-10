import React, { Component } from 'react';
import classes from './Template.module.scss';

export default class extends Component {
  renderTemplate(row, index) {
    return (
      <div key={index} className={classes.Row}>
        <p>
          <span>Full name:</span>
          {row.lastName} {row.firstName} {row.middleNames}
        </p>

        <p>
          <span>State:</span>
          {row.state}
        </p>

        <p>
          <span>LGA:</span>
          {row.lga}
        </p>

        <p>
          <span>GPZ:</span>
          {row.gpz}
        </p>

        <p>
          <span>Senatorial District:</span>
          {row.senatorialDistrict}
        </p>

        <p>
          <span>Department:</span>
          {row.department}
        </p>
      </div>
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

        <div>{data.map((row, index) => this.renderTemplate(row, index))}</div>
      </div>
    );
  }
}
