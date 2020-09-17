import React, { Component } from 'react';
import MainContainer from './containers/MainContainer';
import DataContainer from './containers/DataContainer';
import Login from './components/login/Login';
import Signup from './components/login/Signup';

// maybe change to functional component?
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="app-container">
        <div id="main">
          <MainContainer />
        </div>
        <div id="data">
          <DataContainer />
        </div>
      </div>
    );
  }
}

export default App;
