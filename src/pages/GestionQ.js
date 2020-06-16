import React, {Component} from 'react'
import { Redirect} from "react-router-dom";
import AjoutQuestion from "../components/AjoutQuestion";
import AffichGen from "../components/AffichGen";
import {Button} from "antd";
import 'antd/dist/antd.css';
import "../design/gestionQ.scss";
import axios from "axios";


function Bajout(props) {

    if (!props.ajoutQ) {
        return <Button onClick={props.onClick}>Ajouter une question</Button>
    } else
        return <Button onClick={props.onClick}>Annuler</Button>
}

function Ajout(props){

    if(props.ajout)
        return <AjoutQuestion reload={props.reload}/>;
    else return <></>;
}

function Affiche(props){
    console.log(props.questions);
    if(props.questions.length>1)
        return <AffichGen questions={props.questions}/>;
    else return <></>;
}


export default class GestionQ extends Component {


    constructor(props) {
        super(props);
        this.affichGenElement = React.createRef();
        this.state = {
            ajoutQ: false,
        }
      }





    actualise=()=>{
    //  console.log("yoyoy");
      this.affichGenElement.current.loadQuest();
    //  console.log(this.state.questions);

    }

    handleChangeAjouQ =()=>{
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
            <div id={"gestionQ"}>

                <Ajout ajout={this.state.ajoutQ} reload={this.actualise} />
                <Bajout ajoutQ={this.state.ajoutQ} onClick={this.handleChangeAjouQ}/>
                <AffichGen ref={this.affichGenElement}/>;

            </div>
        );
    }
}
