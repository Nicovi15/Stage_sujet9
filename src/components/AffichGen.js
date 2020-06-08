import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button, Table } from 'antd';
import AffichQuest from "./AffichQuest";
import { Radio } from 'antd';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;


export default class AffichGen extends Component {


    constructor(props) {
        super(props);

        this.state = {
            questions : [],
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
        var questions=[];
        console.log(this.state.checkedList);
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getquestions2.php",{
            list : this.state.checkedValues,
            checkAll: this.state.checkAll,
        })
            .then(res => {
                // console.log(res);
                 console.log(res.data);
                res.data.map(donne =>{
                    questions.push(donne);
                });
                this.setState({questions},);
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
        var questions=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getquestions.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    questions.push(donne);
                });
                this.setState({questions},);
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
            <div>
                <h1>Bases des questions</h1>

                <div>
                    <div className="site-checkbox-all-wrapper">
                        <Checkbox
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
                <br />
                <table border="1px" >
                    <tr>
                        <td>Num question</td>
                        <td>Libelle</td>
                        <td>Nb Bonnes Réponses</td>
                        <td>Nb Mauvaises Réponses</td>
                        <td>Difficulté</td>
                        <td>Num Thème</td>
                        <td>Thème</td>
                        <td>Réponses</td>
                        <td>Modifier</td>
                        <td>Supprimer</td>

                    </tr>
                    {this.state.questions.map(question => <AffichQuest key={question.num_quest}
                                                                       num_quest={question.num_quest}
                                                                       libelle={question.libelle}
                                                                       nb_bonnerep={question.nb_bonnerep}
                                                                       nb_mauvaiserep={question.nb_mauvaiserep}
                                                                       difficulte={question.difficulte}
                                                                       num_theme={question.num_theme}
                                                                       theme={question.theme}
                                                                       reloadQuest={this.reloadQuest2}
                    />)}

                </table>

            </div>
        );
    }
}
