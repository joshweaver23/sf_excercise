import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireIncidents: [],
      policeIncidents: [],
    };
  }

  callAPI() {
    fetch('http://localhost:9000/data')
      .then(res => res.json())
      .then(res => this.setState({
        fireIncidents: res.fireIncidents,
        policeIncidents: res.policeIncidents,
      }))
      .catch(err => console.log(err));
  };

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4>Most Recent Chapel Hill Fire and Police Calls</h4>
        </header>
        <section id='dataDisplay' className='main-section'>
          {this.state.fireIncidents.length > 0 ? (
            <div className='calls-box'>
              <h4>Fire Calls</h4>
              <ul>
                {this.state.fireIncidents.map((incident, index) => {
                  return (
                    <li key={`${incident}-${index}`}>{incident}</li>
                  )
                })}
              </ul>
            </div>
          ) : (
              <div className='calls-box'>
                <h4>Fire Calls</h4>
                <p>Loading ...</p>
              </div>
            )}

          {this.state.policeIncidents.length > 0 ? (
            <div className='calls-box'>
              <h4>Police Calls</h4>
              <ul>
                {this.state.policeIncidents.map((incident, index) => {
                  return (
                    <li key={index}>Call: {incident.reportedAs} || Report: {incident.loggedAs}</li>
                  )
                })}
              </ul>
            </div>
          ) : (
              <div className='calls-box'>
                <h4>Police Calls</h4>
                <p>Loading ...</p>
              </div>
            )}
        </section>
      </div>
    );
  }
}

export default App;
