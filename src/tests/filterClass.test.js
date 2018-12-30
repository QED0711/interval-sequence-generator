import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'

// import App from '../App';

import Chord from '../js/newChord';
import Filter from '../js/Filter';
import VectorFilter from '../js/VectorFilter';

describe("Filter Class", function(){
    let f = new Filter({
        minSize: 2,
        maxSize: 12
    });

    let chord1 = new Chord([3,4], [1, 0]) // major triad
    let chord2 = new Chord([3,4], [1, 0, 0]) // Dominant 7th
    let chord3 = new Chord([3,4], [1, 1]) // Augmented
    let chord4 = new Chord([3,4,], [0,1,1,0,1,0])
  
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
        expect(f.runFilters).to.exist
        f.setFilters({
          includes: [9],
          excludes: [0],
          bassPitch: 2,
          sopranoPitch: 9,
          sequence: [1,0],
          symetrical: false
        })
        expect(f.runFilters(chord1).passed).to.equal(true);
        expect(f.runFilters(chord1).validTranspositions).to.deep.equal([2]);

        f.resetFilters();
        f.setVector({
          3 : {type: 'atLeast', value: 1},
          4 : {type: 'atLeast', value: 1},
          5 : {type: 'atLeast', value: 1}
        })
        f.setFilters({
          sopranoPitch: 2,
          bassPitch: 4
        })
        expect(f.runFilters(chord2).passed).to.equal(true);

        f.resetFilters();
        f.setFilters({
          bassPitch: 1,
          sopranoPitch: 8
        })
        expect(f.runFilters(chord3).passed).to.equal(false);
        
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
          f.setFilters({minSize: 2, maxSize: 5})
          expect(f.matchSize(chord1)).to.equal(true)
          expect(f.matchSize(chord4)).to.equal(false)
        })
    
        it("matchIncludes only allows chords that include the specified pitches", function(){
          f.setFilters({includes: [6]});
          expect(f.matchIncludes(chord1).match).to.equal(true)
          expect(f.matchIncludes(chord1).validTranspositions).to.deep.equal({'2': 2, '6': 6, '11': 11, length: 3} )
          f.setFilters({includes: [2,5,9]})
          expect(f.matchIncludes(chord1).match).to.equal(false)
        })
        
        it("matchExcludes only allows chords that do not have the specified pitches", function(){
          f.setFilters({excludes: [9]});
          expect(f.matchExcludes(chord1).match).to.equal(true)
          expect(f.matchExcludes(chord1).validTranspositions.length).to.equal(9)
        })
  
        it("matchBassPitch only allows chords that are based on the specified pitch", function(){
          f.setFilters({bassPitch: 2})
          expect(f.matchBassPitch(chord2).match).to.equal(true)
          expect(f.matchBassPitch(chord2).validTranspositions).to.deep.equal({"2" : 2, length: 1});
        })
        
        it("matchSopranoPitch only allows chords where the final pitch is the specified pitch", function(){
          f.setFilters({sopranoPitch: 7})
          expect(f.matchSopranoPitch(chord1).match).to.equal(true)
          expect(f.matchSopranoPitch(chord1).validTranspositions).to.deep.equal({"0" : 0, length: 1});
        })

        it("matchPitchContent knows if a chord or its transpositions match user defined pitch content", function(){
          f.resetFilters();
          f.setFilters({
            bassPitch: 0,
            sopranoPitch: 8
          })
          expect(f.matchPitchContent(chord3)).to.deep.equal([0]);
        })
  
        it("matchVector only allows chords that meet the vector criteria", function(){
          f.setVector({
            1 : {type: null, value: 0},
            6 : {type: "exactly", value: 1}
          })
          expect(f.matchVector(chord1)).to.equal(false);
          expect(f.matchVector(chord2)).to.equal(true);
        })
  
        it("matchUserSequence only allows chords that contain the specified sequence", function(){
          f.setFilters({sequence: [0, 1]});
          expect(f.matchUserSequence(chord1)).to.equal(false)
          expect(f.matchUserSequence(chord4)).to.equal(true)
          
          f.setFilters({sequence: [1,1]})
          expect(f.matchUserSequence(chord3)).to.equal(true)
  
          f.setFilters({sequence: [1]});
          expect(f.matchUserSequence(chord1)).to.equal(true)
          expect(f.matchUserSequence(chord2)).to.equal(true)
          expect(f.matchUserSequence(chord3)).to.equal(true)
          expect(f.matchUserSequence(chord4)).to.equal(true)
        })
  
        it("matchSymetrical only allows chords with symetrical interval structures", function(){
          f.setFilters({symetrical: true});
          expect(f.matchSymetrical(chord3)).to.equal(true);
          expect(f.matchSymetrical(chord2)).to.equal(false);
        })
  
      })
  
    })    
})

