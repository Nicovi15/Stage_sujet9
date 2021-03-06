import React, {Component} from 'react'
import 'antd/dist/antd.css';
import '../design/dashboardAdmin.scss'
import { Tabs, Button } from 'antd';
import AffichUti from "./AffichUti";
import GestionControle from "./GestionControle";
import AffichResCon from "./AffichResCon";
import axios from "axios";
const { TabPane } = Tabs;



export default class DashboardAdmin extends Component {


    constructor(props) {
        super(props);
        this.state = {
            theme:[],
            promo : [],
            inputpromo : "",
            reussitePromo : "",
            erreurPromo : "",
            inputTheme : "",
            reussiteTheme : "",
            erreurTheme : "",
            visible : "oui",
            donneTable:[],
        };

    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value,
            reussiteTheme : "",
            erreurTheme : "",
            reussitePromo : "",
            erreurPromo : "",
        })
    }

    reloadPromo=()=>{
        var promo=[];
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getpromo.php",)
            .then(res => {
                // console.log(res);
                //console.log(res.data);
                res.data.map(donne =>{
                    promo.push(donne);
                });
                this.setState({promo},);
              //  console.log(this.state);
            })
    }

    handleSubmitPromo=event=>{
      //  console.log("yes");
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/ajoutpromo.php",
            {
                promo : this.state.inputpromo,
            },
            {withCredentials: true}
        ).then(response => {
            if ( response.data.error ) {
                //console.log(response.data.error)
                this.setState({erreurPromo :response.data.error})
            }
            else {
                this.setState({
                    reussitePromo : response.data.succes
                });
                this.reloadPromo();
            }
        })
        event.preventDefault();

    }

    handleDeleteP=p=>{
        if(window.confirm(("Voulez vraiment supprimer la promo n°"+p.num_promo+" "+p.libelle+" ?"))){
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/supprpromo.php",
                {
                    num_promo : p.num_promo,
                },
                {withCredentials: true}
            ).then(response => {
                if ( response.data.error ) {
                    alert(response.data.error);
                }
                else {
                    this.reloadPromo();
                }
            });
        }
    }

    reloadTheme=()=>{
        var theme=[];
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getTheme.php",)
            .then(res => {
                // console.log(res);
                //console.log(res.data);
                res.data.map(donne =>{
                    theme.push(donne);
                });
                this.setState({theme});
                console.log(this.state);
            })
    }

    handleSubmitTheme=event=>{
        //console.log(this.state);
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/ajouttheme.php",
            {
                theme : this.state.inputTheme,
                visible : this.state.visible,
            },
            {withCredentials: true}
        ).then(response => {
            if ( response.data.error ) {
                console.log(response.data.error)
                this.setState({erreurTheme :response.data.error})
            }
            else {
                console.log(response);
                this.setState({
                    reussiteTheme : response.data.succes
                });
                this.reloadTheme();
            }
        })
        event.preventDefault();
        this.reloadTheme();
    }

    handleDeleteT=t=>{
        if(window.confirm(("Voulez vraiment supprimer la thème n°"+t.num_theme+" "+t.libelle+" ?"))){
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/supprtheme.php",
                {
                    num_theme: t.num_theme,
                },
                {withCredentials: true}
            ).then(response => {
                if ( response.data.error ) {
                    alert(response.data.error);
                }
                else {
                    this.reloadTheme();
                }
            });
        }
    }

    async componentDidMount(){
        var promo=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getpromo.php",)
            .then(res => {
                // console.log(res);
                //console.log(res.data);
                res.data.map(donne =>{
                    promo.push(donne);
                });
                this.setState({promo},);
            })
        promo.map(personne =>{
          console.log("un gens");
          console.log(personne);
        })

        var theme = [];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getTheme.php")
            .then(res => {
                // console.log(res);
                 //console.log(res.data);
                res.data.map(donne => {
                    theme.push(donne);
                });
                this.setState({theme},);
            })
        //(this.state);
    }


    render() {
        return (
            <div id={"dashboardA"}>

                <Tabs id={"TabA"} defaultActiveKey="1"  >
                    <TabPane tab="Utilisateurs" key="1">

                        <AffichUti promo={this.state.promo} usera={this.props.user}/>
                    </TabPane>
                    <TabPane tab="Promo" key="2">

                        <div>
                            <h3>Ajouter une promo</h3>
                        <form onSubmit={this.handleSubmitPromo}>
                            <p>Nom de la promo : <input type="text" name ="inputpromo" placeholder="Entrez le nom de la promo" value={this.state.inputpromo} onChange={this.handleChange} required style={{width: 200}} />  </p>
                            <Button  htmlType="submit">Ajouter une promo</Button>
                            <p>{this.state.erreurPromo}</p>
                            <p>{this.state.reussitePromo}</p>
                        </form>
                        </div>
                        <br/>
                        <h2>Liste des Promos</h2>
                        <div>
                            <table  id={"promo"}>
                                <thead>
                                <tr>
                                    <th>Num Promo</th>
                                    <th>Libelle</th>
                                    <th>Supprimer</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.promo.map(p=> <tr>
                                    <td>{p.num_promo}</td>
                                    <td>{p.libelle}</td>
                                    <td><Button onClick={()=>this.handleDeleteP(p)}>Supprimer</Button></td>
                                </tr>)}

                                </tbody>
                            </table>
                        </div>

                    </TabPane>
                    <TabPane tab="Theme" key="3">

                        <div>
                            <h3>Ajouter un thème</h3>
                            <form onSubmit={this.handleSubmitTheme}>
                                <p>Nom du thème : <input type="text" name ="inputTheme" placeholder="Entrez le nom du theme" value={this.state.inputTheme} onChange={this.handleChange} required style={{width: 200}} />  </p>
                                <p>Visible par les étudiants :
                                    <select name="visible" value={this.state.visible} style={{width: 50}}
                                            onChange={this.handleChange}>
                                        <option value="oui">oui</option>
                                        <option value="non">non</option>
                                    </select></p>
                                <Button  htmlType="submit">Ajouter un thème</Button>
                                <p>{this.state.erreurTheme}</p>
                                <p>{this.state.reussiteTheme}</p>
                            </form>
                        </div>
                        <br/>
                        <h2>Liste des Thèmes</h2>
                        <div>
                            <table  id={"theme"}>
                                <thead>
                                <tr>
                                    <th>Num Thème</th>
                                    <th>Libelle</th>
                                    <th>Visible par les étudiants</th>
                                    <th>Supprimer</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.theme.map(t=> <tr>
                                    <td>{t.num_theme}</td>
                                    <td>{t.libelle}</td>
                                    <td>{t.visible}</td>
                                    <td><Button onClick={()=>this.handleDeleteT(t)}>Supprimer</Button></td>
                                </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </TabPane>
                    <TabPane tab="Gestion des contrôles" key="4">

                        <GestionControle/>
                    </TabPane>
                    <TabPane tab="Résultat des contrôles" key="5">
                        <AffichResCon />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
