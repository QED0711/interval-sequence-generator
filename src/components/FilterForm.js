import React from 'react';
import Filter from '../js/Filter';



const FilterForm = (props) => {
    
    function handleSubmit(e){
        e.preventDefault();
        const formValues = document.getElementById("filter-form").children
        const minSize = parseInt(formValues[1].value)
        const maxSize = parseInt(formValues[4].value)
        console.log(formValues)
        const options = {
            minSize: minSize,
            maxSize: maxSize
        }
        props.setFilterOptions(options);
    }

    return(
        
        <form id="filter-form" onSubmit={handleSubmit}>
            <h3>Chord Size</h3>

            <label>Minimum Length</label><br/>
            <input type="number" defaultValue="2" /><br/>
            
            <label>Maximum Length</label><br/>
            <input type="number" defaultValue="12" /><br/>
            
            <h3>Pitch Content</h3>
            <label>included Pitches</label><br/>
            <input type="text" placeholder="Included Pitches" /><br/>
            <label>Excluded Pitches</label><br/>
            <input type="text" placeholder="Excluded Pitches" /><br/>
            <label>Bass Pitch</label><br/>
            <input type="text" placeholder="Bass Pitch" /><br/>
            <label>Soprano Pitch</label><br/>
            <input type="text" placeholder="Soprano Pitch" /><br/>
            
            <input type="submit" value="click me!!"/><br/>

        </form>

    )
}

export default FilterForm