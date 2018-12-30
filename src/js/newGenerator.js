import Vector from "./vector.mjs"
import Chord from './newChord.mjs'

function newGenerateFromSet(set){
    set = set.sort((a,b) => a - b)
    let validChords = [];

    function findValidChords(currentChord){  
        // this conditaional allows for the first empty chord to pass 
        // without being pushed to the valid chords
        if(currentChord.sequence.length > 0){ 
            // This is where the filtering should occur
            validChords.push(currentChord);
        }
        // Iterate through the interval options and generate new sequences
        for(let i = 0; i < currentChord.set.length; i++){
            // copy the currentChord to a new chord for operations
            let newChord = new Chord(currentChord.set, [...currentChord.sequence]);
            // Add new interval to end of chord
            newChord.addToSequence(i);
            // Base case:
            // Checks is newly generated pcs is valid 
            // Put here so findValidChords only called on valid chords
            if(!newChord.pcs) continue;
            // Recursive call to findValidChords
            findValidChords(newChord);
        }
    }
    // Call initial findValidChords with an empty sequence 
    findValidChords(new Chord(set, []));
    // return validChords after findValidChords has completed
    return validChords;
}

console.time("Calculation Time:")
console.log(newGenerateFromSet([1,2])[2].getVector().print())
console.timeEnd("Calculation Time:")

export default newGenerateFromSet;