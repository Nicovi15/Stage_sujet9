import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';

import { Button } from 'antd';
import ModifRep from "./ModifRep";



function Bmodif(props) {

    if (!props.modif) {
        return <Button onClick={props.onClick}>Modifier</Button>
    } else
        return <> <Button onClick={props.onClick}>Annuler</Button> </>
}

function Modif(props){
    if(props.modif)
        return <ModifRep
            num_quest ={props.num_quest}
            num_rep = {props.num_rep}
            libelle = {props.libelle}
            valeur = {props.valeur}
            reloadRep={props.reloadRep}
        />
    else return <></>
}


export default class AffichRep extends Component {


    constructor(props) {
        super(props);

        this.state = {
            modifier :false,
        }

        this.handleChangeModif = this.handleChangeModif.bind(this);

    }

    handleChangeModif(){
        this.setState({
            modifier : !this.state.modifier,
        })
    }

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <>
                <tr>
                    <td>{this.props.num_rep}</td>
                    <td>{this.props.libelle}</td>
                    <td>{this.props.valeur}</td>
                    <td><Bmodif modif={this.state.modifier} onClick={this.handleChangeModif}/></td>
                </tr>
                <tr>
                    <Modif
                        modif={this.state.modifier}
                        num_rep = {this.props.num_rep}
                        libelle = {this.props.libelle}
                        valeur = {this.props.valeur}
                        num_quest ={this.props.num_quest}
                        reloadRep={this.props.reloadRep}
                    />
                </tr>
            </>
        );
    }
}
