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
    it("can create a chordInfo object from a chord array", function(){
        expect(Chord).to.exist;
    })
})