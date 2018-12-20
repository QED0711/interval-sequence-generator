import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import App from './App';
import Adapter from 'enzyme-adapter-react-16'

import Vector from './js/vector';
import Filter from './js/Filter';
import VectorFilter from './js/VectorFilter';


describe("Vector Class", function(){
  
  const validVector = new Vector([0,0,1,1,1,0]);
  const invalidVector = new Vector([0,0,1,1,1]);
  
  describe("Initialization", function(){
    
    it("initializes with a valid property of true if given a valid vector", function(){
      expect(validVector.valid).to.equal(true);
    })
    
    it("initializes with a valid property of false if given an invalid vector", function(){
      expect(invalidVector.valid).to.equal(false);
    })

    it("initializes with a numeric value for all interval classes", function(){
      for(let i = 1; i <= 6; i++){
        expect(validVector[i]).to.be.a('number');
      }
    })

  })
  
  describe("PC Set Conversion", function(){
    
    it('Converts a PC set to new Vector', function(){
      expect(Vector.fromPCSet([0,4,7]).toArray()).to.deep.equal([0,0,1,1,1,0]);
    });

  })

})


describe("Filter Class", function(){
  let f = new Filter();

  const chord1 = {
    codedSequence: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    expandedPCS: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
    intervalSequence: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    pcs: [0, 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7],
    set: [4, 5],
    size: 12,
    vector: {1: 12, 2: 12, 3: 12, 4: 12, 5: 12, 6: 6, valid: true}
  }

  const chord2 = {
    codedSequence: [0, 1, 1],
    expandedPCS: [0, 3, 7, 11],
    intervalSequence: [3, 4, 4],
    pcs: [0, 3, 7, 11],
    set: [3, 4],
    size: 4,
    vector: {1: 1, 2: 0, 3: 1, 4: 3, 5: 1, 6: 0, valid: true}
  }
  
  const chord3 = { // transposed to D
    codedSequence: [0, 1, 1],
    expandedPCS: [2, 5, 9, 13],
    intervalSequence: [3, 4, 4],
    pcs: [2, 5, 9, 1],
    set: [3, 4],
    size: 4,
    vector: {1: 1, 2: 0, 3: 1, 4: 3, 5: 1, 6: 0, valid: true}
  }

  describe("initialization", function(){
    it("is defined", function(){
      expect(Filter).to.exist
    })
    it("takes in an options object as an argument", function(){

    })
  })

  describe("Properties", function(){

    it("Has correct filter properties", function(){
      expect(f.minSize).to.equal(2)
      expect(f.maxSize).to.equal(12)
      expect(f.includes).to.be.null
      expect(f.excludes).to.be.null
      expect(f.bassPitch).to.be.null
      expect(f.sopranoPitch).to.be.null
      expect(f.vectorMatch).to.be.an.instanceof(VectorFilter)
      expect(f.sequence).to.be.null
      expect(f.symetrical).to.equal(false)
    })

  })

  describe("Methods", function(){

    it("Can apply filters to input chords", function(){
      f = new Filter();
      expect(f.runFilters).to.exist
      f.setFilters({
        includes: [9],
        excludes: [0],
        bassPitch: 2,
        sopranoPitch: null,
        sequence: [1,1],
        symetrical: false
      })

      // expect(f.runFilters(chord1)).to.equal(false);
      // expect(f.runFilters(chord2)).to.equal(false);
      // expect(f.sopranoPitch).to.be.null
      // expect(f.matchSopranoPitch(chord3)).to.equal(false);
      expect(f.matchUserSequence(chord3)).to.equal(true)
      expect(f.runFilters(chord3)).to.equal(true);
      
    })
    
    it("Can change the filter properties", function(){
      expect(f.setFilters).to.exist
      f.setFilters({minSize: 4});
      expect(f.minSize).to.equal(4);
    })

    it("Can change the vector filter criteria", function(){
      expect(f.setVector).to.exist;
      f.setVector({1 : {type: "atLeast", value: 1}});
      expect(f.vectorMatch[1].value).to.equal(1);
    })

    it("Has individual filter methods for each property", function(){
      expect(f.matchSize).to.exist;
      expect(f.matchIncludes).to.exist;
      expect(f.matchExcludes).to.exist;
      expect(f.matchBassPitch).to.exist;
      expect(f.matchSopranoPitch).to.exist;
      expect(f.matchVector).to.exist;
      expect(f.matchUserSequence).to.exist;
      expect(f.matchSymetrical).to.exist;
    })
    describe("Individual Filter Methods", function(){
      
      it("matchSize limits min and max size of chords", function(){
        f.setFilters({minSize: 2, maxSize: 7})
        expect(f.matchSize(chord1)).to.equal(false)
        expect(f.matchSize(chord2)).to.equal(true)
      })
  
      it("matchIncludes only allows chords that include the specified pitches", function(){
        f.setFilters({includes: [4, 9]});
        expect(f.matchIncludes(chord1)).to.equal(true)
        expect(f.matchIncludes(chord2)).to.equal(false)
      })
      
      it("matchExcludes only allows chords that do not have the specified pitches", function(){
        f.setFilters({excludes: [9]});
        expect(f.matchExcludes(chord1)).to.equal(false)
        expect(f.matchExcludes(chord2)).to.equal(true)
      })

      it("matchBassPitch only allows chords that are based on the specified pitch", function(){
        f.setFilters({bassPitch: 2})
        expect(f.matchBassPitch(chord2)).to.equal(false)
        expect(f.matchBassPitch(chord3)).to.equal(true)
      })
      
      it("matchSopranoPitch only allows chords where the final pitch is the specified pitch", function(){
        f.setFilters({sopranoPitch: 7})
        expect(f.matchSopranoPitch(chord1)).to.equal(true)
        expect(f.matchSopranoPitch(chord2)).to.equal(false)
      })

      it("matchVector only allows chords that meet the vector criteria", function(){
        f.setVector({1 : {type: "atLeast", value: 2}})
        expect(f.matchVector(chord1)).to.equal(true);
        expect(f.matchVector(chord2)).to.equal(false);
      })

      it("matchUserSequence only allows chords that contain the specified sequence", function(){
        f.setFilters({sequence: [0, 1]});
        expect(f.matchUserSequence(chord1)).to.equal(false)
        expect(f.matchUserSequence(chord2)).to.equal(true)
        f.setFilters({sequence: [1,1]})
        expect(f.matchUserSequence(chord2)).to.equal(true)
        expect(f.matchUserSequence(chord3)).to.equal(true)

        
        f.setFilters({sequence: [1]});
        expect(f.matchUserSequence(chord1)).to.equal(true)
        expect(f.matchUserSequence(chord2)).to.equal(true)
      })

      it("matchSymetrical only allows chords with symetrical interval structures", function(){
        f.setFilters({symetrical: true});
        expect(f.matchSymetrical(chord1)).to.equal(true);
        expect(f.matchSymetrical(chord2)).to.equal(false);
      })

    })

  })

})


// configure({ adapter: new Adapter() });
// describe('App component testing', function() {
//   it('renders welcome message', function() {
//     const wrapper = shallow(<App />); 
//     const welcome = <nav></nav>;
//     expect(wrapper.contains(welcome)).to.equal(true);
//   });
// });