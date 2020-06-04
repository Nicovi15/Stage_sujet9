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

    componentDidMount() {
      axios.get(`https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getTheme.php`)
         .then(res => {
           console.log('Salut');
           console.log(res);
           console.log(res.data);
         })
     }


    render() {
        return (
            <div>
                <h1>C'est la page où se trouve les menus des questionnaires</h1>
                <ul>
                  {this.state.difficulte.map(difficulte => <li>{difficulte}</li>)}
                </ul>

          </div>
        );
    }
}
