import React, {Component} from 'react'
import {HashRouter as Router, Link, Redirect} from "react-router-dom";
import AjoutQuestion from "../components/AjoutQuestion";
import AffichGen from "../components/AffichGen";
import {Menu} from "antd";
import {Button} from "antd";
import 'antd/dist/antd.css';

function Bajout(props) {

    if (!props.ajoutQ) {
        return <Button onClick={props.onClick}>Ajouter une question</Button>
    } else
        return <Button onClick={props.onClick}>Annuler</Button>
}

function Ajout(props){

    if(props.ajout)
        return <AjoutQuestion/>;
    else return <></>;
}


export default class GestionQ extends Component {


    constructor(props) {
        super(props);

        this.state = {
            ajoutQ: false,
        }


        this.handleChangeAjouQ = this.handleChangeAjouQ.bind(this);
    }

    handleChangeAjouQ(){
        this.setState({
            ajoutQ : !this.state.ajoutQ,
        })
    }


    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <h1>Gestionnaire des questions</h1>
                <Ajout ajout={this.state.ajoutQ} />
                <Bajout ajoutQ={this.state.ajoutQ} onClick={this.handleChangeAjouQ}/>
                <br/>
                <AffichGen/>
            </div>
        );
    }
}


