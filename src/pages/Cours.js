import React, {Component} from 'react'
import DropZone from'../components/DropZone'
export default class Cours extends Component {


    constructor(props) {
        super(props);


    }


    render() {
        return (
            <div>
                <h1>C'est la page où se trouve les cours</h1>
                <DropZone/>
            </div>
        );
    }
}
