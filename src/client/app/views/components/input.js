import React, { Component } from 'react';

export default class Input extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      value: null,
      focus: false,
      empty: this.props.value && this.props.value.length === 0,
      valid: null
    };
  }

  isValid(e) {
    let valid = true;
    if (this.props.validate) {
      valid = this.props.validate(e);
    }

    return valid;
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
      empty: e.target.value.length === 0
    });

    if (this.isValid(e) && this.props.onChange) {
      this.props.onChange(e);
    }

    e.preventDefault();
  }

  onFocus(e) {
    this.setState({
      focus: true
    });
  }

  onBlur(e) {
    this.setState({
      focus: false,
      valid: this.isValid(e)
    });
  }

  render() {
    let inputClass = '';
    if (this.state.focus) {
      inputClass = 'form-field--focus';
    }

    if (this.state.valid === false) {
      inputClass = 'form-field--error';
    }

    return (
      <div className={"inline-block  input-wrapper" + (this.props.full ? '  input-wrapper--full' : '')}>
        {this.props.text && this.props.text.length > 0 ? (
          <label className="form-field__label  push__base--bottom" htmlFor={this.props.text}>
            <span className="label__text">{this.props.text}</span>
            {this.props.required ? (
              <span className="text--error">*</span>
            ) : undefined}
          </label>
        ) : undefined}
        <div className={"form-field  " + inputClass + "  " + this.props.className}>
          <input
            name={this.props.name}
            type={this.props.type}
            maxLength={this.props.maxLength}
            placeholder={this.props.placeholder}
            className="form-field__input"
            defaultValue={this.props.value}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            required={typeof this.props.required !== 'undefined' || this.props.required}
            disabled={typeof this.props.disabled !== 'undefined' || this.props.disabled}
          />
        </div>
        {this.state.valid === false && this.props.errorMessage ? (
          <p className="text--error">{this.props.errorMessage}</p>
        ) : undefined}
      </div>
    )
  }
}
