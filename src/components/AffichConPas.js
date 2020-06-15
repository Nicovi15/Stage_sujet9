import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import {Button } from 'antd';
import TabRes from "./TabRes";

function Bmodif(props) {

    if (!props.modif) {
        return <Button onClick={props.onClick}>Afficher</Button>
    } else
        return <> <Button onClick={props.onClick}>Annuler</Button> </>
}

function Modif(props){
    if(props.modif)
        return <TabRes
            num_cont={props.num_cont}
        />;
    else return <></>;
}

export default class AffichConPas extends Component {


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
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getreponses.php",{
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
        console.log(this.props.num_quest)
        if(window.confirm(("Voulez vraiment supprimer la question n°" + this.props.num_quest+" ?"))){
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/supprQuestion.php",
                {
                    num_quest : this.props.num_quest,
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
        var reponses=[];/*
        await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getreponses.php",{
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
        //console.log(this.state.theme);*/
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
                    <td>{this.props.num_cont}</td>
                    <td>{this.props.theme}</td>
                    <td>{this.props.difficulte}</td>
                    <td>{this.props.duree}</td>
                    <td>{this.props.date}</td>
                    <td><Bmodif modif={this.state.modifier} onClick={this.handleChangeModif}/></td>

                </tr>
                <tr>
                    <td colSpan={6}>
                    <Modif
                        modif={this.state.modifier}
                        num_cont={this.props.num_cont}
                    /></td>
                </tr>
            </>
        );
    }
}
