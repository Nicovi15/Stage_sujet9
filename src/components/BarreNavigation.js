import React, {Component} from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Button} from 'react-bootstrap'
import styled from "styled-components";
import {HashRouter as Router, Link, Route, Redirect} from "react-router-dom";
import axios from "axios";

const Styles = styled.div`
    .navbar {
    background-color: black;
    align: center;
    }
    
    .navbar-brand, .navbar-nav .nav-link {
        color: white;
        
        &:hover{
            color: red;
            }
        }
        
    .p{
        color : white;
        &:hover: red;
    }
    `;

function Resultat(props) {
    const reussite = props.reussite;
    if (reussite === "LOGGED_IN") {
        return <h6>Connecté</h6>
    }
    else
    return <></>;
}

function Bgestion(props) {
    const logged = props.logged;
    const admin = props.admin;
    if (logged === "LOGGED_IN" && admin === "1") {
        return <Nav.Item><Nav.Link><Router><Link to="/gestion">Gestionnaire de question</Link></Router></Nav.Link></Nav.Item>
    }
    else
        return <></>;
}

function Bdashboard(props) {
    const logged = props.logged;
    if (logged === "LOGGED_IN") {
       return (<>
           <Nav.Item><Nav.Link><Router><Link to="/menu" >Questionnaires</Link></Router></Nav.Link></Nav.Item>);
           <Nav.Item><Nav.Link><Router><Link to="/dashboard" >Dashboard</Link></Router></Nav.Link></Nav.Item>
                </>);
    }
    else
        return <Nav.Item><Nav.Link><Router><Link to="/inscription" >S'inscrire</Link></Router></Nav.Link></Nav.Item>;
}

function Bconnecter(props) {
    const logged = props.logged;
    if (logged === "NOT_LOGGED_IN") {
        return <Nav.Item><Nav.Link><Router><Link to="/" ><Button>Se connecter</Button></Link></Router></Nav.Link></Nav.Item>
    }
    else
        return <Nav.Item><Nav.Link><Button onClick={()=>props.handleLogoutClick()}>Se déconnecter</Button></Nav.Link></Nav.Item>;
}



export default class BarreNavigation extends Component {


    constructor(props) {
        super(props);


        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }


    handleLogoutClick(){
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/deconnexion.php", {withCredentials: true}).then(response =>{
        });
        this.props.handleLogout();
    }

    render() {
        return (
            <Styles>
                <Navbar expand="lg">
                    <Navbar.Brand><Router><Link to="/accueil">UML Challenge</Link></Router></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Bgestion logged={this.props.loggedInStatus} admin ={this.props.user.admin} />
                            <Nav.Item><Nav.Link><Router><Link to="/accueil">Accueil</Link></Router></Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link><Router><Link to="/cours" >Cours</Link></Router></Nav.Link></Nav.Item>
                            <Bdashboard logged={this.props.loggedInStatus}/>
                            <Bconnecter logged={this.props.loggedInStatus} handleLogoutClick={this.handleLogoutClick}/>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>


        );
    }
}


