import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose, IoIosArrowRoundForward } from 'react-icons/io';
import classes from './QuickActions.module.scss';

export default class QuickActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showActions: false
    };

    this.actionList = [
      { title: 'Register a new employee', url: '/employees/new' },
      { title: 'Schedule a training', url: '/training-schedules?new' },
      { title: 'Add a career record', url: '/careers?new' },
      { title: 'Record incidence', url: '/job-incidence?new' },
      { title: 'View employee grid', url: '/search' },
      { title: 'Update static models', url: '/settings/static-models' }
    ];

    this.handleShowActions = this.handleShowActions.bind(this);
    this.handleHideActions = this.handleHideActions.bind(this);
  }

  handleShowActions() {
    this.setState({ showActions: true });
  }
  handleHideActions() {
    this.setState({ showActions: false });
  }

  actionTemplate(action, key) {
    return (
      <li key={key} onClick={this.handleHideActions}>
        <Link to={action.url} className="d-flex">
          <span>{action.title}</span>
          <IoIosArrowRoundForward size="1rem" />
        </Link>
      </li>
    );
  }

  renderActionList() {
    const { showActions } = this.state;
    return (
      <div
        className={`${classes.Actions} ${showActions ? classes.Active : null}`}
      >
        <h5 className={classes.Header}>Hi, what do you want to do?</h5>
        <ul>
          {this.actionList.map((action, idx) =>
            this.actionTemplate(action, idx)
          )}
        </ul>
      </div>
    );
  }

  render() {
    const { showActions } = this.state;

    return (
      <div
        className={classes.QuickActions}
        onMouseEnter={this.handleShowActions}
        onMouseLeave={this.handleHideActions}
      >
        {this.renderActionList()}
        <div
          className={`${classes.Toggler} ${
            showActions ? classes.Active : null
          }`}
        >
          <IoMdClose size="2rem" />
        </div>
      </div>
    );
  }
}
