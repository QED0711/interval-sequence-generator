import React from 'react';

import renderNotes from '../js/renderNotes';
import Chord from '../js/newChord'

import Transpositions from './Transpositions';

const Notation = (props) => {

    let currentChord, currentTransposition;
    if(props.state.generate.currentChord){
        currentChord = props.state.generate.currentChord;
        currentTransposition = props.state.generate.currentTransposition;
    }
    return(
        <section id="section-notation">
            <Transpositions currentChord={currentChord} currentTransposition={currentTransposition} AppMethods={props.AppMethods}/>
            <div id="notation-container"></div>

            {
                currentChord && renderNotes(currentChord.getExpandedPCS().map(x => {
                    return x + ((props.state.renderOptions.octave + 1) * 12)
                }))
            }            

        </section>
    )

}

export default Notation;