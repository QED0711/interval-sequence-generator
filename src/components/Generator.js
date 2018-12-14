import React, {Component} from 'react';

import generateFromSet from '../js/generateFromSet'

class Generator extends Component {

    constructor(props){
        super(props);
        this.state = {...props}
    }

    textToNumArray(text){
        let returnText = text ? text.split(" ").map(x => parseInt(x)) : []
        if(returnText.length <= 6 && returnText.length > 0) return returnText;
        alert("This tool only handles up to between 1 and 6 pitch-class intervals in the set. Please change your selection.")
        return [];
    }

    render(){
        return(
            <div>
                <input type="text" id="interval-set"/>
                
                <button onClick={() => {
                    const text = document.getElementById("interval-set").value
                    const intervalSet = this.textToNumArray(text)
                    if(intervalSet.length > 0){
                        console.log(generateFromSet(intervalSet))
                    }
                } 
                }>Generate Sequences</button>

            </div>
        )
    }

}

export default Generator;