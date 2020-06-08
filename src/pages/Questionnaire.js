import React, {Component} from 'react'
import axios from "axios";
import AffichQuest from "../components/AffichQuest";
import QCMQuestion from "../components/QCMQuestion";

export default class Questionnaire extends Component {


    constructor(props) {
        super(props);
        this.state={
            questions : [],
            qchoisies : [],


        }


    }

    async componentDidMount(){
        var questions=[];
        var qchoi =[];
        var qchoisies = [];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getquestions.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    questions.push(donne);
                });
                this.setState({questions},);
                //console.log(this.state);
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

        for(var i=0; i<3; i++){
            var element = questions[Math.floor(Math.random()*questions.length)];
            while (qchoi.includes(element)){
                element = questions[Math.floor(Math.random()*questions.length)];
            }
            qchoi.push(element);
        }
        var i = 0;
        qchoi.map(q =>{
            qchoisies.push({question : q, index : i, res:false});
            i++;
        });
        this.setState({qchoisies});


        //console.log(this.state.theme);
    }


    render() {
        return (
            <div>
                <h1>C'est la page d'un questionnaire</h1>
                <div>
                    {this.state.qchoisies.map(question => <QCMQuestion info={question.question} index={question.index}/>)}
                </div>
            </div>
        );
    }
}
