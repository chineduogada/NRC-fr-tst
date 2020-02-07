import React, { Component } from 'react';
import classes from './Dropdown.module.scss';
// import DropdownItems from './DropdownItems/DropdownItems';
import { IoIosArrowDown } from 'react-icons/io';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drop: false,
      parent: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  runDelay(newState, delay = 100) {
    setTimeout(() => this.setState(newState), delay);
  }

  hideDropdown(event) {
    this.runDelay({ drop: false });
  }

  handleClick(event) {
    this.setState({ drop: !this.state.drop });
  }

  render() {
    const { drop } = this.state;
    return (
      <div className={classes.Dropdown}>
        <button
          className={classes.Trigger}
          onClick={this.handleClick}
          onBlur={this.hideDropdown}
        >
          {this.props.trigger}
          <IoIosArrowDown className={classes.TriggerIcon} />
        </button>

        {/* Dropdown Items */}
        <div
          className={`${classes.Items} ${drop ? classes.Drop : null}`}
          onClick={this.hideDropdow}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Dropdown;
