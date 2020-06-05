import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button } from 'antd';
const { Option } = Select;


export default class AffichRep extends Component {


    constructor(props) {
        super(props);

        this.state = {
        }

    }

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <>
                <td>{this.props.num_rep}</td>
                <td>{this.props.libelle}</td>
                <td>{this.props.valeur}</td>
            </>
        );
    }
}
