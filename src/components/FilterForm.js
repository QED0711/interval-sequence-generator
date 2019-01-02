import React from 'react';
import Filter from '../js/Filter';
import PITCH_KEYS from '../js/pitchKeys';

import VectorFilter from '../js/VectorFilter';

// COMPONENTS
import VectorFilters from './VectorFilters';

const FilterForm = (props) => {
    
    const {setFilterOptions} = props.AppMethods;



    function handleChange(e){
        
        let minSize = parseInt(document.getElementById("filter-form-minSize").value);
        let maxSize = parseInt(document.getElementById("filter-form-maxSize").value);
        
        let includes = document.getElementById("filter-form-includes").value.split(" ").map(x => PITCH_KEYS[x.toLowerCase()])
        if(typeof includes[0] !== 'number') includes = null;
        
        let excludes = document.getElementById("filter-form-excludes").value.split(" ").map(x => PITCH_KEYS[x.toLowerCase()])
        if(typeof excludes[0] !== 'number') excludes = null;
        
        let bassPitch = parseInt(PITCH_KEYS[document.getElementById("filter-form-bassPitch").value.toLowerCase()]);
        if(isNaN(bassPitch)) bassPitch = null;
        
        let sopranoPitch = parseInt(PITCH_KEYS[document.getElementById("filter-form-sopranoPitch").value.toLowerCase()]);
        if(isNaN(sopranoPitch)) sopranoPitch = null;
        
        let sequence = document.getElementById("filter-form-sequence").value.split(" ").map(x => parseInt(x));
        if(isNaN(sequence[0])) sequence = null;
        
        let symetrical = document.getElementById("filter-form-symetrical").checked;
        
        let allPCI = document.getElementById("filter-form-allPCI").checked;

        const filterOptions = {
            minSize,
            maxSize,
            includes,
            excludes,
            bassPitch,
            sopranoPitch,
            sequence,
            symetrical,
            allPCI,
            vectorMatch: getVectorFilters()
        }
        console.log(filterOptions)
        setFilterOptions(filterOptions);        
    }



    function getVectorFilters(){
        const vf = new VectorFilter()

        const filters = document.getElementsByClassName("vector-filter");

        for(let filter of filters){

            let ic = filter.id.split("-")[1];
           
            let children = filter.children;
           
            let type = children[1].value
            switch(type){
                case("At Least"):
                    type = "atLeast"
                    break;
                case("Fewer Than"):
                    type = "lessThan"
                    break;
                case("Exactly"):
                    type = "exactly"
                    break;
                default:
                    type = null

            }
           
            let value = parseInt(children[2].value)
           
            vf.setVector(ic, type, value);

        }
        return vf        
    }

    

    return(
        
        <form id="filter-form">
            <h3>Chord Size</h3>

            <label>Minimum Length</label><br/>
            <input id="filter-form-minSize" type="number" defaultValue="2" min="2" max="12" onChange={handleChange}/><br/>
            
            <label>Maximum Length</label><br/>
            <input id="filter-form-maxSize" type="number" defaultValue="12" min="2" max="12" onChange={handleChange}/><br/>
            
            <h3>Pitch Content</h3>
            <label>included Pitches</label><br/>
            <input id="filter-form-includes" type="text" placeholder="e.g. Bb, C# etc." onChange={handleChange}/><br/>
            <label>Excluded Pitches</label><br/>
            <input id="filter-form-excludes" type="text" placeholder="Excluded Pitches" onChange={handleChange}/><br/>
            <label>Bass Pitch</label><br/>
            <input id="filter-form-bassPitch" type="text" placeholder="Bass Pitch" onChange={handleChange}/><br/>
            <label>Soprano Pitch</label><br/>
            <input id="filter-form-sopranoPitch" type="text" placeholder="Soprano Pitch" onChange={handleChange}/><br/>
            
            <h3>Interval Structure</h3>
            <label>Sequence</label><br/>
            <input id="filter-form-sequence" type="text" placeholder="e.g. 0 1 2 3" onChange={handleChange}/><br/>
            <label>Symetrical</label><br/>
            <input id="filter-form-symetrical" type="checkbox" onChange={handleChange}/><br/>
            <label>Has All PCI Types</label><br/>
            <input id="filter-form-allPCI" type="checkbox" onChange={handleChange}/><br/>

            <VectorFilters handleChange={handleChange}/>

        </form>

    )
}

export default FilterForm