import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import {  Button } from 'antd';

import '../design/selectCont.scss'




export default class AffichGenCon extends Component {


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
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getcontroles.php")
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
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/supprCont.php",
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
                    //this.reloadQuest2();
                }
            });


        }
    }


    async componentDidMount(){
        var controles=[];
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getcontrolesavenir.php")
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
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getTheme.php")
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
                        <th>Supprimer</th>
                    </tr>

                    </thead>
                    <tbody>

                    {this.state.controles.map(cont => <tr>
                        <td>{cont.num_cont}</td>
                        <td>{cont.theme}</td>
                        <td>{cont.difficulte}</td>
                        <td>{cont.temps}</td>
                        <td>{cont.datetime}</td>
                        <td><Button onClick={()=>this.handleDeleteB(cont.num_cont)}>Supprimer</Button></td>

                    </tr>)}
                    </tbody>

                </table>

            </div>
        );
    }
}
