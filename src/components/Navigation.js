import React, {Component} from "react";
import { Link } from "react-router-dom";



class Navigation extends Component {

    render(){
        return(
            <div>
                <Link to="/info">Info</Link>
              |
                <Link to="/generate">generate</Link>
              |
                <Link to="/analyze">analyze</Link>                
            </div>
        )
    }

}

export default Navigation;