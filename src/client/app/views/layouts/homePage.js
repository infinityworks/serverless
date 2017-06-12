import React, { Component } from 'react';

export class HomePage extends Component {

  render() {
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
        <form>
          <div className="flush  soft__triple  background--white  bb--grey">
            <h2 className="flush">The Survey</h2>
            <div className="ruler--hr"></div>
            <input className="block  soft__base  push__base--top" type="text" placeholder="Your Name"></input>
            <input className="block  soft__base  push__base--top" type="text" placeholder="Your Email Address"></input>
          </div>
          <div className="flush  soft__double--ends  soft__triple--sides  background--white  brb--half  cf">
            <input className="fr" type="submit" value="Submit"></input>
          </div>
        </form>

      </div>
    );
  }
}

export default HomePage;
