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
        <div className="flush  soft__triple  background--white  brb--half">
          <h2 className="flush">The Survey</h2>
          <div className="ruler--hr"></div>
          <form>
            <input type="text" placeholder="Name"></input>
            <input type="text" placeholder="Email Address"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default HomePage;
