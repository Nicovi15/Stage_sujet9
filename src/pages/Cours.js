import React, {Component} from 'react'
import DropZone from'../components/DropZone'
import AfficheCours from '../components/AfficheCours'
export default class Cours extends Component {


    constructor(props) {
        super(props);


    }


    render() {
        return (
            <div>
                <h1>C'est la page où se trouve les cours</h1>
                <DropZone/>
                <br/>
                <AfficheCours/>

            </div>
        );
    }
}
