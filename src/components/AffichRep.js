import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from "axios";
import { Select, Button } from 'antd';
const { Option } = Select;


function Bmodif(props) {

    if (!props.modif) {
        return <Button onClick={props.onClick}>Modifier</Button>
    } else
        return <> <Button onClick={props.onClick}>Annuler</Button> </>
}


export default class AffichRep extends Component {


    constructor(props) {
        super(props);

        this.state = {
            modifier :false,
        }

        this.handleChangeModif = this.handleChangeModif.bind(this);

    }

    handleChangeModif(){
        this.setState({
            modifier : !this.state.modifier,
        })
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
                <td><Bmodif modif={this.state.modifier} onClick={this.handleChangeModif}/></td>
            </>
        );
    }
}
