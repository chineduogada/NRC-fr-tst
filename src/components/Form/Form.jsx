import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Spinner } from 'react-bootstrap';
import ReactSelect from '../ReactSelect/ReactSelect';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';
import TextArea from '../TextArea/TextArea';
import './Form.scss';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      error: {},

      isProcessing: false
    };

    this.stopProcessing = this.stopProcessing.bind(this);
  }

  validateField({ name, value }) {
    /**
     * ACCEPTS AN INPUT
     * CHECK IF IT'S VALUE IS EMPTY AFTER CHECK FOR WHICH INPUT IT IS
     * RETURN THE ERROR MSG
     */

    const formData = { [name]: value };
    const schema = {
      [name]: this.schema[name]
    };
    console.log(schema);

    const options = { abortEarly: true };

    const { error } = Joi.validate(formData, schema, options);
    console.log(error);
    return error ? error.details[0].message : null;
  }

  /**
   * Checks if the input's value is an array of objects and
   * returns a mapping of the 'value' property of each of the
   * objects in the array. if the target input's value is not an
   * array, the function simply returns the value as is
   * @param { Input } input the input element
   * @returns { Array || String } returns an array or a string
   */
  processInputValue(input) {
    return Array.isArray(input.value)
      ? input.value.map(option => option.value)
      : input.value;
  }

  handleChange = async event => {
    const { currentTarget: input } = event;

    if (input) {
      const formData = { ...this.state.formData };
      const errors = { ...this.state.errors };

      const errorMessage = this.validateField(input);
      errors[input.name] = errorMessage;

      formData[input.name] = this.processInputValue(input);

      await this.setState({ formData, errors });
    }
  };

  // handleReactSelectChange = ({ currentTarget: input }) => {
  //   console.log(input);

  //   if (input) {
  //     const formData = { ...this.state.formData };
  //     const errors = { ...this.state.errors };

  //     const errorMessage = this.validateField(input);
  //     errors[input.name] = errorMessage;
  //     formData[input.name] = input.value;
  //     this.setState({ formData, errors });
  //   }
  // };

  validate() {
    /**
     * CHECKS FOR ALL DATA PROPS
     * SEE IF ANY IS EMPTY
     * RETURN AN "ERRORS OBJ" MAPPING TO THE "DATA OBJ" (containing the error properties only)
     * OTHERWISE RETURN "NULL"
     */
    const { formData } = this.state;

    const options = { abortEarly: false };
    const { error } = Joi.validate(formData, this.schema, options);
    if (!error) return;

    const firsFieldWithError = this[error.details[0].path[0]];
    // check that this flagged field is actually rendered
    if (firsFieldWithError) {
      firsFieldWithError.focus();
    }

    const errors = {};
    error.details.map(detail => (errors[detail.path[0]] = detail.message));
    return errors;
  }

  startProcessing() {
    this.setState({ isProcessing: true });
  }

  stopProcessing() {
    this.setState({ isProcessing: false });
  }

  handleSubmit = event => {
    event.preventDefault();
    // check that the form is not already being processed. Just incase the user attempts to submit the form twice before a first response is returned from the server
    if (!this.state.isProcessing) {
      const errors = this.validate();
      console.log(this.state.formData, errors);
      this.setState({ errors: errors || {} });
      if (errors) return;

      this.startProcessing();

      this.doSubmit(event, this.stopProcessing);
    }
  };

  renderInput(
    label,
    name,
    placeholder,
    defaultValue = '',
    type = 'text',
    autofocus,
    disabled
  ) {
    const { errors } = this.state;

    return (
      <Input
        label={label}
        type={type}
        placeholder={placeholder}
        name={name}
        error={errors[name]}
        onChange={this.handleChange}
        defaultValue={defaultValue}
        autoFocus={autofocus}
        ref={input => (this[name] = input)}
        disabled={disabled}
        multiple
      />
    );
  }

  renderSelect(
    label,
    name,
    options,
    callback = () => null,
    disabled,
    selectedOption
  ) {
    const { formData, errors } = this.state;

    return (
      <Select
        options={options}
        label={label}
        name={name}
        error={errors[name]}
        id={name}
        value={`${formData[name]}`}
        onChange={event => {
          this.handleChange(event);
          if (callback) {
            callback(this);
          }
        }}
        ref={input => (this[name] = input)}
        disabled={disabled}
        selectedOption={selectedOption}
      />
    );
  }

  renderReactSelect(
    label,
    name,
    options,
    callback = () => null,
    disabled,
    selectedOption,
    isMulti
  ) {
    const { formData, errors } = this.state;

    return (
      <ReactSelect
        label={label}
        closeMenuOnSelect={false}
        hideSelectedOptions={true}
        isMulti={isMulti}
        inputId={name}
        options={options}
        name={name}
        error={errors[name]}
        id={name}
        value={`${formData[name]}`}
        getSelectObjectOnChange={reactSelectComponent => {
          const value = reactSelectComponent.currentTarget.value;
          reactSelectComponent.currentTarget.value = isMulti
            ? value
              ? value
              : []
            : value;

          this.handleChange(reactSelectComponent);
          if (callback) {
            const MutatedThis = {
              ...this,
              [reactSelectComponent.currentTarget.id]:
                reactSelectComponent.currentTarget
            };
            callback(MutatedThis);
          }
        }}
        ref={input => (this[name] = input)}
        disabled={disabled}
        defaultValue={selectedOption}
      />
    );
  }

  renderTextArea(
    label,
    name,
    placeholder,
    defaultValue = '',
    type = 'text',
    autofocus,
    disabled
  ) {
    const { errors } = this.state;

    return (
      <TextArea
        label={label}
        type={type}
        placeholder={placeholder}
        name={name}
        error={errors[name]}
        onChange={this.handleChange}
        defaultValue={defaultValue}
        autoFocus={autofocus}
        ref={input => (this[name] = input)}
        disabled={disabled}
      />
    );
  }

  renderButton(label) {
    const disabled = this.state.isProcessing;
    return (
      <React.Fragment>
        <Button label={label} fill disabled={disabled} />
        {disabled ? (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : null}
      </React.Fragment>
    );
  }
}
