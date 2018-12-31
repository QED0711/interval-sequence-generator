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
    // STATE =====================================================
    this.state = {
      generate: {
        currentChord: null,
        currentChordIndex: null,
        currentCollection: null,
      },
      filterOptions: {
        minSize: 2,
        maxSize: 12
      },
      renderOptions: {
        octave: 4,
        type: "standard",
        playback: "arpeggiated",
        playbackSpeed: "medium"
      },
      analyze: {
        currentPCSet: null,
        currentPCSVector: null,
        validSets: null
      }
    }

    
    
    // METHOD BINDINGS =====================================================
    this.setGenerateResults = this.setGenerateResults.bind(this);
    this.setFilterOptions = this.setFilterOptions.bind(this);
    this.setAnalyzeResults = this.setAnalyzeResults.bind(this);
    this.setRenderOptions = this.setRenderOptions.bind(this);
    // this.setVectorFilterOptions = this.setVectorFilterOptions.bind(this);

    // APP METHOD OBJECT =====================================================
    this.AppMethods = {}
    for(let item in this){
      if(typeof this[item] === 'function' && item !== 'forceUpdate' && item !== 'setState'){
        this.AppMethods[item] = this[item]
      } 
    }
    // console.log(this.AppMethods)


  }

  setGenerateResults(chordIndex, collection){
    this.setState({
      generate: {
        currentChord: collection[chordIndex],
        currentChordIndex: chordIndex,
        currentCollection: collection
      }
    })
  }

  setFilterOptions(options){
    this.setState({
      filterOptions: options
    })
  }
  
  // setVectorFilterOptions(vectorFilter){
  //   this.setState({
  //     filterOptions: {
  //      ...this,
  //      vectorMatch: vectorFilter 
  //     }
  //   })
  // }

  setRenderOptions(options){
    this.setState(
      {
          renderOptions: options
        }
    )
  }

  setAnalyzeResults(pcs, vector, results){
    this.setState({
      analyze: {
        currentPCSet: pcs,
        currentPCSVector: vector,
        validSets: results
      }
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
                render={props => <Generator {...props} parentContainer={this} AppMethods={this.AppMethods} state={this.state}/>} 
              />
              <Route path="/analyze" exact 
                render={props => <Analyzer {...props} parentContainer={this} AppMethods={this.AppMethods}/>}
              />
              <Route path="/info" exact component={Info} />
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
