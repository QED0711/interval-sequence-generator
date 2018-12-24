
/* 

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

*/

import Vector from './vector'

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

function transposeCompressed(chordArr, interval){
    return chordArr.map(pc => {
        if(pc + interval > 11){
            return(pc + interval - 12);
        } else {
            return pc + interval
        }
    })
}


class Chord {
    constructor(intervalArr, set){
        let pcs = pitchChain(intervalArr, set);
        
        this.set = set,
        this.codedSequence = intervalArr,
        this.intervalSequence = applySet(intervalArr, set),
        this.size = intervalArr.length + 1,
        this.pcs = pcs,
        this.transpositions = this.findTranspositions();
        this.expandedPCS = expandPCS(pcs),
        this.vector = Vector.fromPCSet(pcs)        
    }

    // static fromExpandedChord(chordArr){
    //     let chordArr = chordArr.map(x => x % 12);
    // }

    findTranspositions(){
        let transpositions = [];    
    
        for(let i = 1; i <= 11; i++){
            transpositions.push(
                {pcs: transposeCompressed(this.pcs, i)}
            )
        }
        
        return transpositions;         
    }
}

export default Chord;