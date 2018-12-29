
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
    constructor(options = {}){
        this.minSize = options.minSize || 2;
        this.maxSize = options.maxSize || 12;
        this.includes = options.includes || null;
        this.excludes = options.excludes || null;
        this.bassPitch = options.bassPitch || null;
        this.sopranoPitch = options.sopranoPitch || null;
        this.sequence = options.sequence || null; 
        this.symetrical = options.symetrical || false;
        this.vectorMatch =  new VectorFilter();
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
            this[key] = options[key]
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
        let transpositions = [];
        let match;
        for(let i = 0; i < 12; i++){
            match = true;
            let transposedIncludes = this.includes.map(pc => {
                let transposed = pc + i;
                return transposed % 12;
            });
            for(let j = 0; j < transposedIncludes.length; j++){
                if(!chord.pcs[transposedIncludes[j]]) {
                    match = false;
                    break;
                }
            }
            if(match){
              // 12 - i gives the inverse which is the actual transposition we are looking for. 
              transpositions.unshift(12 - i);  
            } 
        }
        return {match: !!transpositions.length, validTranspositions: transpositions};
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


let f = new Filter({includes: [6]});
// expect: 6, 2, 11
// console.log(f)
let c = new Chord([3,4], [1,0]);

console.time("Includes Filter")
console.log(f.matchIncludes(c))
console.timeEnd("Includes Filter")



export default Filter;