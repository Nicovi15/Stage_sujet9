import React, {Component} from 'react'
import axios from 'axios';

function Resultat(props) {
    const reussite = props.reussite;
    if (reussite) {
        return <h6>Votre compte a été créé, vous pouvez maintenant vous connecter.</h6>
    }
    return <></>;
}



export default class Inscription extends Component{

    constructor(props) {
        super(props);


        this.state = {
            pseudo: "",
            nom: "",
            prenom: "",
            mdp: "",
            mdp_confirm: "",
            erreur: "",
            r : false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
       /* var donnees = new FormData();
        donnees.set("pseudo", this.state.pseudo);
        donnees.set("nom", this.state.nom);
        donnees.set("prenom", this.state.prenom);
        donnees.set("email", this.state.email);
        donnees.set("mdp", this.state.mdp);*/
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/inscrire.php",
            {
                pseudo : this.state.pseudo,
                nom : this.state.nom,
                prenom : this.state.prenom,
                email : this.state.email,
                mdp : this.state.mdp,
            },
            {withCredentials: true}
            ).then(response => {
            if ( response.data.error ) {
                console.log(response.data.error) // I show error here
            }
            else {
                console.log(response.data);
                if(response.data.status === "Succes") console.log("yes "+response.data);
                    //this.handleSuccessfulAuth(response.data.user);
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


    render() {
        return (
            <div>
                <h1>Inscription</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name ="pseudo" placeholder="Entrez vote pseudo" value={this.state.pseudo} onChange={this.handleChange} required /> <br/>
                    <input type="text" name ="nom" placeholder="Entrez vote nom" value={this.state.nom} onChange={this.handleChange} required /> <br/>
                    <input type="text" name ="prenom" placeholder="Entrez vote prénom" value={this.state.prenom} onChange={this.handleChange} required /> <br/>
                    <input type="email" name ="email" placeholder="Entrez vote adresse email" value={this.state.email} onChange={this.handleChange} required /> <br/>
                    <input type="password" name ="mdp" placeholder="Entrez vote mot de passe" value={this.state.mdp} onChange={this.handleChange} required /> <br/>
                    <input type="password" name ="mdp_confirm" placeholder="Entrez vote mot de passe" value={this.state.mdp_confirm} onChange={this.handleChange} required /> <br/>

                    <button type="submit">S'inscrire</button>
                </form>

                <Resultat reussite={this.state.r} />


            </div>
        );
    }


}
