import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Feedback.module.css';

/**
 * This sends some feedback to the user
 * @param {Object} props 
 */
class Feedback extends Component {
  constructor(props) {
    super(props);

    this.feedBackType = this.props.type || classes.Default;
  }

  state = {
    showFeedBack: false,
  }

  // We show feedback only if there is a message for the user
  // componentDidMount() {
  //   const that = this;
  //   setTimeout(() => {
  //     that.setState({  });
  //   }, 5000);
  // }

  getFeedback() {
    return (
      <div className={`${classes.Feedback} ${this.props.message ? classes.Show : ''} ${this.feedBackType}`}>
        <p className={classes.Message}>{this.props.message}</p>
      </div>
    );
  }

  render() {
    return (
      <Aux>
        <div className={`${classes.Feedback} ${this.props.message ? classes.Show : ''} ${this.feedBackType}`}>
          <p className={classes.Message}>{this.props.message}</p>
        </div>
      </Aux>
    );
  }
}

export default Feedback;
