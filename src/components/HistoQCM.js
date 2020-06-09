import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button, Table } from 'antd';
import AffichQuest from "./AffichQuest";
import { Radio } from 'antd';
import { Checkbox } from 'antd';
import '../design/affichGen.scss'
import AffichHistoQ from "./AffichHistoQ";

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;


export default class HistoQCM extends Component {


    constructor(props) {
        super(props);

        this.state = {
            questionnaires : [],
            theme:[],
            difficulte:[1,2,3],
            checkedValues: [],
            indeterminate: true,
            checkAll: false,
        }
        this.onChange = this.onChange.bind(this);
        this.reloadHisto2 = this.reloadHisto2.bind(this);
        this.affiState = this.affiState.bind(this);

    }

    affiState (){
        console.log(this.state);
        this.reloadHisto2();
    }

    reloadHisto2 (){
        var questionnaires=[];
        console.log(this.state.checkedList);
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/gethistoeleve.php",{
            num_uti : this.props.user.num,
            list : this.state.checkedValues,
            checkAll: this.state.checkAll,
        })
            .then(res => {
                console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    questionnaires.push(donne);
                });
                this.setState({questionnaires},);
                console.log(this.state);
            })
    }



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

        var questionnaires=[];
        await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/gethistoeleve.php",{
            num_uti : this.props.user.num,
            list : this.state.checkedValues,
            checkAll: true,
        })
            .then(res => {
                console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    questionnaires.push(donne);
                });
                this.setState({questionnaires},);
                console.log(this.state);
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
                <h1>Historique des QCM</h1>

                <div id={"selection"}>
                    <div className="site-checkbox-all-wrapper">
                        <Checkbox class={"chbox"}
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
                    <thead  >
                    <tr>
                        <th>N° Questionnaire</th>
                        <th>Date</th>
                        <th>Thème</th>
                        <th>Difficulté</th>
                        <th>Score</th>
                    </tr>

                    </thead>
                    <tbody>



                    {this.state.questionnaires.map(question => <AffichHistoQ key={question.id_qn}
                                                                             id_qn={question.id_qn}
                                                                             difficulte={question.difficulte}
                                                                             num_theme={question.num_theme}
                                                                             theme={question.theme}
                                                                             date={question.date}
                                                                             score={question.score}
                                                                       reloadQuest={this.reloadHisto2}/>)}





                    </tbody>

                </table>

            </div>
        );
    }
}
