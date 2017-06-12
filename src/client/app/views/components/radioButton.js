import React, { Component } from 'react';

export default class RadioButton extends Component {
  render() {
    return (
      <label className="push__base--bottom">
        <div className="inline-block  push__double--right  valign-top">
          <input
            type="radio"
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            defaultChecked={this.props.checked} />
        </div>
        <div className="inline-block">
          <p className="flush">{this.props.label}</p>
          <p className="flush  text--small">{this.props.subtext}</p>
        </div>
      </label>
    );
  }
}
