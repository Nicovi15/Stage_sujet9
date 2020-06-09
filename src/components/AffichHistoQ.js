import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import 'antd/dist/antd.css';


export default class AffichHistoQ extends Component {


    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            //Affichage de la redirection
            return <Redirect to='/'/>;
        }

        return (
            <>
                <tr>
                    <td>{this.props.id_qn}</td>
                    <td>{this.props.date}</td>
                    <td>{this.props.theme}</td>
                    <td>{this.props.difficulte}</td>
                    <td>{this.props.score}/10</td>
                </tr>
            </>
        );
    }
}
