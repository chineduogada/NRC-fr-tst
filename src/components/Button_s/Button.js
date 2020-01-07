import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.clicked || null}
        className={`${this.props.styleType} btn btn-${this.props.size}`}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
