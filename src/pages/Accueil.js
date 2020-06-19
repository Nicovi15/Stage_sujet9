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
  console.log("props"+props.reload);
    if(props.ajout)
        return <AjoutEvent reload={props.reload}/>;
    else return <></>;
}


export default class Accueil extends Component {
    constructor(props) {
        super(props);
        this.afficheEventElement = React.createRef();
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

    reload=()=>{
    //console.log("j'actualise");
    this.afficheEventElement.current.reloadEv();
    }

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }
        return (
            <>
            <div id={"accueilH"}>
                <Ajout ajout={this.state.ajoutE} reload={this.reload}/>
                <Bajout id={"bajout"} user={this.props.user} ajoutE={this.state.ajoutE} onClick={this.handleChangeAjouE}/>
            </div>
            <div id={"accueil"}>

                <AffichEvent ref={this.afficheEventElement} user={this.props.user}/>
            </div>
                </>
        );
    }
}
