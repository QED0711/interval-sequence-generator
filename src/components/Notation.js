import React from 'react';

import renderNotes from '../js/renderNotes';
import Chord from '../js/newChord'

const Notation = (props) => {

    let currentChord;
    if(props.state.generate.currentChord){
        currentChord = Chord.fromChordObject(props.state.generate.currentChord);
    }

    return(
        <section id="section-notation">
            <div id="notation-container"></div>
            <h1>This is where the notation will go</h1>

            {
                    currentChord && renderNotes(currentChord.getExpandedPCS().map(x => {
                        return x + ((props.state.renderOptions.octave + 1) * 12)
                    }))
                }            
        </section>
    )

}

export default Notation;