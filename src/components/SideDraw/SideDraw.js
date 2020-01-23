import React, { Component } from 'react';
import { IoMdClose } from 'react-icons/io';
import LightBox from '../LightBox/LightBox';
import classes from './SideDraw.module.scss';

export default class SideDraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e) {
    this.setState({ open: false });
    this.props.onClose();
  }

  render() {
    return (
      <>
        {this.state.open || this.props.openDraw ? <LightBox /> : null}
        <div
          className={`${classes.SideDraw} ${
            this.state.open || this.props.openDraw ? classes.Show : classes.Hide
          }`}
        >
          <div className={classes.Title}>
            <h5>{this.props.title}</h5>
            <IoMdClose
              className={classes.CloseIcon}
              onClick={this.handleClose}
            />
          </div>
          <div className={classes.Body}>{this.props.children}</div>
        </div>
      </>
    );
  }
}
