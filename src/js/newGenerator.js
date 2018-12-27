

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

class Chord {
    constructor(set, sequence){
        this.sequence = sequence;
        this.designation = `(${set})-0-<${sequence}>`;
        this.pcs = Chord.pcsFromSequence(set, sequence)        
    }

    static chordFromDesignation(designation){
        let info = designation.split("-");
        let set = info[0].match(/\d+/g).map(x => parseInt(x));
        let startingPitch = parseInt(info[1]);
        let sequence = info[2].match(/\d+/g).map(x => parseInt(x));
        let chord = [startingPitch];
        for(let i = 0; i < sequence.length; i++){
            let nextPC = chord[chord.length - 1] + set[sequence[i]];
            if(nextPC >= 12) {nextPC = nextPC - 12}
            chord.push(nextPC) 
        }
        console.log(chord)
    }

    static pcsFromSequence(set, sequence){
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

}

Chord.chordFromDesignation("(10,11)-0-<1,0,0,1,0,0>");

function chordInfo(set, sequence){
    return {
        sequence: sequence,
        designation: `(${set})-0-<${sequence}>`,
        pcs: pcsFromSequence(set, sequence)
    }
}

function updateChordInfo(set, chord){
    chord.designation = `(${set})-0-<${chord.sequence}>`,
    chord.pcs = pcsFromSequence(set, chord.sequence);
}

function newGenerateFromSet(set){
    set = set.sort((a,b) => a - b)
    let validChords = [];

    function createSequence(set, currentChord){  
        // Base cases occur before recersive call
        // we can guarantee that any chord that enters here is valid.   
        // This is where the filtering should occur

        if(currentChord.sequence.length > 0){ // this conditaional allows for the first empty chord to pass without being pushed to the valid chords
            validChords.push(currentChord);
        }
        // Iterate through the interval options and generate new sequences
        for(let i = 0; i < set.length; i++){
            // copy the currentChord to a new chord for operations
            let newChord = {
                sequence: [...currentChord.sequence],
                designation: currentChord.designation,
                pcs: {...currentChord.pcs}
            };
            // Add new interval to end of chord
            newChord.sequence.push(i);
            updateChordInfo(set, newChord);
            // Base cases: Put here so createSequence only called on valid chords
            if(!newChord.pcs) continue;
            if(newChord.pcs.size > 12) continue;
            // Recursive call to createSequence
            createSequence(set, newChord);
        }
    }
    // Call initial createSequence with an empty sequence 
    createSequence(set, chordInfo(set, []));
    // return validChords after createSequence has completed
    return validChords;
}

// console.time("Timer")
// console.log(newGenerateFromSet([3,4,5,6,7,8]).length)
// console.timeEnd("Timer")