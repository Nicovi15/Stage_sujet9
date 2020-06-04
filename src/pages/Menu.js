import React, {Component} from 'react'
import axios from 'axios';
export default class Menu extends Component {


    constructor(props) {
        super(props);
        this.state = {
            theme:[],
            difficulte:[1,2,3]
        };

    }

    async componentDidMount(){
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
            <div>
                <h1>C'est la page où se trouve les menus des questionnaires</h1>
                <ul>
                  {this.state.theme.map(theme => <li key={theme} >{theme}</li>)}
                </ul>

          </div>
        );
    }
}
