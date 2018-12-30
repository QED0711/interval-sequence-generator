import Vector from "./vector"
import Chord from './newChord'

function newGenerateFromSet(set, filter){
    set = set.sort((a,b) => a - b)
    let validChords = [];

    function findValidChords(currentChord){  
        // this conditaional allows for the first empty chord to pass 
        // without being pushed to the valid chords
        if(currentChord.sequence.length > 0){ 
            // This is where the filtering should occur
            let validChord = filter.runFilters(currentChord)
            if(validChord.passed){
                validChords.push({...currentChord, transpositions: validChord.validTranspositions});
            }
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
            if(newChord.length > filter.maxSize) break;
            if(!newChord.pcs) continue;
            // Recursive call to findValidChords
            findValidChords(newChord);
        }
    }
    // Call initial findValidChords with an empty sequence 
    findValidChords(new Chord(set, []));
    // return validChords after findValidChords has completed
    return validChords.sort((a,b) => {
        return a.pcs.size - b.pcs.size
    });
}

// console.time("Calculation Time:")
// console.log(newGenerateFromSet([1,2])[2].getVector().print())
// console.timeEnd("Calculation Time:")

export default newGenerateFromSet;