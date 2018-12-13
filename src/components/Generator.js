import React, {Component} from 'react';


class Generator extends Component {

    constructor(props){
        super(props);
        this.state = {...props}
    }

    render(){
        // let navigation = this.state.navigation;
        
        return(
            <div>
                This is the Generator content.
            </div>
        )
    }

}

export default Generator;