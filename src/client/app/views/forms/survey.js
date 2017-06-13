import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { updateField, sendSubmission } from '../../actions';

import Input from '../components/input';
import RadioButton from '../components/radioButton';

export class SurveyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: null,
      error: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.submit(this.props.submission);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="flush  soft__triple  background--white  bb--grey">
          <h2 className="flush">The Survey</h2>
          <div className="ruler--hr"></div>

          <div className="push__double--top">
            <Input
              name="name"
              className="name"
              type="text"
              text="What's your name?"
              placeholder="Your Name"
              value={this.props.submission.fields.name}
              onBlur={((e) => this.props.update('name', e.target.value)).bind(this)}
              onChange={((e) => this.props.update('name', e.target.value)).bind(this)}
              required={true}
              full={true}/>
          </div>
          <div className="push__double--top">
            <Input
              name="email"
              className="email"
              type="text"
              text="What's your email address?"
              placeholder="Your Email Address"
              value={this.props.submission.fields.email}
              onBlur={((e) => this.props.update('email', e.target.value)).bind(this)}
              onChange={((e) => this.props.update('email', e.target.value)).bind(this)}
              full={true}/>
          </div>
          <div className="push__double--top">
            <Input
              name="fav-cat"
              className="fav-cat"
              type="text"
              text="What's your favourite breed of cat?"
              value={this.props.submission.fields.favCat}
              onBlur={((e) => this.props.update('favCat', e.target.value)).bind(this)}
              onChange={((e) => this.props.update('favCat', e.target.value)).bind(this)}
              required={true}
              full={true}/>
          </div>
          <div className="push__double--top">
            <Input
              name="fav-buzzword"
              className="fav-buzzword"
              type="text"
              text="What's your favourite buzzword?"
              value={this.props.submission.fields.favBuzzword}
              onBlur={((e) => this.props.update('favBuzzword', e.target.value)).bind(this)}
              onChange={((e) => this.props.update('favBuzzword', e.target.value)).bind(this)}
              required={true}
              full={true}/>
          </div>
          <div className="push__double--top">
            <Input
              name="least-fav-buzzword"
              className="least-fav-buzzword"
              type="text"
              text="What's your least favourite buzzword?"
              value={this.props.submission.fields.leastFavBuzzword}
              onBlur={((e) => this.props.update('leastFavBuzzword', e.target.value)).bind(this)}
              onChange={((e) => this.props.update('leastFavBuzzword', e.target.value)).bind(this)}
              required={true}
              full={true}/>
          </div>
        </div>
        <div className="flush  soft__double--ends  soft__triple--sides  background--white  brb--half  cf">
          {this.props.submission.error ? (
            <div>
              <p className="text--error">
                Something went wrong sending your submission: {this.props.submission.error}
              </p>
            </div>
          ) : undefined}

          <input className="fr" type="submit" value="Submit"></input>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { submission } = state;

  return {
    submission
  };
}

const mapDispatchToProps = dispatch => ({
  submit(data) {
    dispatch(sendSubmission(data));
  },

  update(name, value) {
    dispatch(updateField(name, value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
