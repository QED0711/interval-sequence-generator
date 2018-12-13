import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation'
import Main from './components/Main'

class App extends Component {

  constructor(){
    super();
    this.state = {
      navigation: "generate"
    }
  }

  render() {
    return (
      <div className="App">
        <Navigation />

        <Main navigation={this.state.navigation}/>

      </div>
    );
  }
}

export default App;
