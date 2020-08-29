import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch('http://localhost:9000/data')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => console.log(err));
  };

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.apiResponse}</p>
        </header>
      </div>
    );
  }
}

export default App;
