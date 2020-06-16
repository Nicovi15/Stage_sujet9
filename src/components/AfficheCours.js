import React, {Component} from 'react'
import axios from 'axios';
import { Checkbox, Button, Table } from 'antd';
import 'antd/dist/antd.css';
import '../design/affichCours.scss'

 function DashboardContent(props) {
    if(props.user.admin === "1")return <Button onClick={()=>props.oc(props.cours.num_cours)}>Supprimer</Button>
    else return null
}


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

    }

    onChange = checkedList => {
            this.setState({
                checkedList,
                indeterminate: !!checkedList.length && checkedList.length < this.state.theme.length,
                checkAll: checkedList.length === this.state.theme.length,
            });
        }

        onCheckAllChange = e => {
            this.setState({
                checkedList: e.target.checked ? this.state.theme : [],
                indeterminate: false,
                checkAll: e.target.checked,
            });
        }



      reloadCours = () => {
              var cours=[];
              // console.log(this.state.checkedList);
              axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/reloadCours.php",{
                  list : this.state.checkedList,
                  checkAll: this.state.checkAll,
              })
                  .then(res => {
                      // console.log(res);
                       // console.log(res.data);
                      res.data.map(donne =>{
                          cours.push(donne);
                      });
                      this.setState({cours},);
                      // console.log(this.state);
                  })
          }

    reloadCours2=()=>{
            var cours=[];
            // console.log(this.state.checkedList);
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getCours.php")
                .then(res => {
                    // console.log(res);
                     // console.log(res.data);
                    res.data.map(donne =>{
                        cours.push(donne);
                    });
                    this.setState({cours},);
                    // console.log(this.state);
                })
        }


              affiState= ()=>{
                  //console.log(this.state);
                  this.reloadCours();
              }


  async componentDidMount(){
        this.reloadCours2()
        var theme=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/getTheme.php")
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

        handleDeleteB =num_cours=>{
            if(window.confirm(("Voulez vraiment supprimer le cours n°" + num_cours+" ?"))){
                axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/supprCours.php",
                    {
                        num_cours : num_cours,
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
                        this.reloadCours2();
                    }
                });


            }
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

                <table border-bottom="1px" id={"TabC"} >
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>

                        {this.state.cours.map(cours =>
                        <tr>
                            <td>{cours.theme}</td>
                            <td><a href={cours.url_fichier} target="_blank">{cours.nom_fichier}</a></td>
                            <td><DashboardContent  user={this.props.user} cours={cours} oc={this.handleDeleteB}/></td>
                        </tr>)}

                </tbody>

                </table>

            </div>
        );
    }
}

export default AfficheCours
