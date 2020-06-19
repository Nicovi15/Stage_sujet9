import React, {Component} from 'react'
import axios from "axios";
import QCMQuestion from "../components/QCMQuestion";
import {Button} from 'antd';
import { Statistic, Row, Col } from 'antd';
import '../design/questionnaire.scss'

const { Countdown } = Statistic;


function Resultat(props) {
    if (!props.actif) {
        return <h5>Vos réponses ont été enregistrées.</h5>
    }
    return <></>;
}

function Bstart(props){
    if(!props.start )
        return <Button onClick={props.oc}>Commencer</Button>;
    else if(props.statut==="pasbon") return <h4>Vous avez déjà réalisé ce controle.</h4>
    else return <></>;
}

function Bverif(props) {
    if(!props.hidden && (props.statut === "pasbon")){
        return <></>
    }
    else if(!props.hidden){
        return <button onClick={props.onClick} hidden={props.hidden} disabled={props.disabled} >Verifier</button>
    }
    else return <></>

}

function Timer(props) {
    if(!props.hidden && (props.statut === "pasbon")){
        return <></>
    }
    else if(!props.hidden && (!props.actif)){
        return <></>
    }
    else if(!props.hidden){
      //  console.log("value " +props.value )
        return <Countdown title="Temps restant :" value={Date.now() + props.value * 1000 * 60} onFinish={props.onFinish}  />
    }
    else return <></>
}

export default class Controle extends Component {

    constructor(props) {
        super(props);
        this.state={
            questions : [],
            qchoisies : [],
            actif : true,
            br : 0,
            commencer: false,
            test: false,
            dif:null,
            duree:0,
            th:"",
            statut : "",
            theme : [],
        };
        this.setRes = this.setRes.bind(this);
        this.verif = this.verif.bind(this);
        this.checkid = this.checkid.bind(this);
        this.loadQuestion = this.loadQuestion.bind(this);
    }

    checkid(checkExist){
        if (this.props.dif != null) {
            //console.log("Exists!");
            clearInterval(checkExist);
        }
        else console.log(this.props.dif)
    }

    setRes(index,res){
        {this.state.qchoisies.map(question => {
            if(index === question.index){
                question.res = res;
            }
        })};
    }


    async loadQuestion(){
        var statut ="";
        var th = null;
        var controle = [];
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/testcont.php",
            {
                num_uti : this.props.user.num_uti,
                num_cont : this.props.id,
            },
            {withCredentials: true}
        ).then(response => {
            if ( response.data.statut ) {
                statut = "bon";
                this.setState({statut : "bon"});
            }
            else {
                statut="pasbon"
                this.setState({statut : "pasbon"});
            }
        });
        await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getcontrolebyid.php", {
            id: this.props.id,
        })
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne => {
                    controle = donne;
                    this.setState({controle: donne},);
                });
              //  console.log(this.state);
            })
        //console.log(controle.num_theme + controle.difficulte);
        var theme = [];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/gettheme.php")
            .then(res => {
                // console.log(res);
                 console.log(res.data);
                res.data.map(donne => {
                    theme.push(donne.libelle);
                    if(donne.num_theme == controle.num_theme) th=donne.libelle;
                });
                this.setState({theme});
            })
        this.setState({th : "de " +th,
            dif : parseInt(controle.difficulte),
            duree : parseInt(controle.temps),});
        if(statut === "bon") {
            var questions = [];
            var qchoi = [];
            var qchoisies = [];
            console.log(this.state.theme);
            console.log("theme choisi : " + th);
            await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getquestions3.php", {
                theme: th,
                dif: parseInt(controle.difficulte),
            })
                .then(res => {
                     //console.log(res);
                     console.log(res.data);
                    res.data.map(donne => {
                        questions.push(donne);
                    });
                    this.setState({questions},);
                    //console.log(this.state);
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


            console.log("yes"+this.state);
        }
        this.setState({commencer: true});
    }


    verif(){
        var br=0;
        var point = 1;
        if(this.props.id == "Général") point = 0.5;
        {
            this.state.qchoisies.map(question => {
                if (question.res) br += point;
            })
        }
        ;
        this.setState({actif : false,
            br : br});
      //  console.log(this.state);

        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/ajoutRescon.php",{
            num_uti : this.props.user.num_uti,
            num_cont : this.props.id,
            score : br,
        })
            .then(res => {
                //console.log(res);
                // console.log(res.data);

            });
        this.setState({test:true,});
    }

    async componentDidMount(){
        this.setState({id : this.props.id,
            dif : this.props.dif,});
    }


    render() {
        return (
            <div id={"questHaut"}>
                <h1>Controle N°{this.props.id} {this.state.th} </h1>
                <h2>Difficulte {this.state.dif}</h2>
                <div id={"verifRes"}>
                <Bstart start={this.state.commencer} statut={this.state.statut} oc={this.loadQuestion}/>
                <Timer hidden={!this.state.commencer}  statut={this.state.statut}  value={this.state.duree}  actif={this.state.actif} onFinish={this.verif}/>
                </div>
                <div id={"qcmQ"}>
                    {this.state.qchoisies.map(question => <><QCMQuestion info={question.question} index={question.index} setRes={this.setRes} actif={true}/><br/></>)}
                </div>
                <div id={"verifRes"}>
                <Bverif onClick={this.verif} hidden={!this.state.commencer} disabled={this.state.test} statut={this.state.statut} />
                {/*<button onClick={this.verif} hidden={!this.state.commencer} disabled={this.state.test} >Verifier</button>*/}
                <Resultat actif={this.state.actif} res={this.state.br}/>
                </div>
            </div>
        );
    }
}
