
// Filters:
//      min length
//      max length
//      contains pitches
//      excludes pitches
//      Has pitch as basss
//      Vector Filters
//      Has Interval Sequence
//      Has symetrical Interval Sequence


// expect(f.minSize).to.exist
//       expect(f.maxSize).to.exist
//       expect(f.contains).to.exist
//       expect(f.excludes).to.exist
//       expect(f.bassMatch).to.exist
//       expect(f.sopranoMatch).to.exist
//       expect(f.vectorMatch).to.exist
//       expect(f.sequenceMatch).to.exist
//       expect(f.symetrical).to.exist

import Vector from './vector';
import VectorFilter from './VectorFilter.mjs';
import Chord from './newChord.mjs'


function isSymetrical(arr){
    if(arr.length <= 1){
        return true;
    } 
    if(arr[0] !== arr[arr.length - 1]) return false;
    return isSymetrical(arr.slice(1, arr.length - 1))
}

class Filter{
    constructor(){
        this.minSize = 2;
        this.maxSize = 12;
        this.includes = null;
        this.excludes = null;
        this.bassPitch = null;
        this.sopranoPitch = null;
        this.vectorMatch = new VectorFilter();
        this.sequence = null; 
        this.symetrical = false;
    }

    // Run the Filters against a chord

    runFilters(chord){
        if(!this.matchSize(chord)) return false // this filter always runs
        
        if(!!this.bassPitch && !this.matchBassPitch(chord)) return false
        if(!!this.sopranoPitch && !this.matchSopranoPitch(chord)) return false
        if(!!this.symetrical && !this.matchSymetrical(chord)) return false
        if(!!this.includes && !this.matchIncludes(chord)) return false
        if(!!this.excludes && !this.matchExcludes(chord)) return false
        if(!!this.sequence && !this.matchUserSequence(chord)) return false
        // Vector filter always runs, 
        // but only if the other matches pass 
        // because it is slightly more costly to run 
        if(!this.matchVector(chord)) return false 
        // if all other filters have passed return true
        return true
    }

    // Change Filter Properties +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    setFilters(options){
        for(let key in options){
            if(key === "includes"){
                this[key] = options[key]
                this.includesVector = Vector.fromPCSet(options[key]);
            } else {
                this[key] = options[key]
            }
        }
    }

    setVector(options){
        for(let interval in options){
            this.vectorMatch.setVector(interval, options[interval].type, options[interval].value);
        }
    }

    // Individual filter methods +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    matchSize(chord){
        return (chord.size >= this.minSize && chord.size <= this.maxSize)
    }

    matchIncludes(chord){
        let chordVector = chord.getVector();
        for(let i = 0; i <= 6; i++){
            if(this.includesVector[i] > chordVector[i]) return false;
        }
        return true;
    }

    matchExcludes(chord){
        for(let pitch of this.excludes){
            if(chord.pcs.includes(pitch)){
                return false
            }
        }
        return true;
    }

    matchBassPitch(chord){
        return chord.pcs[0] === this.bassPitch;
    }

    matchSopranoPitch(chord){
        return chord.pcs[chord.pcs.length - 1] === this.sopranoPitch;
    }

    matchVector(chord){
        return this.vectorMatch.runVectorFilter(chord.vector)
    }

    matchUserSequence(chord){
        if(this.sequence.length > chord.codedSequence.length) return false;
        let chordSequence = chord.codedSequence.join("");
        let userSequence = this.sequence.join("");
        for(let i = 0; i <= chordSequence.length - userSequence.length; i++){
            if(userSequence === chordSequence.substring(i, i + userSequence.length)) return true;
        }
        return false
    }

    matchSymetrical(chord){
        return isSymetrical(chord.codedSequence);
    }

}


let c = new Chord([3,4], [1,0]);
// console.log(c.getVector());
// console.log(c);


let f = new Filter();
f.setFilters({
    includes: [6, 9]
})

console.log(f.matchIncludes(c))


export default Filter;