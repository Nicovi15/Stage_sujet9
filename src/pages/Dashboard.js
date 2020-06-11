import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import HistoQCM from "../components/HistoQCM";
import DashboardAdmin from "../components/DashboardAdmin";
import '../design/dashboard.scss'


function DashboardContent(props) {
    if(props.user.admin === "1")return <><DashboardAdmin/></>
    else return <><h3>Historique des QCM</h3>
        <HistoQCM user={props.user}/></>
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
            <div id={"dash"}>

                <h2 id={"bienv"}> Bienvenue {this.props.user.pseudo} </h2>
                <h3>Vous êtes actuellement niveau {this.props.user.niveau} ({this.props.user.exp}%)</h3>
                <DashboardContent user={this.props.user} />

            </div>
        );
    }


}
