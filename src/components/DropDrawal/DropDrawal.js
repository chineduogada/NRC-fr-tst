import React, { Component } from 'react';
import classes from './DropDrawal.module.scss';

export default class extends Component {
  drawalRef = {};

  state = {
    offsetTop: 0
  };

  componentDidMount() {
    console.log(this.drawalRef);
    this.setState({ offsetTop: this.drawalRef.offsetTop });
  }

  render() {
    const { showDrawal, title, footer, children } = this.props;

    const classList = `${classes.DrawalContainer} ${
      showDrawal ? classes.Show : null
    }`;

    return (
      <div
        className={classList}
        ref={drawal => (this.drawalRef = drawal)}
        style={{ height: `calc(100vh - ${this.state.offsetTop}px)` }}
      >
        <div className={classes.Header}>
          <h6>{title}</h6>
        </div>
        <div className={classes.Body}>
          {children}
          <div className={`d-flex ${classes.Footer}`}>{footer}</div>
        </div>
      </div>
    );
  }
}
