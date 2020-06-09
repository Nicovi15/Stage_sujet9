import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button, Table } from 'antd';
import AffichQuest from "./AffichQuest";
import { Radio } from 'antd';
import AffichU from "./AffichU";
import { Checkbox } from 'antd';
import '../design/affichGen.scss'

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;


export default class AffichUti extends Component {


    constructor(props) {
        super(props);

        this.state = {
            utilisateurs : [],
            theme:[],
            difficulte:[1,2,3],
            checkedValues: [],
            indeterminate: true,
            checkAll: false,
        }
        this.reloadQuest = this.reloadQuest.bind(this);
        this.onChange = this.onChange.bind(this);
        this.reloadQuest2 = this.reloadQuest2.bind(this);
        this.affiState = this.affiState.bind(this);

    }

    affiState (){
        console.log(this.state);
        this.reloadQuest2();
    }

    reloadQuest2 (){
        var utilisateurs=[];
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getUtilisateurs.php")
            .then(res => {
                console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    utilisateurs.push(donne);
                });
                this.setState({utilisateurs},);
                console.log(this.state);
            })
    }



    reloadQuest (){
        var questions=[];
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getquestions.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    questions.push(donne);
                });
                this.setState({questions},);
                console.log(this.state);
            })
    }

    onChange2 = checkedList => {
        this.setState({
            indeterminate: !!checkedList.length && checkedList.length < this.state.theme.length,
            checkAll: checkedList.length === this.state.theme.length,
            checkedList,
        });
        console.log(this.state.checkedList);
    };

    onChange(checkedValues) {
        this.setState({
            indeterminate: !!checkedValues.length && checkedValues.length < this.state.theme.length,
            checkAll: checkedValues.length === this.state.theme.length,
            checkedValues,
        });
        //this.reloadQuest2();


    }

    onCheckAllChange = e => {

        this.setState({
            checkedList: e.target.checked ? this.state.theme : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });

        //console.log(this.state);
        //console.log(this.state.checkedValues);
    };

    chargerQuest(){

    }

    async componentDidMount(){
        var utilisateurs=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getUtilisateurs.php")
            .then(res => {
                console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    utilisateurs.push(donne);
                });
                this.setState({utilisateurs},);
                console.log(this.state);
            })

        var theme=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getTheme.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    theme.push(donne.libelle);
                });
                this.setState({theme});
            })
        //console.log(this.state.theme);
    }


    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <div id={"affichGen"}>
                <h4>Liste des utilisateurs</h4>

                {/*<div id={"selection"}>
                    <div className="site-checkbox-all-wrapper">
                        <Checkbox  class={"chbox"}
                                   indeterminate={this.state.indeterminate}
                                   onChange={this.onCheckAllChange}
                                   checked={this.state.checkAll}
                        >
                            Tout selectionner
                        </Checkbox>
                    </div>
                    <Checkbox.Group
                        options={this.state.theme}
                        onChange={this.onChange}
                    />
                    <button onClick={this.affiState}>Rechercher</button>
                </div>
                <br />*/}

                <table border="1px" >
                    <thead  >
                    <tr>
                        <th>Num uti</th>
                        <th>Pseudo</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Historiques QCM</th>
                        <th>Supprimer</th>
                    </tr>

                    </thead>
                    <tbody>



                    {this.state.utilisateurs.map(uti => <AffichU key={uti.num_uti}
                                                                       num_uti={uti.num_uti}
                                                                       pseudo={uti.pseudo}
                                                                       nom={uti.nom}
                                                                       prenom={uti.prenom}
                                                                       email={uti.email}
                                                                       user={uti}
                                                                       reloadQuest={this.reloadQuest2}/>)}






                    </tbody>

                </table>

            </div>
        );
    }
}
