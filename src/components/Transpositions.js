import React from 'react';

const TRANSPOSITION_KEY = {
    0: "C",
    1: "C#/Db",
    2: "D",
    3: "D#/Eb",
    4: "E",
    5: "F",
    6: "F#/Gb",
    7: "G",
    8: "G#/Ab",
    9: "A",
    10: "A#/Bb",
    11: "B",

}

const Transpositions = (props) => {

    let {changeCurrentTransposition} = props.AppMethods

    let currentTransposition = props.currentTransposition;

    function handleChange(e){
        let transpositions = document.getElementsByClassName("transposition-radio");
        let newTransposition
        for(let i = 0; i < transpositions.length; i++){
            if(transpositions[i].checked){
                newTransposition = parseInt(transpositions[i].id.split("-")[1])
                break;
            } 
        }
        changeCurrentTransposition(newTransposition)
    }

    function availableTranspositions(){
        let currentChord = props.currentChord;
        if(currentChord){
            return(
                <div id="availableTranspositions">
                {
                    currentChord.transpositions.map((trans, i) => {
                        return(
                            <div className="trans" key={i}>
                                <input type="radio" className="transposition-radio" name="transposition-radio" id={`transposition-${trans}`} checked={trans == currentTransposition ? "checked" : ""} onChange={handleChange}/>
                                <label>{TRANSPOSITION_KEY[trans]}</label>
                            </div>
                        )
                    })
                }
                </div>
            )
        }
    }


    return(

        <div id="transpositions">
            <h3>Available Transpositions</h3>
            {availableTranspositions()}
        </div>

    )

}

export default Transpositions;