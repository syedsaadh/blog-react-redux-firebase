import React, {Component} from 'react';

export default class NoMatch extends Component {
    render(){
        return(
            <h1>Not Found {this.props.location.pathname}</h1>
        )
    }
}