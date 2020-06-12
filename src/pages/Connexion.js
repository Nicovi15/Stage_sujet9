import React, {Component} from 'react'
import {Link, Redirect, Route,} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import axios from "axios";

import "../design/connexion.scss"

function Resultat(props) {
    const reussite = props.reussite;
    if (reussite) {
        return <h6>Connecté</h6>
    }
    return <></>;
}

function Echec(props) {
    const echec = props.echec;
    if (echec) {
        return <h6>Login ou mot de passe incorrect.</h6>
    }
    return <></>;
}


export default class Connexion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            mdp: "",
            erreur: "",
            r : false,
            echec : false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSubmit(event){
        /* var donnees = new FormData();
         donnees.set("pseudo", this.state.pseudo);
         donnees.set("nom", this.state.nom);
         donnees.set("prenom", this.state.prenom);
         donnees.set("email", this.state.email);
         donnees.set("mdp", this.state.mdp);*/
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/connexion.php",
            {
                pseudo : this.state.pseudo,
                mdp : this.state.mdp,
            },
            {withCredentials: true}
        ).then(response => {
            if ( response.data.error ) {
                //console.log(response.data);
                this.setState({
                    echec : true,
                });
            }
            else {
                console.log(response.data);
                if(response.data.status === "Succes"){
                    console.log("yes "+response.data);
                    this.handleSuccessfulAuth(response.data.user);
                    this.setState({
                        r : true,
                    });
                }
                else{
                }
                //this.props.history.push("/");

            }
        })
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/dashboard");
    }

    handleLogoutClick(){
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/deconnexion.php", {withCredentials: true}).then(response =>{
        });
        this.props.handleLogout();
    }
    //<h1>Status:{this.props.loggedInStatus}</h1>
    //<button onClick={()=>this.handleLogoutClick()}>Se déconnecter</button>
    render() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/dashboard'/>;
        }

        return(
            <div id={"connexion"}>
                <h1> Se Connecter </h1>

                <form onSubmit={this.handleSubmit}>
                    <p id={"pconnex"}>Login : <br/><input type="text" name ="pseudo" placeholder="Entrez vote pseudo" value={this.state.pseudo} onChange={this.handleChange} required /></p>

                    <p id={"pconnex"}>Mot de passe : <br/><input type="password" name ="mdp" placeholder="Entrez vote mot de passe" value={this.state.mdp} onChange={this.handleChange} required /></p>
                    <br/>
                    <Button  type="submit">Se connecter</Button>

                </form>
                <Echec echec={this.state.echec}/>
                <Resultat reussite={this.state.r} />
                <br/>
                <p id={"pdc"}>
                    <Route>Pas de compte ? <Link to="/inscription">Inscrivez-vous !</Link></Route>
                </p>



                <br/>
            </div>
        );
    }
}
