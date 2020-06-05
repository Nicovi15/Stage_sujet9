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
            checkedList: [],
            indeterminate: true,
            checkAll: false,
        }
    }

    onChange2 = checkedList => {
        this.setState({
            indeterminate: !!checkedList.length && checkedList.length < this.state.theme.length,
            checkAll: checkedList.length === this.state.theme.length,
            checkedList,
        });
        console.log(this.state.checkedList);
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? this.state.theme : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
        console.log(this.state);
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
                    <CheckboxGroup
                        options={this.state.theme}
                        value={this.state.checkedList}
                        onChange={this.onChange2}
                    />
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
                    />)}

                </table>

            </div>
        );
    }
}
