import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import AffichU from "./AffichU";
import { Checkbox, Button } from 'antd';
import '../design/affichUti.scss'


export default class AffichUti extends Component {


    constructor(props) {
        super(props);

        this.state = {
            utilisateurs : [],
            promo:[],
            difficulte:[1,2,3],
            checkedList: [],
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
        console.log(this.state.checkedList);
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getutilisateurs.php",{
            list : this.state.checkedList,
            checkAll: this.state.checkAll,
        })
            .then(res => {
                // console.log(res);
                console.log(res.data);
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
            indeterminate: !!checkedList.length && checkedList.length < this.state.promo.length,
            checkAll: checkedList.length === this.state.promo.length,
            checkedList,
        });
        console.log(this.state.checkedList);
    };

    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < this.state.promo.length,
            checkAll: checkedList.length === this.state.promo.length,
        });
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? this.state.promo : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    async componentDidMount(){
        var utilisateurs=[];
        await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getutilisateurs.php",{
            list : this.state.checkedList,
            checkAll: true,
        })
            .then(res => {
                // console.log(res);
                console.log(res.data);
                res.data.map(donne =>{
                    utilisateurs.push(donne);
                });
                this.setState({utilisateurs},);
                console.log(this.state);
            })

        var promo=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getpromo.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    promo.push(donne.libelle);
                });
                this.setState({promo});
            })
        //console.log(this.state.theme);
    }


    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <div id={"affichUti"}>
                <h4>Liste des utilisateurs</h4>

                <div id={"selection"}>
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
                        options={this.state.promo}
                        onChange={this.onChange}
                        value={this.state.checkedList}
                    />
                    <Button onClick={this.affiState}>Rechercher</Button>
                </div>
                <br />

                <table border="1px" >
                    <thead  >
                    <tr>
                        <th>Num uti</th>
                        <th>Pseudo</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Promo</th>
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
                                                                       promo={uti.promo}
                                                                       user={uti}
                                                                       usera={this.props.usera}
                                                                       reloadQuest={this.reloadQuest2}/>)}






                    </tbody>

                </table>

            </div>
        );
    }
}
