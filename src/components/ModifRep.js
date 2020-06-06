import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button } from 'antd';
const { Option } = Select;

function Resultat(props) {
    const reussite = props.reussite;
    if (reussite) {
        return <h6>La question, ainsi que ses réponses ont été ajoutées à la base de données.</h6>
    }
    return <></>;
}

function Echec(props) {
    const echec = props.echec;
    if (echec) {
        return <h6>La question existe déjà.</h6>
    }
    else{
        return <></>;
    }

}


export default class ModifRep extends Component {


    constructor(props) {
        super(props);

        this.state = {
            reussite : false,
            echec : false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        this.setState({
                num_rep : this.props.num_rep,
                libelle : this.props.libelle,
                valeur : this.props.valeur,
            }
        );

        //console.log(this.state.theme);
    }

    handleSubmit(event){
        //console.log(this.state)
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/modifRep.php",
            {
                num_quest : this.state.num_quest,
                libelle : this.state.libelle,
                difficulte : this.state.difficulte,
                theme : this.state.theme,
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
                this.setState({
                    libelle : "",
                    nb_br : "1",
                    BRep1 : "",
                    BRep2 : "",
                    BRep3 : "",
                    BRep4 : "",
                    nb_mr : "1",
                    MRep1 : "",
                    MRep2 : "",
                    MRep3 : "",
                    MRep4 : "",
                    theme : "",
                    difficulte : 1,
                    reussite : true,
                });
            }
        })
        event.preventDefault();
    }

    handleChange(event){
        //console.log("value ",event.target.value);
        //console.log("name ",event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        })
        this.setState({
            reussite : false,
            echec : false,
        })
    }

    handleChangeB

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <h1>Modifier</h1>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <p>Num_rep :
                        <input disabled={true} value={this.state.num_rep} style={{ width: 40}} />
                    </p>
                    <p>Labelle : <br/><input type="text" name ="libelle" placeholder="Entrez une question" value={this.state.libelle} onChange={this.handleChange} required />  </p>
                    <p>Valeur : <br/><input disabled={true} type="text" value={this.state.valeur} r/>  </p>



                    <br/>
                    <button  type="submit">Valider la modification</button>
                    <br/>
                    <Resultat reussite={this.state.reussite} />
                    <Echec echec={this.state.echec} />
                </form>
                <br/>

            </div>
        );
    }
}