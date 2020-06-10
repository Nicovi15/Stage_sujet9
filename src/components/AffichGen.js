import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button, Table } from 'antd';
import AffichQuest from "./AffichQuest";
import { Radio } from 'antd';
import { Checkbox } from 'antd';
import '../design/affichGen.scss'

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
        var questions=[];
        console.log(this.state.checkedList);
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getquestions2.php",{
            list : this.state.checkedList,
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

    // onChange2 = checkedList => {
    //     this.setState({
    //         indeterminate: !!checkedList.length && checkedList.length < this.state.theme.length,
    //         checkAll: checkedList.length === this.state.theme.length,
    //         checkedList,
    //     });
    //     console.log(this.state.checkedList);
    // };

    onChange = checkedList => {
      this.setState({
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < this.state.theme.length,
        checkAll: checkedList.length === this.state.theme.length,
      });
    };

    onCheckAllChange = e => {
   this.setState({
     checkedList: e.target.checked ? this.state.theme : [],
     indeterminate: false,
     checkAll: e.target.checked,
   });
 };

    chargerQuest(){

    }

    async componentDidMount(){
        var questions=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getquestions.php")
            .then(res => {
                 console.log(res);
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
            <div id={"affichGen"}>
                <h1>Liste des questions</h1>

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
                        options={this.state.theme}
                        value={this.state.checkedList}
                        onChange={this.onChange}
                    />
                    <button onClick={this.affiState}>Rechercher</button>
                </div>
                <br />

                <table border="1px" >
                    <thead  >
                    <tr>
                        <th>Num question</th>
                        <th>Libelle</th>
                        <th>Nb Bonnes Réponses</th>
                        <th>Nb Mauvaises Réponses</th>
                        <th>Difficulté</th>
                        <th>Num Thème</th>
                        <th>Thème</th>
                        <th>Réponses</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>

                    </thead>
                    <tbody>



                        {this.state.questions.map(question => <AffichQuest key={question.num_quest}
                                                                           num_quest={question.num_quest}
                                                                           libelle={question.libelle}
                                                                           nb_bonnerep={question.nb_bonnerep}
                                                                           nb_mauvaiserep={question.nb_mauvaiserep}
                                                                           difficulte={question.difficulte}
                                                                           num_theme={question.num_theme}
                                                                           theme={question.theme}
                                                                           reloadQuest={this.reloadQuest2}/>)}





                </tbody>

                </table>

            </div>
        );
    }
}
