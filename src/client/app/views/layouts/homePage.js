import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import SurveyForm from '../forms/survey';
import Loading from '../components/loading';
import Success from '../components/success';

const survey = <SurveyForm/>;
const loading = <Loading/>;
const success = <Success/>;

export class HomePage extends Component {

  render() {
    let formView = survey;

    if (this.props.submission.isSending) {
      formView = loading;
    }

    if (this.props.submission.sendApplicationResult) {
      formView = success;
    }

    return (
      <div className="content">
        <div className="flush  soft__triple  background--white  brt--half  bb--grey">
          <h1 className="flush">Serverless Architecture</h1>
          <div className="ruler--hr"></div>
          <p>
            Thanks for listening to our talk at the BCS event. We hope you enjoyed it!
          </p>
          <p>This is an example application running on AWS leveraging Serverless technologies.</p>
          <p>
            If you could take the time to fill out the survey on this page, we'll post some metrics on our twitter <a href="https://twitter.com/infinityworks">@InfinityWorks</a> later.
            We will even take a screenshot of the billing
            page as proof that it costs next to nothing to run. ;)
          </p>
        </div>
        {formView}
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { submission } = state;

  return {
    submission
  };
}

export default connect(mapStateToProps)(HomePage);
