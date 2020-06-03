import React, {Component} from 'react'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import axios from "axios";

function Resultat(props) {
    const reussite = props.reussite;
    if (reussite) {
        return <h6>Connecté</h6>
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
                console.log(response.data.error) // I show error here
            }
            else {
                console.log(response.data);
                if(response.data.status === "Succes"){
                    console.log("yes "+response.data);
                    this.handleSuccessfulAuth(response.data.user);
                }
                //this.props.history.push("/");
                this.setState({
                    r : true,
                });
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

    render() {
        return(
            <div>
                <h1> Connexion </h1>
                <h1>Status : {this.props.loggedInStatus}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name ="pseudo" placeholder="Entrez vote pseudo" value={this.state.pseudo} onChange={this.handleChange} required /> <br/>
                    <input type="password" name ="mdp" placeholder="Entrez vote mot de passe" value={this.state.mdp} onChange={this.handleChange} required /> <br/>

                    <button type="submit">Se connecter</button>
                </form>

                <Resultat reussite={this.state.r} />
                <Route>Pas de compte ? <Link to="/inscription">Inscrivez-vous !</Link></Route>
                <br/>
                <button onClick={()=>this.handleLogoutClick()}>Se déconnecter</button>

            </div>
        );
    }
}
