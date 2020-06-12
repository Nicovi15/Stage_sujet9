import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import HistoQCM from "../components/HistoQCM";
import DashboardAdmin from "../components/DashboardAdmin";
import { Progress } from 'antd';
import '../design/dashboard.scss'


function DashboardContent(props) {
    if(props.user.admin === "1")return <><DashboardAdmin/></>
    else return <div id={"content"} ><h3>Historique des QCM</h3>
        <HistoQCM user={props.user}/></div>
}

export default class Dashboard extends Component {

    constructor(props) {
        super(props);


    }

    isActive(exp){
        if(exp == 100)return ""
        else return "active";
    }


    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }
        //<h1>Status:{this.props.loggedInStatus}</h1>
        return (
            <div id={"dash"}>

                <h1 id={"bienv"}> Bienvenue {this.props.user.pseudo} </h1>
                <div id={"infoniveau"}>
                <h3>Vous êtes actuellement niveau {this.props.user.niveau} {/*({this.props.user.exp}%)*/}</h3>
                    <Progress percent={this.props.user.exp} status={this.isActive(this.props.user.exp)} style={{width: 500}} />
                </div>
                <DashboardContent user={this.props.user} />

            </div>
        );
    }


}
