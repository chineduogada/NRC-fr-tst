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
    this.handleParentClick = this.handleParentClick.bind(this);
  }

  componentDidMount() {
    this.DropDown.parentElement.onclick = this.handleParentClick;
    this.setState({ parent: this.DropDown.parentElement });
  }

  handleParentClick(event) {
    event.stopPropagation();
    this.setState({ drop: false });
  }

  handleClick(event) {
    event.stopPropagation();
    this.setState({ drop: !this.state.drop });
  }

  render() {
    const { drop } = this.state;
    console.log(drop);
    return (
      <div
        className={classes.Dropdown}
        ref={dropdown => (this.DropDown = dropdown)}
      >
        <button className={classes.Trigger} onClick={this.handleClick}>
          {this.props.trigger}
          <IoIosArrowDown className={classes.TriggerIcon} />
        </button>

        {/* Dropdown Items */}
        <div className={`${classes.Items} ${drop ? classes.Drop : null}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Dropdown;
