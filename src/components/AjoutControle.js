import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import axios from "axios";
import {Select} from 'antd';
import '../design/ajoutQ.scss'
import 'moment-timezone';
const { RangePicker } = DatePicker;
const {Option} = Select;

function Resultat(props) {
    const reussite = props.reussite;
    if (reussite) {
        return <h6>Un nouveau contrôle est prévu.</h6>
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


export default class AjoutControle extends Component {


    constructor(props) {
        super(props);

        this.state = {
            duree : 0,
            datetime : null,
            difficulte : 1,
            themes: [],
            theme: "",
            reussite: false,
            echec: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onOk = this.onOk.bind(this);
    }

    async componentDidMount() {
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

    handleSubmit(event) {
        console.log(this.state)
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/ajoutControle.php",
            {
                duree : this.state.duree,
                datetime : this.state.datetime,
                difficulte : parseInt(this.state.difficulte),
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
                    duree : 0,
                    datetime : null,
                    difficulte : 1,
                    theme: "",
                    reussite: true,
                });
            }
        })
        event.preventDefault();
    }

    onChange(value, dateString) {
        //console.log('Selected Time: ', value);
        //console.log('Formatted Selected Time: ', dateString);
    }

    onOk(value) {
        this.setState({datetime : value.toDate()})
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
            <div id={"ajoutQ"}>
                <h1>Prévoir un controle</h1>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <thead>
                        <tr>
                            <th>Thème :</th>
                            <th>Difficulté</th>
                            <th>Durée (en min)</th>
                            <th>Date et Heure</th>
                            <th>Valider</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr >
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
                                <input type="text" name="duree" placeholder="Entrez une durée en minutes"
                                       value={this.state.duree} onChange={this.handleChange} required/>
                            </td>
                            <td>
                                <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />
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
