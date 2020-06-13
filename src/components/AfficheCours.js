import React, {Component} from 'react'
import axios from 'axios';
import { Checkbox, Button, Table } from 'antd';
import 'antd/dist/antd.css';


class AfficheCours extends Component {



constructor() {
        super();
        this.state = {
            cours:[],
            theme:[],
            checkedList: [],
            indeterminate: true,
            checkAll: false,

        }

        this.reloadCours = this.reloadCours.bind(this);
        this.onChange = this.onChange.bind(this);
        this.affiState = this.affiState.bind(this);

    }

        affiState (){
            console.log(this.state);
            this.reloadCours();
        }

        onChange = checkedList => {
            this.setState({
                checkedList,
                indeterminate: !!checkedList.length && checkedList.length < this.state.theme.length,
                checkAll: checkedList.length === this.state.theme.length,
            });
        };

        onCheckAllChange = e => {
            this.setState({
                checkedList: e.target.checked ? this.state.theme : [],
                indeterminate: false,
                checkAll: e.target.checked,
            });
        };



            reloadCours (){
                    var cours=[];
                    console.log(this.state.checkedList);
                    axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/reloadCours.php",{
                        list : this.state.checkedList,
                        checkAll: this.state.checkAll,
                    })
                        .then(res => {
                            // console.log(res);
                             console.log(res.data);
                            res.data.map(donne =>{
                                cours.push(donne);
                            });
                            this.setState({cours},);
                            console.log(this.state);
                        })
                }

  async componentDidMount(){
        var cours=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/getCours.php")
            .then(res => {
                 console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    cours.push(donne);
                });
                this.setState({cours},);
                console.log(this.state);
            })

        var theme=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getTheme.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne =>{
                    theme.push(donne.libelle);
                });
                this.setState({theme});
            })
        //console.log(this.state.theme);
    }


    render() {


        return (
            <div id={"affichCours"}>
                                <div id={"selection"}>
                                    <div className="site-checkbox-all-wrapper">
                                        <Checkbox  class={"chbox"}
                                                   indeterminate={this.state.indeterminate}
                                                   onChange={this.onCheckAllChange}
                                                   checked={this.state.checkAll}
                                        >
                                            Tout selectionner
                                        </Checkbox>
                                    </div>
                                    <Checkbox.Group
                                        options={this.state.theme}
                                        value={this.state.checkedList}
                                        onChange={this.onChange}
                                    />
                                    <Button onClick={this.affiState}>Rechercher</Button>
                                </div>

                <table border="1px" >
                    <thead>
                    <tr>
                        <th>Nom_fichier</th>

                        <th>Thème</th>

                    </tr>

                    </thead>

                    <tbody>

                        {this.state.cours.map(cours => <tr>

                            <td><a href={cours.url_fichier} target="_blank">{cours.nom_fichier}</a></td>


                            <td>{cours.theme}</td>
                        </tr>)}

                </tbody>

                </table>

            </div>
        );
    }
}

export default AfficheCours