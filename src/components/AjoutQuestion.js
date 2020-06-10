import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import {Select, Button} from 'antd';
import '../design/ajoutQ.scss'

const {Option} = Select;


function ListeChampBR(props) {
    if (props.nbr == 1)
        return <p><input type="text" name="BRep1" placeholder="Entrez la réponse "
                                                value={props.value.BRep1} onChange={props.onChange} required/></p>;
    else if (props.nbr == 2)
        return <><p><input type="text" name="BRep1" placeholder="Entrez la réponse 1"
                                                  value={props.value.BRep1} onChange={props.onChange} required/></p>
            <p><input type="text" name="BRep2" placeholder="Entrez la réponse 2"
                                             value={props.value.BRep2} onChange={props.onChange} required/></p>
        </>
    else if (props.nbr == 3)
        return <><p><input type="text" name="BRep1" placeholder="Entrez la réponse 1"
                                                  value={props.value.BRep1} onChange={props.onChange} required/></p>
            <p><input type="text" name="BRep2" placeholder="Entrez la réponse 2"
                                             value={props.value.BRep2} onChange={props.onChange} required/></p>
            <p><input type="text" name="BRep3" placeholder="Entrez la réponse 3"
                                             value={props.value.BRep3} onChange={props.onChange} required/></p>
        </>
    else if (props.nbr == 4)
        return <><p><input type="text" name="BRep1" placeholder="Entrez la réponse 1"
                                                  value={props.value.BRep1} onChange={props.onChange} required/></p>
            <p><input type="text" name="BRep2" placeholder="Entrez la réponse 2"
                                             value={props.value.BRep2} onChange={props.onChange} required/></p>
            <p><input type="text" name="BRep3" placeholder="Entrez la réponse 3"
                                             value={props.value.BRep3} onChange={props.onChange} required/></p>
            <p><input type="text" name="BRep4" placeholder="Entrez la réponse 4"
                                             value={props.value.BRep4} onChange={props.onChange} required/></p>
        </>
    else return <></>

}

function ListeChampMR(props) {
    if (props.nbr == 1)
        return <p><input type="text" name="MRep1" placeholder="Entrez la réponse"
                                                   value={props.value.MRep1} onChange={props.onChange} required/></p>;
    else if (props.nbr == 2)
        return <><p><input type="text" name="MRep1" placeholder="Entrez la réponse 1"
                                                     value={props.value.MRep1} onChange={props.onChange} required/></p>
            <p><input type="text" name="MRep2" placeholder="Entrez la réponse 2"
                                                value={props.value.MRep2} onChange={props.onChange} required/></p>
        </>
    else if (props.nbr == 3)
        return <><p><input type="text" name="MRep1" placeholder="Entrez la réponse 1"
                                                     value={props.value.MRep1} onChange={props.onChange} required/></p>
            <p><input type="text" name="MRep2" placeholder="Entrez la réponse 2"
                                                value={props.value.MRep2} onChange={props.onChange} required/></p>
            <p><input type="text" name="MRep3" placeholder="Entrez la réponse 3"
                                                value={props.value.MRep3} onChange={props.onChange} required/></p>
        </>
    else if (props.nbr == 4)
        return <><p><input type="text" name="MRep1" placeholder="Entrez la réponse 1"
                                                     value={props.value.MRep1} onChange={props.onChange} required/></p>
            <p><input type="text" name="MRep2" placeholder="Entrez la réponse 2"
                                                value={props.value.MRep2} onChange={props.onChange} required/></p>
            <p><input type="text" name="MRep3" placeholder="Entrez la réponse 3"
                                                value={props.value.MRep3} onChange={props.onChange} required/></p>
            <p><input type="text" name="MRep4" placeholder="Entrez la réponse 4"
                                                value={props.value.MRep4} onChange={props.onChange} required/></p>
        </>
    else return <></>
}

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
    } else {
        return <></>;
    }

}


export default class AjoutQuestion extends Component {


    constructor(props) {
        super(props);

        this.state = {
            libelle: "",
            nb_br: "1",
            BRep1: "",
            BRep2: "",
            BRep3: "",
            BRep4: "",
            nb_mr: "1",
            MRep1: "",
            MRep2: "",
            MRep3: "",
            MRep4: "",
            themes: [],
            theme: "",
            difficulte: 1,
            reussite: false,
            echec: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        var themes = [];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getTheme.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne => {
                    themes.push(donne.libelle);
                });
                this.setState({themes},);
                this.setState({theme: this.state.themes[0]},)
            })
        //console.log(this.state.theme);
    }

    handleSubmit(event) {
        //console.log(this.state)
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/ajoutQuestion.php",
            {
                libelle: this.state.libelle,
                nb_bonnerep: this.state.nb_br,
                brep1: this.state.BRep1,
                brep2: this.state.BRep2,
                brep3: this.state.BRep3,
                brep4: this.state.BRep4,
                nb_mauvaiserep: this.state.nb_mr,
                mrep1: this.state.MRep1,
                mrep2: this.state.MRep2,
                mrep3: this.state.MRep3,
                mrep4: this.state.MRep4,
                difficulte: this.state.difficulte,
                theme: this.state.theme,
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
                    nb_br: "1",
                    BRep1: "",
                    BRep2: "",
                    BRep3: "",
                    BRep4: "",
                    nb_mr: "1",
                    MRep1: "",
                    MRep2: "",
                    MRep3: "",
                    MRep4: "",
                    theme: "",
                    difficulte: 1,
                    reussite: true,
                });
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

    handleChangeB

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <div id={"ajoutQ"}>
                <h1>Ajout d'une question</h1>
                <br/>
            <form onSubmit={this.handleSubmit}>


                <table>
                    <thead>
                    <tr>
                        <th>Labelle :</th>
                        <th>Nombre de bonnes réponses</th>
                        <th>Bonne réponse</th>
                        <th>Nombre de mauvaises réponses</th>
                        <th>Mauvaise réponse</th>
                        <th>Thème</th>
                        <th>Difficulté</th>
                        <th>valider</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr >
                        <td>
                            <input type="text" name="libelle" placeholder="Entrez une question"
                                   value={this.state.libelle} onChange={this.handleChange} required/>
                        </td>

                        <td>
                            <select name="nb_br" value={this.state.nb_br} style={{width: 120}}
                                    onChange={this.handleChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </td>

                        <td>
                            <ListeChampBR nbr={this.state.nb_br} value={this.state} onChange={this.handleChange}/>
                        </td>

                        <td>
                            <select name="nb_mr" value={this.state.nb_mr} style={{width: 120}}
                                    onChange={this.handleChange}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </td>

                        <td>
                            <ListeChampMR nbr={this.state.nb_mr} value={this.state} onChange={this.handleChange}/>
                        </td>

                        <td>
                            <select name="theme" value={this.state.theme} style={{width: 120}}
                                    onChange={this.handleChange}>
                                {this.state.themes.map(theme => <option key={theme} value={theme}>{theme}</option>)}
                            </select>
                        </td>

                        <td>
                            <select name="difficulte" value={this.state.difficulte} style={{width: 120}}
                                    onChange={this.handleChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>

                        <td>
                            <button type="submit">Valider l'ajout</button>
                        </td>



                    </tr>
                    </tbody>
                </table>

            </form>
                <br/>
                <Resultat reussite={this.state.reussite}/>
                <Echec echec={this.state.echec}/>



            </div>
        );
    }
}
