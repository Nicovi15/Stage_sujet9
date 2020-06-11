import React, {Component} from 'react'
import {HashRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button, Table } from 'antd';
import AffichQuest from "./AffichQuest";
import { Radio } from 'antd';
import { Checkbox } from 'antd';
import '../design/selectCont.scss'
import TaskDetails2 from "./TaskDetails2";

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;


export default class SelecCont extends Component {


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

    addMinutes(date,minutes){
        return new Date(date.getTime() + minutes*60000);
    }

    affiCont(cont){
        //console.log(typeof cont.datetime);
        var dateNow = Date.now();
        var date = new Date(cont.datetime);
        var dateDeb = new Date(cont.datetime);
        var dateFin = this.addMinutes(dateDeb,cont.temps);
        //console.log("res "+date+" de type "+typeof date)
        if(date<Date.now()) console.log(date + "est déjà passé");
        if(date>Date.now())console.log(date + "n'est pas encore passé");
        console.log("Date + 5 minutes => " + this.addMinutes(date,5));

        if(dateFin>dateNow){
            return <tr>
                <td>{cont.num_cont}</td>
                <td>{cont.theme}</td>
                <td>{cont.difficulte}</td>
                <td>{cont.temps}</td>
                <td>{cont.datetime}</td>
                <td>
                <Router><Link to={"/controle/"+cont.num_cont}><Button disabled={!((dateDeb<dateNow)&&(dateFin>dateNow))} >Participer</Button></Link><Switch>
                    <Route path="/controle/:id" children={<TaskDetails2/>} />
                </Switch></Router>
                </td>

            </tr>
        }
        else return <></>

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


    async componentDidMount(){
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


    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <div id={"selectCont"}>
                <h1>Liste des contrôles</h1>

                <table border="1px" >
                    <thead  >
                    <tr>
                        <th>Num Controles</th>
                        <th>Thème</th>
                        <th>Difficulté</th>
                        <th>Durée</th>
                        <th>Date</th>
                        <th></th>
                    </tr>

                    </thead>
                    <tbody>
                    {this.state.controles.map(cont => this.affiCont(cont))}
                    </tbody>

                </table>

            </div>
        );
    }
}
