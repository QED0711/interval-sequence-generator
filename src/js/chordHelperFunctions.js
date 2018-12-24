
export function unique(arr){
    return arr.length === new Set(arr).size;
}

export function pitchChain(arr, set){
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


export function applySet(intervalArr, setArr){
    return intervalArr.map(i => {
        return setArr[i];
    })
}

export function expandPCS(pcs){
    let expanded = [pcs[0], pcs[1]];
    for(let i = 2; i < pcs.length; i++){
        expanded[i] = pcs[i]
        while(expanded[i] < expanded[i - 1]){
            expanded[i] += 12;
        }
    }
    return expanded;
}

export function transposeCompressed(chordArr, interval){
    return chordArr.map(pc => {
        if(pc + interval > 11){
            return(pc + interval - 12);
        } else {
            return pc + interval
        }
    })
}