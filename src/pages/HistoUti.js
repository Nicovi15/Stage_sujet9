import React, {Component} from 'react'
import {HashRouter as Router, Link, Redirect} from "react-router-dom";

export default class HistoUti extends Component {


    constructor() {
        super();
        this.state = {
            id:null,
        }
    }



    componentDidMount() {
        this.setState({
            id : this.props.match.params.id,
        });
    }

    

render(){
    return(
            <h1>Je suis la page d'historique utilisateur + {this.state.id}</h1>

    )
}

}
