import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import AffichDEvent from "./AffichDEvent";

export default class AffichEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            evenements : [],
            afficheRep : false,
            modifier :false,
        }
        this.reloadEv2 = this.reloadEv2.bind(this);
        this.affiState = this.affiState.bind(this);
    }

    affiState (){
        console.log(this.state);
        this.reloadEv2();
    }

    reloadEv2(){
        var evenements=[];
        //console.log(this.state.checkedList);
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~barros4u/PHP/getEvenements.php",{
            //list : this.state.checkedList,
            //checkAll: this.state.checkAll,
        })
            .then(res => {
                // console.log(res);
                 console.log(res.data);
                res.data.map(donne =>{
                    evenements.push(donne);
                });
                this.setState({evenements},);
                console.log(this.state);
            })
    }

    reloadEv(){
        var evenements=[];
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~barros4u/PHP/getEvenements.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    evenements.push(donne);
                });
                this.setState({evenements},);
                console.log(this.state);
            })
    }
    
    async componentDidMount(){
        var evenements=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~barros4u/PHP/getEvenements.php")
            .then(res => {
                 console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    evenements.push(donne);
                });
                this.setState({evenements},);
                console.log(this.state);
            });
        }

    render(){
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }
        return(
            <div id={"affichEv"}>
                <h1>Liste des événements</h1>
            <table>
                <thead>
                    <tr>
                        <th>Num événement</th>
                        <th>Libelle</th>
                        <th>Titre</th>
                    </tr>
                </thead>
                <tbody>

                {this.state.evenements.map(evenements => <AffichDEvent key={evenements.no_ev}
                no_ev={evenements.no_ev}
                libelle={evenements.libelle}
                titre={evenements.titre}
                reloadEv={this.reloadEv2}/>)}
                
                </tbody>
            </table>
            </div>
        );
    }
}