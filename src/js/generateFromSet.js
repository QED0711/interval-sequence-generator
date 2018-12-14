
// Helper Functions ==========================================================

function unique(arr){
    return arr.length === new Set(arr).size;
}

function pitchChain(arr, set){
    let intervalArr = arr.map(x => {
        return set[x]
    })
    let chord = [0];
    for(let i = 0; i < intervalArr.length; i++){
        let pitch = intervalArr[i] + chord[chord.length-1]
        pitch = pitch < 12 ? pitch : pitch - 12;
        chord.push(pitch)
    }
    return unique(chord) ? chord : false;
}

function chordInfo(intervalArr, set){
    return {
        structure: intervalArr,
        size: intervalArr.length + 1,
        pcs: pitchChain(intervalArr, set)
    }
}


// Main Function: generateFromSet ==========================================================

function generateFromSet(set){
    let structure = [];
    for(let i = 0; i < set.length; i++){
        structure.push(chordInfo([i], set));
    }
    
    // create array to hold all the generated chords
    let collection = [];
    
    // recursive function to check valid chord structures
    function intervalStacker(set, chord){ 
        // console.log(chord)
        if(!chord.pcs || chord.size > 12){
            return false;
        }
        collection.push(chord)
        for(let i = 0; i < set.length; i++){
            let newChord = chordInfo(Object.assign({}, chord, {structure: [...chord.structure, i]}).structure, set )
            if(newChord.pcs){
                intervalStacker(set, newChord)
            }
        }
    }
    
    structure.forEach(chord => {
        intervalStacker(set, chord);
    })
    return collection.sort((a,b,) => {
        return a.size-b.size
    })
}

export default generateFromSet;