import React from 'react';
import VectorFilter from '../js/VectorFilter'

// This is a display component that just renders the vector filters dynamically.
// The "handleChange" function comes from the parent component (which is it not bound to)

const VectorFilters = (props) => {
    
    const handleChange = props.handleChange

    const generateFilterInputs = () => {
        let ics = [1,2,3,4,5,6];
        return ics.map(ic => {
            return(
                <div key={ic} className="vector-filter" id={`ic-${ic}-type`} >
                    <label>{`IC ${ic}`}</label>
                    <select onChange={handleChange}>
                        <option>inactive</option>
                        <option>At Least</option>
                        <option>Fewer Than</option>
                        <option>Exactly</option>
                    </select>
                    <input type="number" className={`ic-${ic}-value`} defaultValue="0" min="0" onChange={handleChange} />
                </div>
            )
        })
    }

    return(
        <div id="vectorFiltervector-filters">
            <h3>Interval Class Vector</h3>
            {generateFilterInputs()}
        </div>
    )

}

export default VectorFilters;