import React, {Component} from 'react'
import {Redirect} from "react-router-dom";

export default class GestionQ extends Component {


    constructor(props) {
        super(props);


    }


    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <h1>C'est la page reservé aux admins permettant de gérer les questions</h1>
            </div>
        );
    }
}


