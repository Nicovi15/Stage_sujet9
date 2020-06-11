import React, {Component} from 'react'
import axios from 'axios';
import {Button} from 'react-bootstrap'
import '../design/inscrption.scss'

function Resultat(props) {
    const reussite = props.reussite;
    if (reussite) {
        return <h6>Votre compte a été créé, vous pouvez maintenant vous connecter.</h6>
    }
    return <></>;
}

function Confirm(props) {
    const confirm = props.confirm;
    if (!confirm) {
        return <h6>Les deux mots de passe ne correspondent pas.</h6>
    }
    else{

        return <></>;
    }

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
            confirm : true,
            valide : false,
            promos : [],
            promo : "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        var promos = [];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getpromo.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne => {
                    promos.push(donne.libelle);
                });
                this.setState({promos},);
                this.setState({promo: this.state.promos[0]},)
            })
        //console.log(this.state.theme);
    }

    handleSubmit(event){
       /* var donnees = new FormData();
        donnees.set("pseudo", this.state.pseudo);
        donnees.set("nom", this.state.nom);
        donnees.set("prenom", this.state.prenom);
        donnees.set("email", this.state.email);
        donnees.set("mdp", this.state.mdp);*/
       if(this.state.mdp === this.state.mdp_confirm){
           axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/inscrire2.php",
               {
                   pseudo : this.state.pseudo,
                   nom : this.state.nom,
                   prenom : this.state.prenom,
                   email : this.state.email,
                   mdp : this.state.mdp,
                   promo : this.state.promo,
               },
               {withCredentials: true}
           ).then(response => {
               if ( response.data.error ) {
                   console.log(response.data.error)
                   this.setState({erreur :response.data.error})
               }
               else {
                   console.log(response.data);
                   if(response.data.status === "Succes") console.log("yes "+response.data);
                   //this.handleSuccessfulAuth(response.data.user);
                   //this.props.history.push("/");
                   this.setState({
                       r : true,
                       confirm : true,
                   });
               }
           })
           event.preventDefault();
       }
       else {
           this.setState({
               confirm : false,
           });
           event.preventDefault();
           return false;
       }

    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        return (
            <div id={"inscription"}>
                <br/>
                <h1>Inscription</h1>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <p>Pseudonyme : <br/><input type="text" name ="pseudo" placeholder="Entrez un pseudo" value={this.state.pseudo} onChange={this.handleChange} required />  </p>
                    <p>Nom : <br/><input type="text" name ="nom" placeholder="Entrez vote nom" value={this.state.nom} onChange={this.handleChange} required /></p>
                    <p>Prénom : <br/><input type="text" name ="prenom" placeholder="Entrez vote prénom" value={this.state.prenom} onChange={this.handleChange} required /> </p>
                    <p>Promotion : <br/>
                    <select name="promo" value={this.state.promo} style={{width: 120}}
                            onChange={this.handleChange}>
                        {this.state.promos.map(promo => <option key={promo} value={promo}>{promo}</option>)}
                    </select>
                    </p>
                    <p>Email :<br/><input type="email" name ="email" placeholder="Entrez vote adresse email" value={this.state.email} onChange={this.handleChange} required /> </p>
                    <p>Mot de passe : <br/><input type="password" name ="mdp" placeholder="Entrez vote mot de passe" value={this.state.mdp} onChange={this.handleChange} required /> </p>
                    <p>Confirmer votre mot de passe : <br/><input type="password" name ="mdp_confirm" placeholder="Entrez vote mot de passe" value={this.state.mdp_confirm} onChange={this.handleChange} required /> </p>
                    <Confirm confirm = {this.state.confirm}/>
                    <br/>
                    <Button  type="submit">S'inscrire</Button>
                    <p>{this.state.erreur}</p>
                </form>

                <Resultat reussite={this.state.r} />


            </div>
        );
    }


}
