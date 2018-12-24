
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


class Chord {
    constructor(intervalArr, set){
        let pcs = pitchChain(intervalArr, set);
        
        this.set = set,
        this.codedSequence = intervalArr,
        this.intervalSequence = applySet(intervalArr, set),
        this.size = intervalArr.length + 1,
        this.pcs = pcs,
        this.expandedPCS = expandPCS(pcs),
        this.vector = Vector.fromPCSet(pcs)        
    }

    static fromExpandedChord(chordArr){
        let chordArr = chordArr.map(x => x % 12);
        
    }
}

export default Chord;