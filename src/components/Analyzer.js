import React, {Component} from 'react';

import analyze from '../js/analyzeVector'
import Vector from '../js/vector';
import { textToNumArray } from '../js/helperFunctions'

class Analyzer extends Component {
    constructor(props){
        super(props);
        this.parentContainer = this.props.parentContainer;
        this.analysis = this.parentContainer.state.analyze.validSets
        console.log(this.analysis)
    }

    getAnalyzeResults = () => {
        const text = document.getElementById("analysis-pc-set").value;
        const pcSet = textToNumArray(text, "Placeholder Warning Message")
        let vector = Vector.fromPCSet(pcSet);
        let results = analyze(vector);
        console.log(results)
        this.parentContainer.setAnalyzeResults(pcSet, vector, results)
    }

    render = () => {
        const analyzeState = this.parentContainer.state.analyze
        return(
            <div>
                <input type="text" id="analysis-pc-set"/>
                <button onClick={this.getAnalyzeResults}>Run Analysis</button>

                <h1>Results: {analyzeState.currentPCSet ?  analyzeState.validSets.length : "None"}</h1>
            </div>
        )
    }
}

export default Analyzer;