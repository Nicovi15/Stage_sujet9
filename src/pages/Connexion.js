import React, {Component} from 'react'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
export default class Connexion extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1> Connexion </h1>
                <h1>Status : {this.props.loggedInStatus}</h1>
               <Route>Pas de compte ? <Link to="/inscription">Inscrivez-vous !</Link></Route>
            </div>
        );
    }
}
