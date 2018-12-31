import React, {Component} from 'react';

import generateFromSet from '../js/generateFromSet'
import { textToNumArray } from '../js/helperFunctions'
import renderNotes from '../js/renderNotes';

import newGenerateFromSet from '../js/newGenerateFromSet'
import Filter from '../js/Filter'
import Chord from '../js/newChord'


import FilterForm from './FilterForm'
import DisplayForm from './DisplayForm';
import Notation from './Notation'

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
        const filter = new Filter(this.parentContainer.state.filterOptions);
        if(intervalSet.length > 0){
            let collection = newGenerateFromSet(intervalSet, filter);
            this.parentContainer.setGenerateResults(0, collection);
        }
    }

    render = () => {
        // let f = new Filter(this.parentContainer.state.filterOptions)
        // console.log(f)
        // console.time("generate time")
        // console.log(newGenerateFromSet([1,2,3,4,5,6], f))
        // console.timeEnd("generate time")

        // console.log("RENDER OPTIONS: ", this.parentContainer.state.renderOptions)
        // let currentChord;
        // if(this.props.state.generate.currentChord){
        //     currentChord = Chord.fromChordObject(this.props.state.generate.currentChord);
        // }
        const generateState = this.parentContainer.state.generate
        return(
            <div>
                <input type="text" id="interval-set"/>

                <button onClick={this.getChords}>Generate Sequences</button>

                <FilterForm AppMethods={this.props.AppMethods}/>
                <DisplayForm AppMethods={this.props.AppMethods} state={this.props.state} />
                <Notation state={this.props.state}/>
                {/* <h1>Results: {generateState.currentChord ? generateState.currentCollection.length: "None"}</h1> */}


                {/* <button onClick={function(){renderNotes([60, 62,64,66])}}>Render Them Notes</button> */}

            </div>
        )
    }

}

export default Generator;