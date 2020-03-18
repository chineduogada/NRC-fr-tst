import React, { Component } from 'react';
import Input from '../Input/Input';
import { MdTrendingFlat } from 'react-icons/md';
import Select from '../Select/Select';

class RangeInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: '',
      to: this.props.defaultValue || ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  setValue(name, value) {
    this.setState({ [name]: value });
  }

  /**
   * Provides the range as an array to an external consumer
   * The consumer is a callbak passed to this component as
   * `consumerRange` prop
   */
  provideRange() {
    const { fieldName, consumeRange } = this.props;
    const { from, to } = this.state;

    if (consumeRange) {
      consumeRange({
        currentTarget: {
          name: fieldName,
          value: [{ value: from }, { value: to }]
        }
      });
    }
  }

  async handleChange({ currentTarget: { name, value } }) {
    await this.setValue(name, value);
    this.provideRange();
  }

  useInput(name, defaultValue, disabled) {
    const { type, placeholder } = this.props;

    return (
      <Input
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={this.handleChange}
      />
    );
  }

  renderRange() {
    const { field, label, disabled } = this.props;
    return (
      <div className="form-group">
        <label>{label}</label>
        <div className="d-flex align-items-center" style={{ flexWrap: 'wrap' }}>
          {this[field]('from', '', disabled)}
          <span
            style={{ margin: '0 0.3em', alignSelf: 'center', lineHeight: 0 }}
          >
            <MdTrendingFlat />
          </span>
          {this[field]('to', this.state.from, this.state.from === '')}
        </div>
      </div>
    );
  }

  render() {
    if (this.props.field) {
      return this.renderRange();
    } else {
      throw new Error(
        "Please specify a valid field prop value to use for the range. Possible values are 'useInput', 'useSelect', and 'useReactSelect'"
      );
    }
  }
}

export default RangeInput;
