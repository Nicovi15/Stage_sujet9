import React, {Component} from 'react'
import {Redirect} from "react-router-dom";


export default class AjoutQuestion extends Component {


    constructor(props) {
        super(props);

        this.state = {
            libelle : "",
            nb_br : 0,
            bonneRep : {
                une : "",
                deux : "",
                trois : "",
                quatre : "",
            },
            nb_mr : 0,
            mauvaiseRep : {
                une : "",
                deux : "",
                trois :"",
                quatre : "",
            },
            theme : "",
            difficulte : "",
        }

    }


    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <h1>Ajout</h1>
            </div>
        );
    }
}
