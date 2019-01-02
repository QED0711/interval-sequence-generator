import React from 'react';

import PITCH_KEYS from '../js/pitchKeys'

const ChordIndo = (props) => {
    let currentChord = props.currentChord;
    
    const pcsToPitchNames = () => {
        return currentChord.getOrderedPCS().map(x => {
            return PITCH_KEYS[x];
        }).join(" - ")
    }
    
    return(
        <section className="section" id="section-chord-info">
            <h3>Chord Information:</h3>
            <div id="statistics">
                
                <div className="chord-info-box">
                    <h4>Designation:</h4>
                    <p>{currentChord.designation}</p>
                </div>
                
                <div className="chord-info-box">
                    <h4>Chord Size:</h4>
                    <p>{currentChord.pcs.size}</p>
                </div>
                
                <div className="chord-info-box">
                    <h4>PCS:</h4>
                    <p>{currentChord.getOrderedPCS().join(" ")}</p>
                    <p>{pcsToPitchNames()}</p>
                </div>

            </div>
        </section>
    )

}

export default ChordIndo;