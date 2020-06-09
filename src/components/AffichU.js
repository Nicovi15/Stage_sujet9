import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button } from 'antd';
import AffichRep from "./AffichRep";
import ModifQuestion from "./ModifQuestion";
import HistoQCM from "./HistoQCM";
const { Option } = Select;

function Brep(props) {

    if (!props.rep) {
        return <Button onClick={props.onClick}>Afficher les reps.</Button>
    } else
        return <Button onClick={props.onClick}>Cacher les reps.</Button>
}

function Bmodif(props) {

    if (!props.modif) {
        return <Button onClick={props.onClick}>Afficher</Button>
    } else
        return <> <Button onClick={props.onClick}>Annuler</Button> </>
}

function Histo(props){
    if(props.modif)
        return <><h3>Historique des QCM de {props.user.pseudo} ({props.user.prenom}  {props.user.nom})</h3>
            <HistoQCM user={props.user}
        />
        <br/></>;
    else return <></>;
}


export default class AffichQuest extends Component {


    constructor(props) {
        super(props);

        this.state = {
            reponses : [],
            afficheRep : false,
            modifier :false,

        }

        this.afficheRep = this.afficheRep.bind(this);
        this.handleChangeModif = this.handleChangeModif.bind(this);
        this.handleDeleteB = this.handleDeleteB.bind(this);
        this.reloadRep = this.reloadRep.bind(this);

    }

    reloadRep(){
        var reponses=[];
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getreponses.php",{
            num_quest : this.props.num_quest
        })
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    reponses.push(donne);
                });
                this.setState({reponses},);
                console.log(this.state);
            })
    }


    handleChangeModif(){
        this.setState({
            modifier : !this.state.modifier,
        })
    }

    handleDeleteB(){
        if(window.confirm(("Voulez vraiment supprimer le compte de " + this.props.prenom+" "+this.props.nom+" ("+this.props.pseudo+") ?"))){
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/supprUti.php",
                {
                    num_uti : this.props.num_uti,
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
                    this.props.reloadQuest();
                }
            });


        }
    }

    async componentDidMount(){
    }

    afficheRep(){
        this.setState({
            afficheRep : !this.state.afficheRep,
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
                    <td>{this.props.num_uti}</td>
                    <td>{this.props.pseudo}</td>
                    <td>{this.props.nom}</td>
                    <td>{this.props.prenom}</td>
                    <td>{this.props.email}</td>
                    <td><Bmodif modif={this.state.modifier} onClick={this.handleChangeModif}/></td>
                    <td><Button onClick={this.handleDeleteB}>Supprimer</Button></td>

                </tr>
                <tr>
                    <Histo
                        user={this.props.user} modif={this.state.modifier}
                    />
                </tr>
            </>
        );
    }
}