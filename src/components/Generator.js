import React, {Component} from 'react';

import generateFromSet from '../js/generateFromSet'
import { textToNumArray } from '../js/helperFunctions'
class Generator extends Component {

    constructor(props){
        super(props);

        this.parentContainer = this.props.parentContainer;
        if(this.parentContainer.state.generate.currentChord){
            console.log(this.parentContainer.state.generate.currentChord)
        }
    }

    getChords = () => {
        const text = document.getElementById("interval-set").value
        const intervalSet = textToNumArray(text, "This tool only handles between 1 and 6 pitch-class intervals in the set. Please change your selection.")
        if(intervalSet.length > 0){
            let collection = generateFromSet(intervalSet);
            this.parentContainer.setGenerateResults(collection[0], collection);
        }
    }

    render = () => {
        const generateState = this.parentContainer.state.generate
        return(
            <div>
                <input type="text" id="interval-set"/>
                
                <button onClick={this.getChords}>Generate Sequences</button>
                <h1>Results: {generateState.currentChord ? generateState.currentCollection.length * 12 : "None"}</h1>
            </div>
        )
    }

}

export default Generator;