import React, {Component} from 'react';

import generateFromSet from '../js/generateFromSet'
import { textToNumArray } from '../js/helperFunctions'
import renderNotes from '../js/renderNotes';

class Generator extends Component {

    constructor(props){
        super(props);

        this.parentContainer = this.props.parentContainer;
        if(this.parentContainer.state.generate.currentChord){
            console.log(this.parentContainer.state.generate.currentChord)
        }
    }

    componentDidMount(){
        renderNotes([]);
    }

    getChords = () => {
        const text = document.getElementById("interval-set").value
        const intervalSet = textToNumArray(text, 6, "This tool only handles between 1 and 6 pitch-class intervals in the set. Please change your selection.")
        if(intervalSet.length > 0){
            let collection = generateFromSet(intervalSet);
            this.parentContainer.setGenerateResults(0, collection);
        }
    }

    render = () => {
        const generateState = this.parentContainer.state.generate
        return(
            <div>
                <input type="text" id="interval-set"/>

                
                <button onClick={this.getChords}>Generate Sequences</button>
                <h1>Results: {generateState.currentChord ? generateState.currentCollection.length * 12 : "None"}</h1>
                <div id="notation-container"></div>
                <button onClick={function(){renderNotes([60, 62,64,66])}}>Render Them Notes</button>

            </div>
        )
    }

}

export default Generator;