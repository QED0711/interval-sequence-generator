import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'

import App from '../App';

import Chord from '../js/Chord';

// import Vector from './js/vector';
// import Filter from './js/Filter';
// import VectorFilter from './js/VectorFilter';


describe("This is a test test", function(){
    let chord1 = new Chord([1,0], [3,4]);

    it("can create a chordInfo object from a chord array", function(){
        expect(chord1).to.exist;
    })
    
    it("can find all transpositions of itself", function(){
        expect(chord1.transpositions.length).to.equal(11);
    })

    it("knows what pitch classes are in its transpositions", function(){

    })

    it("knows the chord and interval sequence notation for itself", function(){
        expect(chord1.designation()).to.equal("(1,0)-0-<1,0>")
    })
})