import React, {Component} from 'react'
import axios from "axios";
import AffichQuest from "../components/AffichQuest";
import QCMQuestion from "../components/QCMQuestion";
import {useParams} from 'react-router-dom';
import '../design/questionnaire.scss'
import {Button} from 'antd';


function Resultat(props) {
    if (!props.actif) {
        return <h6>Résultat : {props.res}/10</h6>
    }
    return null;
}

function Bstart(props) {
    if (!props.start)
        return (
            <Button onClick={props.oc}>Commencer</Button>)

    else return null;
}

export default class Questionnaire extends Component {


    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            qchoisies: [],
            actif: true,
            br: 0,
            commencer: false,
            test: false,
        };


        this.setRes = this.setRes.bind(this);
        this.verif = this.verif.bind(this);
        this.checkid = this.checkid.bind(this);
        this.loadQuestion = this.loadQuestion.bind(this);
    }

    checkid(checkExist) {
        if (this.props.dif != null) {
            console.log("Exists!");
            clearInterval(checkExist);
        } else console.log(this.props.dif)
    }

    setRes(index, res) {
        {
            this.state.qchoisies.map(question => {
                if (index === question.index) {
                    question.res = res;
                }
            })
        }
        ;
    }

    async loadQuestion() {
        if (this.props.dif != null) {
            var questions = [];
            var qchoi = [];
            var qchoisies = [];
            await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getquestions3.php", {
                theme: this.props.id,
                dif: this.props.dif,
            })
                .then(res => {
                    // console.log(res);
                    // console.log(res.data);
                    res.data.map(donne => {
                        questions.push(donne);
                    });
                    this.setState({questions},);
                    //console.log(this.state);
                })

            var theme = [];
            await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getTheme.php")
                .then(res => {
                    // console.log(res);
                    // console.log(res.data);
                    res.data.map(donne => {
                        theme.push(donne.libelle);
                    });
                    this.setState({theme});
                })
            var max = 10;
            if (questions.length < max) max = questions.length;
            for (var i = 0; i < max; i++) {
                var element = questions[Math.floor(Math.random() * questions.length)];
                while (qchoi.includes(element)) {
                    element = questions[Math.floor(Math.random() * questions.length)];
                }
                qchoi.push(element);
            }
            var i = 0;
            qchoi.map(q => {
                qchoisies.push({question: q, index: i, res: false});
                i++;
            });
            this.setState({qchoisies});
            this.setState({commencer: true});


            console.log(this.state);
        }
    }


    verif() {
        var br = 0;
        {
            this.state.qchoisies.map(question => {
                if (question.res) br++;
            })
        }
        ;
        this.setState({
            actif: false,
            br: br
        });
        console.log(this.state);

        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/ajoutquestionnaire.php", {
            num_uti: this.props.user.num_uti,
            theme: this.props.id,
            dif: this.props.dif,
            score: br,
        })
            .then(res => {
                console.log(res);
                // console.log(res.data);

            });
        this.setState({test: true,});
    }

    async componentDidMount() {
        this.setState({
            id: this.props.id,
            dif: this.props.dif,
        });
    }


    render() {
        return (
            <div id={"questHaut"}>
                <h1>Questionnaire {this.props.id}</h1>
                <h2>Difficulte {this.props.dif}</h2>

                <div id={"Bstart"}>
                    <Bstart start={this.state.commencer} oc={this.loadQuestion}/>
                </div>

                <div id={"qcmQ"}>
                    {this.state.qchoisies.map(question => <><QCMQuestion info={question.question} index={question.index}
                                                                         setRes={this.setRes} actif={this.state.actif}/><br/></>)}
                </div>
                <div id={"verifRes"}>
                    <Button onClick={this.verif} hidden={!this.state.commencer}
                            disabled={this.state.test}>Verifier</Button>
                    <Resultat actif={this.state.actif} res={this.state.br}/>
                </div>
            </div>

        );
    }
}
