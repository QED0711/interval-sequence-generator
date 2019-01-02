import React from 'react';

const ChordSelector = (props) => {
    let {currentChordIndex} = props.state.generate;
    let {changeCurrentChord} = props.AppMethods;
    let resultCount = props.state.generate.currentCollection.length 

    const handleIndexChange = (e) => {
        let index = parseInt(e.target.value) - 1; // for 0 indexing offset
        if(index < resultCount && index >= 0){
            changeCurrentChord(index)
        } else {
            alert("Please choose an index between 1 and the number of results generated")
            e.target.value = 1
            changeCurrentChord(0)
        }
    }

    const handleDecriment = (e) =>{
        let indexInput = document.getElementById("current-chord-index");
        let value = parseInt(indexInput.value);
        if(value > 1){
            value -= 1
        }
        indexInput.value = value;
        changeCurrentChord(value - 1)
    }
    
    const handleIncriment = (e) =>{
        let indexInput = document.getElementById("current-chord-index");
        let value = parseInt(indexInput.value);
        if(value < resultCount){
            value += 1
        }
        indexInput.value = value;
        changeCurrentChord(value - 1)
    }



    return(
        <div id="chord-selector">
            <h3>Returned Sets: {resultCount}</h3>
            <button className="chord-selector-btn decrement" onClick={handleDecriment}>-</button>
            <input type="number" id="current-chord-index" value={currentChordIndex + 1} onChange={handleIndexChange} min="1" max={props.state.generate.currentCollection.length}/>
            <button className="chord-selector-btn increment" onClick={handleIncriment}>+</button>

        </div>
    )

}

export default ChordSelector;