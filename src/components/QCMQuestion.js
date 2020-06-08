import React, {Component} from 'react'
import axios from "axios";
import 'antd/dist/antd.css';
import AffichQuest from "../components/AffichQuest";
import {Checkbox} from "antd";
import AjoutQuestion from "./AjoutQuestion";


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


function ChoixRep(props){

        return <label>
            <input
                name="isGoing"
                type="checkbox"
                checked={this.state.isGoing}
                onChange={this.handleInputChange} />{}
        </label>
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


        }

        this.onChange = this.onChange.bind(this);

    }

    onChange(checkedValues) {
        console.log(checkedValues);
        this.setState({
            /*indeterminate: !!checkedValues.length && checkedValues.length < this.state.theme.length,
            checkAll: checkedValues.length === this.state.theme.length,*/
            checkedValues,
        });
        //this.reloadQuest2();


    }

    async componentDidMount(){
        var reponses=[];
        await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getreponses.php",{
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
            <div>
                <p>{this.state.info.libelle}</p>
                <Checkbox.Group
                    options={this.state.reponses}
                    onChange={this.onChange}
                />
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
