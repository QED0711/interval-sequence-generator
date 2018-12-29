
import Vector from './vector.mjs'

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

function applySet(intervalArr, setArr){
    return intervalArr.map(i => {
        return setArr[i];
    })
}

function expandPCS(pcs){
    let expanded = [pcs[0], pcs[1]];
    for(let i = 2; i < pcs.length; i++){
        expanded[i] = pcs[i]
        while(expanded[i] < expanded[i - 1]){
            expanded[i] += 12;
        }
    }
    return expanded;
}

function chordInfo(intervalArr, set){
    let pcs = pitchChain(intervalArr, set);
    return {
        set: set,
        codedSequence: intervalArr,
        intervalSequence: applySet(intervalArr, set),
        size: intervalArr.length + 1,
        pcs: pcs,
        expandedPCS: expandPCS(pcs),
        vector: Vector.fromPCSet(pcs)
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
            let newChord = chordInfo(Object.assign({}, chord, {codedSequence: [...chord.codedSequence, i]}).codedSequence, set )
            if(newChord.pcs){
                intervalStacker(set, newChord)
            }
        }
    }
    
    structure.forEach(chord => {
        intervalStacker(set, chord);
    })
    collection = collection.sort((a,b,) => {
        return a.size-b.size
    })
    
    
    let transpositions = []
    for(let i = 0; i < collection.length; i++){
        transpositions.push(collection[i])
        for(let j = 1; j < 12; j++){
            let transposedChord = {...collection[i]}
            transposedChord.pcs = transposedChord.pcs.map(pitch => {
                return pitch + j > 11 ? (pitch + j - 12) : (pitch + j);
            });
            transposedChord.expandedPCS = transposedChord.expandedPCS.map(pitch => {
                return pitch + j;
            });
            transpositions.push(transposedChord);
        }
    }
    return transpositions
}

export default generateFromSet;