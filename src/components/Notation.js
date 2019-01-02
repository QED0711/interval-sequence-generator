import React from 'react';

import renderNotes from '../js/renderNotes';
import Chord from '../js/newChord'

import Transpositions from './Transpositions';
import ChordSelector from './ChordSelector';

const Notation = (props) => {
    let currentChord, currentTransposition;
    if(props.state.generate.currentChord){
        currentChord = props.state.generate.currentChord;
        currentTransposition = props.state.generate.currentTransposition;
    }
    return(
        <section id="section-notation">
            {
                currentChord &&
                <div id="current-chord-options">
                    <ChordSelector state={props.state} AppMethods={props.AppMethods}/>
                    <Transpositions currentChord={currentChord} currentTransposition={currentTransposition} AppMethods={props.AppMethods}/>
                </div>
            }
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