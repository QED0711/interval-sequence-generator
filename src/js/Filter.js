
import VectorFilter from './VectorFilter';
// import Vector from './vector';
// import Chord from './newChord'


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

        this.bassPitch = typeof options.bassPitch === 'number' ? options.bassPitch : null
        this.sopranoPitch = typeof options.sopranoPitch === 'number' ? options.sopranoPitch : null

        this.sequence = options.sequence || null; 
        this.symetrical = options.symetrical || false;
        this.vectorMatch =  options.vectorMatch || new VectorFilter();
    }

    // Run all Filters against a chord

    runFilters(chord){
        if(!this.matchSize(chord)) return {passed: false} // this filter always runs
        let validTranspositions = this.matchPitchContent(chord) 
        if(validTranspositions.length === 0) return {passed: false}
        if(!!this.symetrical && !this.matchSymetrical(chord)) return {passed: false}
        if(!!this.sequence && !this.matchUserSequence(chord)) return {passed: false}
        // Vector filter always runs, 
        // but only if the other matches pass 
        // because it is slightly more costly to run 
        if(!this.matchVector(chord)) return {passed: false} 
        // if all other filters have passed return true
        return {passed: true, validTranspositions: validTranspositions}
    }

    // Change Filter Properties +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    setFilters(options){
        for(let key in options){
            this[key] = options[key]
        }
    }

    resetFilters(){
        this.minSize = 2;
        this.maxSize = 12;
        this.includes = null;
        this.excludes = null;
        this.bassPitch = null;
        this.sopranoPitch = null;
        this.sequence = null;
        this.symetrical = null;
        this.vectorMatch = new VectorFilter();
    }

    setVector(options){
        for(let interval in options){
            this.vectorMatch.setVector(interval, options[interval].type, options[interval].value);
        }
    }

    // Individual filter methods +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    matchSize(chord){
        return (chord.pcs.size >= this.minSize && chord.pcs.size <= this.maxSize)
    }

    matchIncludes(chord){
        let transpositions = {length: 0};
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
              transpositions[12 - i] = 12 - i;
              transpositions.length ++;
            } 
        }
        return {match: !!transpositions.length, validTranspositions: transpositions};
    }

    matchExcludes(chord){
        let transpositions = {length: 0};
        let match;
        for(let i = 0; i < 12; i++){
            match = true;
            let transposedExcludes = this.excludes.map(pc => {
                let transposed = pc + i;
                return transposed % 12;
            });

            for(let j = 0; j < transposedExcludes.length; j++){
                if(chord.pcs[transposedExcludes[j]]) {
                    match = false;
                    break;
                }
            }
            if(match){
              // 12 - i gives the inverse which is the actual transposition we are looking for. 
              transpositions[12 - i] = 12 - i;
              transpositions.length ++;
            } 
        }
        return {match: !!transpositions.length, validTranspositions: transpositions};
    }

    matchBassPitch(chord){
        const bp =  this.bassPitch
        let transposition = {
            match: true,
            // There will always be exactly one transposition with this bass note
            validTranspositions: {length: 1}
        }
        transposition.validTranspositions[bp] = bp;
        return transposition;
    }
    
    matchSopranoPitch(chord){
        let sp = chord.getOrderedPCS();
        sp = sp[sp.length - 1]
        sp = this.sopranoPitch >= sp ? this.sopranoPitch - sp : 12 - (sp - this.sopranoPitch);
        
        let transposition = {
            match: true,
            // There will always be exactly one transposition with this soprano note
            validTranspositions: {length: 1}
        }

        transposition.validTranspositions[sp] = sp;
        return transposition
    }

    // matchPitchContent runs all pitch related filters
    // (includes, excludes, bassPitch, sopranoPitch)
    // Filters only run if defined
    // Returns only the transpositions that meet all criteria
    matchPitchContent(chord){
        let pcContent = [];
        if(typeof this.bassPitch === 'number'){
            pcContent.push(this.matchBassPitch(chord));
        }
        if(typeof this.sopranoPitch === 'number'){
            pcContent.push(this.matchSopranoPitch(chord))
        }
        if(!!this.includes){
            pcContent.push(this.matchIncludes(chord))
        }
        if(!!this.excludes){
            pcContent.push(this.matchExcludes(chord))
        }
        let validTranspositions = []
        if(pcContent.length === 0) return [0];
        let match;
        for(let i = 0; i < 12; i++){
            match = true;
            for(let j = 0; j < pcContent.length; j++){
                if(typeof pcContent[j].validTranspositions[i] !== 'number'){
                    match = false
                    break;
                }
            }
            if(match) validTranspositions.push(i); 
        }
        return validTranspositions;
    }

    matchVector(chord){
        return this.vectorMatch.runVectorFilter(chord.getVector())
    }

    matchUserSequence(chord){
        if(this.sequence.length > chord.sequence.length) return false;
        let chordSequence = chord.sequence.join("");
        let userSequence = this.sequence.join("");
        for(let i = 0; i <= chordSequence.length - userSequence.length; i++){
            if(userSequence === chordSequence.substring(i, i + userSequence.length)) return true;
        }
        return false
    }

    matchSymetrical(chord){
        return isSymetrical(chord.sequence);
    }

}


// let f = new Filter({
//     // excludes: [7],
//     // includes: [6, 2],
//     // bassPitch: 0,
//     // sopranoPitch: 0
// });

// let c = new Chord([3,4], [1,0, 1]);

// console.time("Pitch Content Filters")
// console.log(f.matchPitchContent(c))
// console.timeEnd("Pitch Content Filters")



export default Filter;