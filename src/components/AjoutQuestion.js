import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button } from 'antd';
const { Option } = Select;


function ListeChampBR(props) {
    if(props.nbr == 1)
        return <p>Bonne Réponse 1 : <br/><input type="text" name ="BRep1" placeholder="Entrez une réponse" value={props.value.BRep1} onChange={props.onChange} required />  </p>;
    else if(props.nbr == 2)
        return <><p>Bonne Réponse 1 : <br/><input type="text" name ="BRep1" placeholder="Entrez une réponse" value={props.value.BRep1} onChange={props.onChange} required />  </p>
                <p>Bonne Réponse 2 : <br/><input type="text" name ="BRep2" placeholder="Entrez une réponse" value={props.value.BRep2} onChange={props.onChange} required />  </p>
                </>
    else if(props.nbr == 3)
        return <><p>Bonne Réponse 1 : <br/><input type="text" name ="BRep1" placeholder="Entrez une réponse" value={props.value.BRep1} onChange={props.onChange} required />  </p>
            <p>Bonne Réponse 2 : <br/><input type="text" name ="BRep2" placeholder="Entrez une réponse" value={props.value.BRep2} onChange={props.onChange} required />  </p>
            <p>Bonne Réponse 3 : <br/><input type="text" name ="BRep3" placeholder="Entrez une réponse" value={props.value.BRep3} onChange={props.onChange} required />  </p>
        </>
    else if(props.nbr == 4)
        return <><p>Bonne Réponse 1 : <br/><input type="text" name ="BRep1" placeholder="Entrez une réponse" value={props.value.BRep1} onChange={props.onChange} required />  </p>
            <p>Bonne Réponse 2 : <br/><input type="text" name ="BRep2" placeholder="Entrez une réponse" value={props.value.BRep2} onChange={props.onChange} required />  </p>
            <p>Bonne Réponse 3 : <br/><input type="text" name ="BRep3" placeholder="Entrez une réponse" value={props.value.BRep3} onChange={props.onChange} required />  </p>
            <p>Bonne Réponse 4 : <br/><input type="text" name ="BRep4" placeholder="Entrez une réponse" value={props.value.BRep4} onChange={props.onChange} required />  </p>
        </>
    else return <></>

}

function ListeChampMR(props) {
    if(props.nbr == 1)
        return <p>Mauvaise Réponse 1 : <br/><input type="text" name ="MRep1" placeholder="Entrez une réponse" value={props.value.MRep1} onChange={props.onChange} required />  </p>;
    else if(props.nbr == 2)
        return <><p>Mauvaise Réponse 1 : <br/><input type="text" name ="MRep1" placeholder="Entrez une réponse" value={props.value.MRep1} onChange={props.onChange} required />  </p>
            <p>Mauvaise Réponse 2 : <br/><input type="text" name ="MRep2" placeholder="Entrez une réponse" value={props.value.MRep2} onChange={props.onChange} required />  </p>
        </>
    else if(props.nbr == 3)
        return <><p>Mauvaise Réponse 1 : <br/><input type="text" name ="MRep1" placeholder="Entrez une réponse" value={props.value.MRep1} onChange={props.onChange} required />  </p>
            <p>Mauvaise Réponse 2 : <br/><input type="text" name ="MRep2" placeholder="Entrez une réponse" value={props.value.MRep2} onChange={props.onChange} required />  </p>
            <p>Mauvaise Réponse 3 : <br/><input type="text" name ="MRep3" placeholder="Entrez une réponse" value={props.value.MRep3} onChange={props.onChange} required />  </p>
        </>
    else if(props.nbr == 4)
        return <><p>Mauvaise Réponse 1 : <br/><input type="text" name ="MRep1" placeholder="Entrez une réponse" value={props.value.MRep1} onChange={props.onChange} required />  </p>
            <p>Mauvaise Réponse 2 : <br/><input type="text" name ="MRep2" placeholder="Entrez une réponse" value={props.value.MRep2} onChange={props.onChange} required />  </p>
            <p>Mauvaise Réponse 3 : <br/><input type="text" name ="MRep3" placeholder="Entrez une réponse" value={props.value.MRep3} onChange={props.onChange} required />  </p>
            <p>Mauvaise Réponse 4 : <br/><input type="text" name ="MRep4" placeholder="Entrez une réponse" value={props.value.MRep4} onChange={props.onChange} required />  </p>
        </>
    else return <></>
}

function optionTheme(props){
    return <option  value={props.libelle}>{props.libelle}</option>
}

function ListeTheme(props){
    /*
            const themes = props.themes;
            const listItems = themes.map((number) =>
                // Correct ! La clé doit être spécifiée dans le tableau.
                <option  key={number.num_theme} value={number.libelle}>{number.libelle}</option>);

            return <>
                <p>Thème : <br/>
                    <select name="nb_br"  style={{ width: 120 }} >
                        {listItems}
                    </select>
                </p> </>
                */
            return <></>
        }



export default class AjoutQuestion extends Component {


    constructor(props) {
        super(props);

        this.state = {
            value : "",
            libelle : "",
            nb_br : 1,
            BRep1 : "",
            BRep2 : "",
            BRep3 : "",
            BRep4 : "",
            nb_mr : 1,
            MRep1 : "",
            MRep2 : "",
            MRep3 : "",
            MRep4 : "",
            theme : "",
            themes : {},
            difficulte : "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get(`https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getTheme.php`)
            .then(res => {
                const themes = res.data;
                console.log("themes", themes);
                this.setState({
                    themes : themes,
                })
            });



    }

    handleSubmit(event){
        console.log(this.state)
        event.preventDefault();
    }

    handleChange(event){
        console.log("value ",event.target.value);
        console.log("name ",event.target.name);
        this.setState({
            [event.target.name]: event.target.value
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
                <h1>Ajout d'une question</h1>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <p>Labelle : <br/><input type="text" name ="libelle" placeholder="Entrez une question" value={this.state.libelle} onChange={this.handleChange} required />  </p>
                    <p>Nombre de bonnes réponses : <br/>
                        <select name="nb_br" value={this.state.nb_br} style={{ width: 120 }} onChange={this.handleChange}>
                            <option  value="0">0</option>
                            <option  value="1">1</option>
                            <option  value="2">2</option>
                            <option  value="3">3</option>
                            <option  value="4">4</option>
                        </select>
                    </p>
                    <ListeChampBR nbr={this.state.nb_br} value={this.state} onChange ={this.handleChange} />
                    <p>Nombre de mauvaises réponses : <br/>
                        <select name="nb_mr" value={this.state.nb_mr} style={{ width: 120 }} onChange={this.handleChange}>
                            <option  value="0">0</option>
                            <option  value="1">1</option>
                            <option  value="2">2</option>
                            <option  value="3">3</option>
                            <option  value="4">4</option>
                        </select>
                    </p>
                    <ListeChampMR nbr={this.state.nb_mr} value={this.state} onChange ={this.handleChange} />
                    <ListeTheme themes={this.state.themes}/>

                    <br/>
                    <button  type="submit">Valider l'ajout de la question</button>
                </form>
                <br/>

            </div>
        );
    }
}
