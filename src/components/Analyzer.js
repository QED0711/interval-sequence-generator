import React, {Component} from 'react';

import analyze from '../js/analyzeVector'
import Vector from '../js/vector.mjs';
import { textToNumArray } from '../js/helperFunctions'

class Analyzer extends Component {
    constructor(props){
        super(props);
        this.parentContainer = this.props.parentContainer;
        this.analysis = this.parentContainer.state.analyze.validSets
        console.log(this.analysis)
    }

    getAnalyzeResults = () => {
        
        // get the user defined pc set and interval set limit
        const text = document.getElementById("analysis-pc-set").value;
        const pcSet = textToNumArray(text, 12, "This tool only allows for valid pitch-class sets")
        let IntervalSetLimit = parseInt(document.getElementById("interval-set-limit").value)
        
        // get the vector from the the pcSet input
        let vector = Vector.fromPCSet(pcSet);
        
        // run the analysis
        let results = analyze(vector, IntervalSetLimit);
        
        // set the state with the results of the analysis
        this.parentContainer.setAnalyzeResults(pcSet, vector, results)
    }

    render = () => {
        const analyzeState = this.parentContainer.state.analyze
        return(
            <div>
                <input type="text" id="analysis-pc-set"/>
                <br/>
                <input type="number" id="interval-set-limit" defaultValue="6" max="6" min="1"/><br/>
                <button onClick={this.getAnalyzeResults}>Run Analysis</button>

                <h1>Results: {analyzeState.currentPCSet ?  analyzeState.validSets.length : "None"}</h1>
            </div>
        )
    }
}

export default Analyzer;