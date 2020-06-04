import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class Dashboard extends Component {

    constructor(props) {
        super(props);


    }

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }
        //<h1>Status:{this.props.loggedInStatus}</h1>
        return (
            <div>
                <h1>Dashboard de l'étudiant une fois qu'il est connecté</h1>

                <h2>Bienvenue {this.props.user.pseudo}</h2>

            </div>
        );
    }


}
