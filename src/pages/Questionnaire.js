import React, {Component} from 'react'
import axios from "axios";
import QCMQuestion from "../components/QCMQuestion";
import '../design/questionnaire.scss'
import {Button, Menu, Progress} from 'antd';
import {HashRouter as Router, Link} from "react-router-dom";


function Resultat(props) {
    if (!props.actif) {
        return <div><h5>Résultat : {props.res}/10</h5> <br/> <p>Pour en savoir plus, rendez-vous sur la page des  <Router><Link to="/cours">cours</Link></Router> </p></div>
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
            messageNiv : "",
            exp : 0,
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
        this.props.update();
    }

    async loadQuestion() {
        if (this.props.user.niveau < this.props.dif) {
            //Affichage de la redirection
            return false;
        }

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
            if(this.props.id == "Général") max = 20;
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
        var point = 1;
        if(this.props.id == "Général") point = 0.5;
        {
            this.state.qchoisies.map(question => {
                if (question.res) br += point;
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
        if(this.props.dif === this.props.user.niveau){
            var points = br * 3;
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/ajoutexp.php", {
                num_uti: this.props.user.num_uti,
                points : points,
            })
                .then(res => {
                    console.log(res);
                    this.setState({messageNiv : "Vous avez gagné "+points+" points d'expérience et vous êtes maintenant Niveau " + res.data.niveau /*+ " ("+res.data.exp+"%)"*/});
                    this.setState({exp : res.data.exp})
                    // console.log(res.data);
                    this.props.update();
                });
            console.log("meme niveau");
        }
        else {
            this.setState({messageNiv : "Vous ne gagnez des points qu'en faisant des questionnaires de votre niveau."})
        }
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

                <div id={"verifRes"}>
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

                    <h5>{this.state.messageNiv}</h5>
                    <Progress id={"bar"} hidden={!((this.state.messageNiv!="")&&(this.state.messageNiv!="Vous ne gagnez des points qu'en faisant des questionnaires de votre niveau."))} percent={this.state.exp} status={"active"}  />
                </div>
            </div>

        );
    }
}
