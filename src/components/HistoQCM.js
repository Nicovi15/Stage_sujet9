import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Checkbox } from 'antd';
import '../design/affichGen.scss'
import AffichHistoQ from "./AffichHistoQ";
import CanvasJSReact from '../assets/canvasjs.react';
import '../design/affichUti.scss'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class HistoQCM extends Component {


    constructor(props) {
        super(props);

        this.state = {
            questionnaires : [],
            theme:[],
            difficulte:[1,2,3],
            checkedValues: [],
            checkedList: [],
            indeterminate: true,
            checkAll: false,
            dataPoints : [],
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
        var dataPoints=[];
        var questionnaires=[];
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/gethistoeleve.php",{
            num_uti : this.props.user.num_uti,
            list : this.state.checkedList,
            checkAll: this.state.checkAll,
        })
            .then(res => {
                console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    questionnaires.push(donne);
                    dataPoints.push({x:new Date(donne.date),
                        y: parseFloat(donne.score),
                        theme : donne.theme,
                        dif : donne.difficulte,
                    })
                });
                this.setState({questionnaires},);
                this.setState({dataPoints},);
                console.log(this.state);
            })
    }



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

        var dataPoints=[];
        var questionnaires=[];
        await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/gethistoeleve.php",{
            num_uti : this.props.user.num_uti,
            list : this.state.checkedList,
            checkAll: true,
        })
            .then(res => {
                console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    questionnaires.push(donne);
                    dataPoints.push({x:new Date(donne.date),
                        y: parseFloat(donne.score),
                        theme : donne.theme,
                        dif : donne.difficulte,
                    })
                });
                this.setState({questionnaires},);
                this.setState({dataPoints},);
                console.log(this.state);
            })
        //console.log(this.state.theme);
    }


    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light", // "light1", "dark1", "dark2"
            title:{
                text: "Historique des scores"
            },
            axisY: {
                title: "Score",
                includeZero:true,
            },
            axisX: {
                title: "Date et heure",
                interval: 2,
                valueFormatString: "DD MMM YYYY H:m "
            },
            data: [{
                type: "line",
                yValueFormatString: "#0.00",
                toolTipContent: "{theme} {dif}: {y}/10",
                dataPoints: this.state.dataPoints,
            }]
        }
        return (
            <div id={"affichGen2"}>
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
                        value={this.state.checkedList}
                    />
                    <button onClick={this.affiState}>Rechercher</button>
                </div>
                <br />

                    <CanvasJSChart options = {options}
                        /* onRef={ref => this.chart = ref} */
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

                <br />
                <br />
                <div id={"divtabhisto"}>
                <table border="1px"  >
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

            </div>
        );
    }
}
