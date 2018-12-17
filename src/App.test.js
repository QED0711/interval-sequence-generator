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
  const f = new Filter({
    minSize: 3,
    maxSize: 7,
  });

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
      expect(f.bassMatch).to.be.null
      expect(f.sopranoMatch).to.be.null
      expect(f.vectorMatch).to.be.an.instanceof(VectorFilter)
      expect(f.sequenceMatch).to.be.null
      expect(f.symetrical).to.be.null
    })

  })

  describe("Methods", function(){

    it("Can apply filters to input chords", function(){
      expect(f.runFilters).to.exist
    })
    
    it("Can change the filter properties", function(){
      expect(f.setFilters).to.exist
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