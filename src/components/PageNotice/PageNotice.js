import React, { Component } from 'react';
import classes from './PageNotice.module.scss';
import { IoMdClose } from 'react-icons/io';

export default class PageNotice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e) {
    this.setState({ hide: true });
  }

  showNotice() {
    return (
      <div className={classes.Notice}>
        <p>{this.props.children}</p>
        <button
          className={classes.CloseBtn}
          onClick={this.handleClose}
        >
          <IoMdClose className='icon' />
        </button>
      </div>
    );
  }

  render() {
    return this.state.hide ? null : this.showNotice();
  }
}
