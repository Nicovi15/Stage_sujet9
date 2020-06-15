import React, {Component} from 'react'
import axios from "axios";
import 'antd/dist/antd.css';
import {Checkbox} from "antd";
import '../design/qcm.scss'


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function Resultat(props) {
    if (!props.actif) {
        if(props.res) return <p>Correct !</p>
        else return <p>Faux !</p>
    }
    return <></>;
}

function Correction(props) {
    if (!props.actif) {
        if(!props.res) return <div>Correction :
            <ul>
                {props.reponses.map(rep =>{
                    console.log(rep.valeur);
                    if(rep.value.valeur == "bonne")
                    return <li>{rep.label}</li>
                    else return <></>
                })}

            </ul>

        </div>

    }
    return <></>;
}


export default class QCMQuestion extends Component {


    constructor(props) {
        super(props);
        this.state={
            reponses :[],
            info : [],
            checkedValues: [],
            indeterminate: true,
            checkAll: false,
            nb_br_checked : 0,
            nb_mr_checked : 0,
            res:false,
        }

        this.onChange = this.onChange.bind(this);
        this.verif = this.verif.bind(this);

    }

    onChange(checkedValues) {
        console.log(checkedValues);
        this.setState({
            /*indeterminate: !!checkedValues.length && checkedValues.length < this.state.theme.length,
            checkAll: checkedValues.length === this.state.theme.length,*/
            checkedValues,
        },()=>this.props.setRes(this.props.index, this.verif()));
        //this.reloadQuest2();
    }

    verif(){
        var nb_br_c = 0;
        var nb_mr_c = 0;
        this.state.checkedValues.map(donne =>{
            if(donne.valeur == "mauvaise") nb_mr_c++;
            else if (donne.valeur == "bonne") nb_br_c++;
        });
        console.log(this.props.info.nb_bonnerep);
        console.log(nb_br_c);
        if((nb_br_c == this.props.info.nb_bonnerep) && (nb_mr_c == 0)){
            this.setState({res:true});
            return true;
        }
        else {
            this.setState({res:false});
            return false;
        }

    }

    async componentDidMount(){
        var reponses=[];
        await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getreponses.php",{
            num_quest : this.props.info.num_quest
        })
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    reponses.push({label: donne.libelle,
                                   value: {num:donne.num_rep, libelle:donne.libelle, valeur:donne.valeur},
                    });
                });
                shuffle(reponses);
                this.setState({reponses},);
                console.log(this.state);
            });
        this.setState({
            info:this.props.info,
        })
        //console.log(this.state.theme);
    }


    render() {
        return (
            <div id={"qcm"}>
                <p>N°{this.props.index+1}) {this.state.info.libelle}</p>
                <Resultat actif={this.props.actif} res={this.state.res}/>
                <div id = {"chbox"}>
                    <Checkbox.Group
                                    options={this.state.reponses}
                                    onChange={this.onChange}
                                    disabled={!this.props.actif}
                    />
                    <Correction actif={this.props.actif} res={this.state.res} reponses={this.state.reponses}/>
                </div>

            </div>
        );
    }
}
/*{this.state.reponses.map(rep => <label>
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                    {rep.label} : {rep.valeur}
                </label>)}*/
