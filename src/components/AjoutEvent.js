import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import {Button} from 'antd'
import 'antd/dist/antd.css';
import axios from "axios";
import '../design/ajoutEvent.scss'

function Resultat(props) {
    const reussite = props.reussite;
    if (reussite) {
        return <h6>L'événement à été ajouté à la base de données.</h6>
    }
    return <></>;
}

function Echec(props) {
    const echec = props.echec;
    if (echec) {
        return <h6>L'événement existe déjà.</h6>
    } else {
        return <></>;
    }
}

export default class AjoutEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            libelle: "",
            titre: "",
            reussite: false,
            echec: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        //console.log(this.state)
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~barros4u/PHP/ajoutEvenements.php",
            {
                libelle: this.state.libelle,
                titre: this.state.titre
            },
            {withCredentials: true}
        ).then(response => {
            if (response.data.error) {
                console.log(response.data.error)
                this.setState({
                    echec: true,
                })
            } else {
                console.log(response.data);
                if (response.data.status === "Succes") console.log("yes " + response.data);
                //this.handleSuccessfulAuth(response.data.user);
                //this.props.history.push("/");
                this.setState({
                    libelle: "",
                    titre: "",
                    reussite: true,
                });
                this.props.reload();
            }
        })
        event.preventDefault();
    }

    handleChange(event) {
        //console.log("value ",event.target.value);
        //console.log("name ",event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        })
        this.setState({
            reussite: false,
            echec: false,
        })
    }

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <div id={"ajoutE"}>
                <h1>Ajout d'un événement</h1>
                <br/>
                <form onSubmit={this.handleSubmit}>

                    <p>Titre : <br/>
                    <input type="text" name="titre" placeholder="Entrez un titre"
                           value={this.state.titre} onChange={this.handleChange} required/></p>
                    <br/>
                    <p>Contenu : <br/>
                    <textarea type="text" name="libelle" placeholder="Entrez l'événement"
                              value={this.state.libelle} onChange={this.handleChange} required/></p>
                    <br/>
                    <Button htmlType="submit">Valider l'ajout</Button>


                </form>
                <br/>
                <Resultat reussite={this.state.reussite}/>
                <Echec echec={this.state.echec}/>
            </div>
        );
    }
}
