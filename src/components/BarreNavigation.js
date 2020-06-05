import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Button } from 'react-bootstrap'
import styled from "styled-components";
import { HashRouter as Router, Link, Route, Redirect } from "react-router-dom";
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { HomeOutlined, BookOutlined, DashboardOutlined, SettingOutlined, LoginOutlined, CheckCircleOutlined, FormOutlined } from '@ant-design/icons';
import axios from "axios";

const { SubMenu } = Menu;

/*
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
    `;*/

function Resultat(props) {
    const reussite = props.reussite;
    if (reussite === "LOGGED_IN") {
        return <h6>Connect�</h6>
    }
    else
        return <></>;
}

function Bgestion(props) {
    const logged = props.logged;
    const admin = props.admin;
    if (logged === "LOGGED_IN" && admin === "1") {
        return <Menu.Item><Router><Link to="/gestion">Gestionnaire de question</Link></Router></Menu.Item>
    }
    else
        return <></>;
}

function Binscrip(props) {
    const logged = props.logged;
    if (!(logged === "LOGGED_IN")) {
        return (<>
            <Router><Link to="/inscription" ><FormOutlined />S'inscrire</Link></Router>;

        </>);
    }
    else
        return <></>;
    
}

function Bdashboard(props) {
    const logged = props.logged;
    if (logged === "LOGGED_IN") {
        return (<>
            <Router><Link to="/menu" ><CheckCircleOutlined />Questionnaires</Link></Router>);
           
        </>);
    }
    else
        return <></>;

}

function Bdashboard2(props) {
    const logged = props.logged;
    if (logged === "LOGGED_IN") {
        return (<>
            
            <Router><Link to="/dashboard" > <DashboardOutlined /> Dashboard</Link></Router>
        </>);
    }
    else
        return <></>;
}



function Bconnecter(props) {
    const logged = props.logged;
    if (logged === "NOT_LOGGED_IN") {
        return <Router><Link to="/" ><LoginOutlined />Se connecter</Link></Router>
    }
    else
        return <Menu.Item onClick={() => props.handleLogoutClick()}>Se d�connecter</Menu.Item>;
}




export default class BarreNavigation extends Component {


    constructor(props) {
        super(props);


        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }


    handleLogoutClick() {
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/deconnexion.php", { withCredentials: true }).then(response => {
        });
        this.props.handleLogout();
    }

    render() {
      return(

            <Menu mode="horizontal">

               

                <Menu.Item key="accueil" icon={<HomeOutlined />}>
                    <Router><Link to="/accueil">Accueil</Link></Router>
                </Menu.Item>

                <Menu.Item key="cours" icon={<BookOutlined />}>
                    <Router><Link to="/cours" >Cours</Link></Router>
              </Menu.Item>

              <Menu.Item>
                  <Bgestion logged={this.props.loggedInStatus} admin={this.props.user.admin} />
              </Menu.Item>

              {/*<SubMenu icon={<SettingOutlined />} title="Navigation Three - Submenu">
                    <Menu.ItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>*/}

              <Menu.Item key="dashboard">
                  <Bdashboard logged={this.props.loggedInStatus} />
              </Menu.Item>

              <Menu.Item key="dashboard2">
                  <Bdashboard2 logged={this.props.loggedInStatus} />
              </Menu.Item>

              <Menu.Item key="inscrip" >
                  <Binscrip logged={this.props.loggedInStatus} />
              </Menu.Item>



                <Menu.Item key="">
                    <a href="https://arche.univ-lorraine.fr/" target="_blank" rel="noopener noreferrer">
                        Acc�s � Arche
                    </a>
              </Menu.Item>



                <Menu.Item key="connexion">
                  <Bconnecter logged={this.props.loggedInStatus} handleLogoutClick={this.handleLogoutClick} />
                </Menu.Item>

                
                


            </Menu>



        );
        
    }
}




