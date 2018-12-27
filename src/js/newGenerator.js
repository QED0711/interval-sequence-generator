
function pcsFromSequence(set, sequence){
    let chord = {0: true, size: 1}
    let prevPC = 0
    for(let i = 0; i < sequence.length; i++){
        let nextPC = prevPC + set[sequence[i]];
        if(nextPC >= 12) nextPC = nextPC - 12;
        if(!chord[nextPC]){
            chord[nextPC] = true;
            chord.size += 1;
        } else {
            return false;
        }
        prevPC = nextPC
    }
    return chord;
}


// console.log(pcsFromSequence([3,4], [0, 1, 1, 0]))

function chordInfo(set, sequence){
    return {
        sequence: sequence,
        designation: `(${set})-0-<${sequence}>`,
        pcs: pcsFromSequence(set, sequence)
    }
}


// console.log(chordInfo([3,4], [0,1]))

function updateChordInfo(set, chord){
    chord.designation = `(${set})-0-<${chord.sequence}>`,
    chord.pcs = pcsFromSequence(set, chord.sequence);
}

function newGenerateFromSet(set){
    let validChords = [];

    function createSequence(set, currentChord){
        // console.log(currentChord)
        if(!currentChord.pcs) return
        if(currentChord.pcs.size > 12) return

        if(currentChord.sequence.length > 0){
            validChords.push(currentChord);
        }
        for(let i = 0; i < set.length; i++){
            let newChord = {designation: currentChord.designation};
            newChord.sequence = [...currentChord.sequence];
            newChord.pcs = {...currentChord.sequence};

            newChord.sequence.push(i);
            updateChordInfo(set, newChord);
            createSequence(set, newChord);
        }
    }

    createSequence(set, chordInfo(set, []));
    return validChords;
}

console.time("Timer")
console.log(newGenerateFromSet([3,7,10,8]).length)
console.timeEnd("Timer")