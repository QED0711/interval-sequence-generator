import React, {Component} from 'react';

import analyze from '../js/analyzeVector'
import Vector from '../js/vector';

class Analyzer extends Component {
    constructor(){
        super();

        this.analysis = analyze(new Vector([1,1,1,1,1,1, 6]))
        console.log(this.analysis)
    }

    

    render = () => {
        return(
            <div>
                <input type="text" />
                <button>Run Analysis</button>

                <h1>Results: {this.analysis.length}</h1>
            </div>
        )
    }
}

export default Analyzer;