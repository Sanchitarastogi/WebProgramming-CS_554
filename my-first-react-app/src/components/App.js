import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './Clock'



class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Clock date={new Date()} timeDiff={0} place="New Jersey,US"/>
        <Clock date={new Date()} timeDiff={-3} place="California,US" />
        <Clock date={new Date()} timeDiff={5} place="London,UK" />
      </div>
    );
  }
}

export default App;