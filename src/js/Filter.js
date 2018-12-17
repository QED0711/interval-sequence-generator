
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

import VectorFilter from './VectorFilter';

class Filter{
    constructor(){
        this.minSize = 2;
        this.maxSize = 12;
        this.includes = null;
        this.excludes = null;
        this.bassMatch = null;
        this.sopranoMatch = null; // 
        this.vectorMatch = new VectorFilter();
        this.sequenceMatch = null; // array
        this.symetrical = null; // array
    }

    runFilters(chord){
        
    }

    setFilters(options){
        for(let key in options){
            this[key] = options[key]
        }
    }

}

// f = new Filter({
//     minSize: 5,
//     maxSize: 10
// })

// console.log(f)

export default Filter;