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


describe("Chord Class", function(){
    let chord1 = new Chord([1,0], [3,4]);

    it("can create a chordInfo object from a chord array", function(){
        expect(chord1).to.exist;
    })
    
    it("can find all transpositions of itself", function(){
        // expect(chord1.transpositions.length).to.equal(11);
    })

    it("knows what pitch classes are in its transpositions", function(){
        expect(chord1.transpositions).to.exist
        expect(chord1.transpositions.endsWith[0][0]).to.equal(7)
        expect(chord1.transpositions.contains[2]).to.deep.equal([2,6,9])
    })

    it("knows the chord and interval sequence notation for itself", function(){
        expect(chord1.designation).to.equal("(3,4)-<1,0>")
    })
})