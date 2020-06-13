import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button } from 'antd';
import ModifEvent from "./ModifEvent"

function Bmodif(props) {

    if (!props.modif) {
        return <Button onClick={props.onClick}>Modifier</Button>
    } else
        return <> <Button onClick={props.onClick}>Annuler</Button> </>
}

function Modif(props){
    if(props.modif)
        return <ModifEvent
            no_ev ={props.no_ev}
            libelle={props.libelle}
            reloadEv={props.reloadEv}
        />;
    else return <></>;
}

export default class AffichDEvent extends Component{

    constructor(props){
        super(props);

        this.state = {
            modifier :false,
        }
        this.handleChangeModif = this.handleChangeModif.bind(this);
        this.handleDeleteB = this.handleDeleteB.bind(this);
    }

    handleChangeModif(){
        this.setState({
            modifier : !this.state.modifier,
        })
    }

    handleDeleteB(){
        console.log(this.props.no_ev)
        if(window.confirm(("Voulez vraiment supprimer l'événement n°" + this.props.no_ev+" ?"))){
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~barros4u/PHP/supprEvenements.php",
                {
                    no_ev : this.props.no_ev,
                },
                {withCredentials: true}
            ).then(response => {
                if ( response.data.error ) {
                    console.log(response.data.error)
                    this.setState({
                        echec : true,
                    })
                }
                else {
                    console.log(response.data);
                    if(response.data.status === "Succes") console.log("yes "+response.data);
                    //this.handleSuccessfulAuth(response.data.user);
                    //this.props.history.push("/");
                    this.props.reloadEv();
                }
            });
        }
    }

    render(){
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }
        return(
            <>
                <tr>
                    <td>{this.props.no_ev}</td>
                    <td>{this.props.libelle}</td>
                    <td><Bmodif modif={this.state.modifier} onClick={this.handleChangeModif}/></td>
                    <td><Button onClick={this.handleDeleteB}>Supprimer</Button></td>
                </tr>
                <tr>
                    <td colSpan={10} >
                    <Modif
                        modif={this.state.modifier}
                        no_ev ={this.props.no_ev}
                        libelle={this.props.libelle}
                        reloadEv={this.props.reloadEv}
                    />
                    </td>
                </tr>
            </>
        );
    }

}