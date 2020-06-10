import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button } from 'antd';
import AffichRep from "./AffichRep";
import ModifQuestion from "./ModifQuestion";
const { Option } = Select;

function Brep(props) {

    if (!props.rep) {
        return <Button onClick={props.onClick}>Afficher les reps.</Button>
    } else
        return <Button onClick={props.onClick}>Cacher les reps.</Button>
}

function Bmodif(props) {

    if (!props.modif) {
        return <Button onClick={props.onClick}>Modifier</Button>
    } else
        return <> <Button onClick={props.onClick}>Annuler</Button> </>
}

function Modif(props){
    if(props.modif)
        return <ModifQuestion
            num_quest ={props.num_quest}
            libelle={props.libelle}
            nb_bonnerep={props.nb_bonnerep}
            nb_mauvaiserep={props.nb_mauvaiserep}
            difficulte = {props.difficulte}
            theme = {props.theme}
            reloadQuest={props.reloadQuest}
        />;
    else return <></>;
}

function ListeRep(props){
    if(props.afficheRep)
        return<table border="1px">
            <tr>
                <td>Num Rep</td>
                <td>Libelle</td>
                <td>Valeur</td>
                <td>Modifier</td>
            </tr>
            {props.reponses.map(rep => <AffichRep key={rep.num_rep}
                                                           num_rep={rep.num_rep}
                                                           libelle={rep.libelle}
                                                           valeur={rep.valeur}
                                                           num_quest={props.num_quest}
                                                           reloadRep={props.reloadRep}


            />)}
        </table>;
    else return <></>
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
        console.log(this.props.num_quest)
        if(window.confirm(("Voulez vraiment supprimer la question n°" + this.props.num_quest+" ?"))){
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/supprQuestion.php",
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
        var reponses=[];
        await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getreponses.php",{
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
        //console.log(this.state.theme);
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
                    <td>{this.props.num_quest}</td>
                    <td>{this.props.libelle}</td>
                    <td>{this.props.nb_bonnerep}</td>
                    <td>{this.props.nb_mauvaiserep}</td>
                    <td>{this.props.difficulte}</td>
                    <td>{this.props.num_theme}</td>
                    <td>{this.props.theme}</td>
                    <td>

                        <ListeRep afficheRep={this.state.afficheRep}
                                  reponses={this.state.reponses}
                                  num_quest={this.props.num_quest}
                                  reloadRep={this.reloadRep}
                        />
                        <Brep rep={this.state.afficheRep} onClick={this.afficheRep} />
                    </td>
                    <td><Bmodif modif={this.state.modifier} onClick={this.handleChangeModif}/></td>
                    <td><Button onClick={this.handleDeleteB}>Supprimer</Button></td>
                </tr>
                <tr>
                    <Modif
                        modif={this.state.modifier}
                        num_quest ={this.props.num_quest}
                        libelle={this.props.libelle}
                        nb_bonnerep={this.props.nb_bonnerep}
                        nb_mauvaiserep={this.props.nb_mauvaiserep}
                        difficulte = {this.props.difficulte}
                        theme = {this.props.theme}
                        reloadQuest={this.props.reloadQuest}
                    />
                </tr>
            </>
        );
    }
}
