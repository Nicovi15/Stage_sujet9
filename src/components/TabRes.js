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


export default class TabRes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            controles : [],
            theme:[],
            difficulte:[1,2,3],
            checkedValues: [],
            indeterminate: true,
            checkAll: false,
        }
        this.onChange = this.onChange.bind(this);
        this.reloadQuest2 = this.reloadQuest2.bind(this);
        this.affiState = this.affiState.bind(this);
        this.handleDeleteB = this.handleDeleteB.bind(this);

    }

    affiState (){
        console.log(this.state);
        this.reloadQuest2();
    }

    reloadQuest2 (){
        var controles=[];
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getcontroles.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    controles.push(donne);
                });
                this.setState({controles},);
                console.log(this.state);
            })
    }



    onChange2 = checkedList => {
        this.setState({
            indeterminate: !!checkedList.length && checkedList.length < this.state.theme.length,
            checkAll: checkedList.length === this.state.theme.length,
            checkedList,
        });
        console.log(this.state.checkedList);
    };

    onChange(checkedValues) {
        this.setState({
            indeterminate: !!checkedValues.length && checkedValues.length < this.state.theme.length,
            checkAll: checkedValues.length === this.state.theme.length,
            checkedValues,
        });
        //this.reloadQuest2();


    }

    handleDeleteB(num_cont){
        if(window.confirm(("Voulez vraiment supprimer le controle n°" + num_cont+" ?"))){
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/supprCont.php",
                {
                    num_cont : num_cont,
                },
                {withCredentials: true}
            ).then(response => {
                if ( response.data.error ) {
                    console.log(response.data.error)
                    this.setState({
                        echec : true,
                    })
                }
                else {
                    console.log(response.data);
                    if(response.data.status === "Succes") console.log("yes "+response.data);
                    //this.handleSuccessfulAuth(response.data.user);
                    //this.props.history.push("/");
                    this.reloadQuest2();
                }
            });


        }
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
        var controles=[];
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getresbyid.php",{
            num_cont : this.props.num_cont,
        })
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    controles.push(donne);
                });
                this.setState({controles},);
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
                <h1>Résultats du contrôle N°{this.props.num_cont}</h1>

                <table border="1px" >
                    <thead  >
                    <tr>
                        <th>Num Uti</th>
                        <th>Pseudo</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Score</th>
                    </tr>

                    </thead>
                    <tbody>

                    {this.state.controles.map(cont => <tr>
                        <td>{cont.num_uti}</td>
                        <td>{cont.pseudo}</td>
                        <td>{cont.nom}</td>
                        <td>{cont.prenom}</td>
                        <td>{cont.score}/10</td>
                    </tr>)}
                    </tbody>

                </table>

            </div>
        );
    }
}