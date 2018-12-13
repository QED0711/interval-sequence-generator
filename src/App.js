import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Generator from './components/Generator'
import Analyzer from './components/Analyzer'
import Info from './components/Info'

import Navigation from './components/Navigation'


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
        
        <Router>
          <div>
            <nav className="navigation">
              <Navigation />

              <Route path="/generate" exact component={Generator} />
              <Route path="/analyze" exact component={Analyzer} />
              <Route path="/info" exact component={Info} />
            </nav>                      
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
