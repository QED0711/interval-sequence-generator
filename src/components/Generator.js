import React, {Component} from 'react';

import generateFromSet from '../js/generateFromSet'
import { textToNumArray } from '../js/helperFunctions'
import renderNotes from '../js/renderNotes';

import newGenerateFromSet from '../js/newGenerateFromSet'
import Filter from '../js/Filter'


import FilterForm from './FilterForm'

class Generator extends Component {

    constructor(props){
        super(props);

        this.parentContainer = this.props.parentContainer;
        // if(this.parentContainer.state.generate.currentChord){
        //     console.log(this.parentContainer.state.generate.currentChord)
        // }
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
        // let f = new Filter({
        //     // includes: [1,8],
        //     // maxSize: 4,
        //     // sequence: [1,0]
        // })
        // console.time("generate time")
        // console.log(newGenerateFromSet([3,4], f))
        // console.timeEnd("generate time")

        console.log("FILTER OPTIONS: ", this.parentContainer.state.filterOptions)
        const generateState = this.parentContainer.state.generate
        return(
            <div>
                <input type="text" id="interval-set"/>

                <button onClick={this.getChords}>Generate Sequences</button>

                <FilterForm setFilterOptions={this.props.parentContainer.setFilterOptions} />

                <h1>Results: {generateState.currentChord ? generateState.currentCollection.length: "None"}</h1>
                <div id="notation-container"></div>
                <button onClick={function(){renderNotes([60, 62,64,66])}}>Render Them Notes</button>

                {
                    // console.log(generateState)
                }

            </div>
        )
    }

}

export default Generator;