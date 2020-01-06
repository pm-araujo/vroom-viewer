import React, { Component } from 'react';

import { Mapbox, Navbar } from '@containers';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <Mapbox />
      </div>
  );
  }
}

export default App;
