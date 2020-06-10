import React, {Component} from 'react'
import axios from 'axios';

class AfficheCours extends Component {
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



                        {this.state.cours.map(cours => <AfficheCours key={cours.num_cours}
                                                                           num_cours={cours.num_cours}
                                                                           libelle={cours.nom_fichier}
                                                                           url_fichier={cours.url_fichier}
                                                                           num_theme={cours.num_theme}
                                                                           theme={cours.theme}
                                                                           />)}





                </tbody>

                </table>

            </div>
        );
    }
}

export default AfficheCours