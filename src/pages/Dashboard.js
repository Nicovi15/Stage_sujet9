import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import HistoQCM from "../components/HistoQCM";


function DashboardContent(props) {
    if(props.user.admin === "1")return <></>
    else return <><HistoQCM user={props.user}/></>
}

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
                <h1>Dashboard</h1>
                <h2>Bienvenue {this.props.user.pseudo}</h2>
                <DashboardContent user={this.props.user} />

            </div>
        );
    }


}
