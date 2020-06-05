import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button } from 'antd';
import AffichRep from "./AffichRep";
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

function ListeRep(props){
    if(props.afficheRep)
        return<table border="1px">
            <tr>
                <td>Num Rep</td>
                <td>Libelle</td>
                <td>Valeur</td>
                <td>Modifier</td>
            </tr>
            {props.reponses.map(rep => <tr><AffichRep key={rep.num_rep}
                                                           num_rep={rep.num_rep}
                                                           libelle={rep.libelle}
                                                           valeur={rep.valeur}

            /></tr>)}
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

    }

    handleChangeModif(){
        this.setState({
            modifier : !this.state.modifier,
        })
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

                        <ListeRep afficheRep={this.state.afficheRep} reponses={this.state.reponses}/>
                        <Brep rep={this.state.afficheRep} onClick={this.afficheRep} />
                    </td>
                    <td><Bmodif modif={this.state.modifier} onClick={this.handleChangeModif}/></td>

                </tr>
            </>
        );
    }
}
