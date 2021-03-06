import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import {Button} from 'antd'
import axios from "axios";
import '../design/ajoutQ.scss'


function ListeChampBR(props) {
    if (props.nbr == 1)
        return <p><input type="text" name="BRep1" placeholder="Entrez la réponse"
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
        return <p><input type="text" name="MRep1" placeholder="Entrez la réponse "
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
        return <><p><input type="text" name="MRep1" placeholder="Entrez la réponse "
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
    const reussite = props.reussite;
    if (echec && (!(reussite))) {
        return <h6>La question existe déjà.</h6>
    } else {
        return <></>;
    }

}


export default class AjoutQuestion extends Component {

    UPLOAD_ENDPOINT = 'https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/upload.php';


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
            file: "null",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    async componentWillMount() {
        var themes = [];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getTheme.php")
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

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file)

        return await axios.post(this.UPLOAD_ENDPOINT, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault()
        let res = await this.uploadFile(this.state.file);
        console.log(res);
        if (res.data.status === "success" && (!(res.data.status === "error"))) {
            this.setState({
                success: true,
                echec: false,
            })
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
                    url_image: res.data.url_fichier,
                },
                {withCredentials: true}
            ).then(response => {
                if (response.data.error) {
                    console.log(response.data.error)
                    this.setState({
                        echec: true,
                        reussite: false,
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

                        file: null,
                    });
                }
                this.props.reload();
            })
        } else {
            this.setState({
                success: false,
                echec: true,
            })
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
                    url_image: "null",
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
                        echec:false,
                        file: null,
                    });
                }
                this.props.reload();
            })
        }
    }

    handleChange(event) {
        console.log("value ", event.target.value);
        console.log("name ", event.target.name);
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
            <div id={"ajoutQ"}>
                <h1>Ajout d'une question</h1>
                <br/>
                <form onSubmit={this.handleSubmit}>

                    <div id={"tabl"}>
                        <table>
                            <thead>
                            <tr>
                                <th>Question</th>
                                <th>Image (optionnel)</th>

                                <th>Thème</th>
                                <th>Difficulté</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                            <textarea type="text" name="libelle" placeholder="Entrez une question"
                                      value={this.state.libelle} onChange={this.handleChange} required/>
                                </td>
                                <td>
                                    <input id={"img"} type="file" onChange={this.onChange}/>
                                </td>


                                <td>
                                    <select name="theme" value={this.state.theme} style={{width: 120}}
                                            onChange={this.handleChange}>
                                        {this.state.themes.map(theme => <option key={theme}
                                                                                value={theme}>{theme}</option>)}
                                    </select>
                                </td>

                                <td>
                                    <select name="difficulte" value={this.state.difficulte} style={{width: 120}}
                                            onChange={this.handleChange}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <div id={"butt"}><br/>
                        <table id={"nbrep"}>
                            <thead>
                            <tr>
                                <th>Nombre de bonnes réponses</th>
                                <th>Bonne réponse</th>
                                <th>Nombre de mauvaises réponses</th>
                                <th> Mauvaise réponse</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
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
                                    <ListeChampBR nbr={this.state.nb_br} value={this.state}
                                                  onChange={this.handleChange}/>
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
                                    <ListeChampMR nbr={this.state.nb_mr} value={this.state}
                                                  onChange={this.handleChange}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <Button id={"valid"} htmlType="submit">Valider l'ajout</Button>
                    <Resultat reussite={this.state.reussite}/>
                    <Echec echec={this.state.echec}/>


                </form>
                <br/>




            </div>
        );
    }
}
