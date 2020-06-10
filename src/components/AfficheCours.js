import React, {Component} from 'react'
import axios from 'axios';

class AfficheCours extends Component {

    constructor() {
        super();
        this.state = {
            cours:[],
        }
    }

  async componentDidMount(){
        var cours=[];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/getCours.php")
            .then(res => {
                 console.log("yes");
                 console.log(res.data);
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


                <table border="1px" >
                    <thead  >
                    <tr>
                        <th>Num cours</th>
                        <th>Nom_fichier</th>
                        <th>url_fichier</th>
                        <th>Num_theme</th>
                        <th>Thème</th>

                    </tr>

                    </thead>
                    <tbody>



                        {this.state.cours.map(cours => <tr>
                            <td>{cours.num_cours}</td>
                            <td>{cours.nom_fichier}</td>
                            <td><a href={cours.url_fichier}>lien</a></td>
                            <td>{cours.num_theme}</td>
                            <td>{cours.theme}</td>
                        </tr>)}





                </tbody>

                </table>

            </div>
        );
    }
}

export default AfficheCours
