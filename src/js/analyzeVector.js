
import Vector from './vector.js';

function unique(pcs){
    return new Set(pcs).size === pcs.length;
}

function newIntervals(pcs){
    let intervals = [];
    if(pcs.length > 2){ // only when pcs is more than 2 because pcs of 2 is assumed with the first vector subtraction
        for(let i = 0; i < pcs.length - 2; i++){
            let interval = Math.abs(pcs[pcs.length-1] - pcs[i])
            interval <= 6 ? intervals.push(interval) : intervals.push(12 - interval)
        }
    }
    return intervals;
}

function intervalSet(pcs){
    let sequence = [];
    for(let i = 1; i < pcs.length; i++){
        sequence.push(Math.abs(pcs[i] - pcs[i - 1]))
    }
    return {
        pciSet: new Set(sequence),
        lpcis: sequence
    }
}

function analyze(vector, setLimit = 12){
    // console.log(vector, setLimit)
    let passedSets = [];
    let pcs = [0];

    function vectorTree(vector, pcs){
        // console.log(vector.isNull())
        let intSet = intervalSet(pcs);

        if(intSet.pciSet.size > setLimit) return false; 

        if(vector.isNull()){
            passedSets.push(
                {...intSet, pcs: pcs}
            );
            return;
        }

        // vector.print()

        if(!vector.valid) return false; // if vector is invalid, terminate branch (base case)
        
        for(let i = 1; i <= 11; i++){ // for each pci 1-11
            let newVector = new Vector(vector.toArray()) // copy the vector object so we can make changes without effecting the original;
            let newPcs = [...pcs] // copy the pcs array so we can make changes without effecting the original;
            if(i <= 6){
                if(newVector[i]){  // if newVector has ics of that class left, then...;
                    newVector[i]-- // subtract 1 from the ic in the vector
                    newPcs[newPcs.length] = (newPcs[newPcs.length - 1] + i) % 12 // add that pci to the last pc of the pcs to get a new last pc
                    if(!unique(newPcs)) continue // if that causes pc repetition, continue to next iteration of the loop without calling vectorTree
                    let newInts = newIntervals(newPcs) // if we've made it this far, calculate all new ics that exist as a result of adding a new pc to the end of the pcs;
                    for(let int of newInts){ // with that list of new ics, subtract 1 from the vector for each ic
                        if(newVector[int]){ // if the vector still has an ic at that value, subtract 1 from it
                            newVector[int]--;
                        } else {
                            newVector.valid = false // if no ic at that value, set vector validation to false
                        }
                    }
                    if(!newVector.valid) continue // if vector validation is false, continue to next iteration of the loop without calling vectorTree
                } else {
                    continue
                }
            } else {
                if(newVector[12 - i]){
                    newVector[12 - i]--;
                    newPcs[newPcs.length] = (newPcs[newPcs.length - 1] + i) % 12
                    if(!unique(newPcs)) continue
                    let newInts = newIntervals(newPcs)
                    for(let int of newInts){
                        if(newVector[int]){
                            newVector[int]--;
                        } else {
                            newVector.valid = false
                        }
                    }
                    if(!newVector.valid) continue
                } else {
                    continue;
                }
            }
            
            
            // console.log(newPcs)
            vectorTree(newVector, newPcs)
        }
    }

    vectorTree(vector, pcs);
    return passedSets;

}

// let vector = new Vector([5,6,6,4,5,2])

// console.time("Vector Calculator")
// console.log(analyze(vector, 6))
// console.timeEnd("Vector Calculator")

// console.log(intervalSet([0, 4, 7]))
// console.log(unique([1,2,1]))
// console.log(newInts([0, 4, 7]))



export default analyze