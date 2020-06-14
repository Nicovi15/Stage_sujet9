import React, {Component} from 'react'
import {HashRouter as Router, Link, Redirect} from "react-router-dom";
import AjoutEvent from "../components/AjoutEvent";
import AffichEvent from "../components/AffichEvent";
import {Button} from "antd";
import 'antd/dist/antd.css';
import "../design/accueil.scss"


function Bajout(props){
    if(props.user.admin === "1"){
        if (!props.ajoutE) {
            return <Button onClick={props.onClick}>Ajouter un evenement</Button>

        } else
            return <Button onClick={props.onClick}>Annuler</Button>
    }
    else{
        return <></>
    }
}

function Ajout(props){
    if(props.ajout)
        return <AjoutEvent/>;
    else return <></>;
}

export default class Accueil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ajoutE: false,
        }
        this.handleChangeAjouE = this.handleChangeAjouE.bind(this);
    }

    handleChangeAjouE(){
        this.setState({
            ajoutE : !this.state.ajoutE,
        })
    }

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }
        return (
            <>
            <div id={"accueilH"}>
                <Ajout ajout={this.state.ajoutE} />
                <Bajout id={"bajout"} user={this.props.user} onClick={this.handleChangeAjouE}/>
            </div>
            <div id={"accueil"}>

                <AffichEvent user={this.props.user}/>
            </div>
                </>
        );
    }
}


