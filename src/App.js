import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from './components/Landing'
import Generator from './components/Generator'
import Analyzer from './components/Analyzer'
import Info from './components/Info'

import Navigation from './components/Navigation'


class App extends Component {

  constructor(){
    super();
    this.state = {
      navigation: "generate",
      currentChord: null,
      currentCollection: null
    }

    this.setCurrentChord = this.setCurrentChord.bind(this);
  }

  setCurrentChord(chord){
    this.setState({
      currentChord: chord,
    })
  }

  render() {
    return (
      <div className="App">
        
        <Router>
          <div>
            <nav className="navigation">
              <Navigation />
            </nav>                      
              <Route path="/" exact component={Landing}/>
              <Route path="/generate" exact 
                render={props => <Generator {...props} currentChord={this.state.currentChord} setCurrentChord={this.setCurrentChord}/>} 
              />
              <Route path="/analyze" exact component={Analyzer} />
              <Route path="/info" exact component={Info} />
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
