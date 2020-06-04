import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { HashRouter as Router, Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import {
    HomeOutlined, BookOutlined, DashboardOutlined, SettingOutlined, LoginOutlined} from '@ant-design/icons';

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
    `;
    */

export const BarreNavigation = () => (

    /*
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand><Router><Link to="/">UML Challenge</Link></Router></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link><Router><Link to="/accueil">Accueil</Link></Router></Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link><Router><Link to="/cours" >Cours</Link></Router></Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link><Router><Link to="/dashboard" >Dashboard</Link></Router></Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
    



       <Menu.Item >
            Accueil
        </Menu.Item>
    */



    <Menu mode="horizontal">



        <Menu.Item key="accueil" icon={<HomeOutlined />}>
            <Router><Link to="/accueil">Accueil</Link></Router>
        </Menu.Item>

        <Menu.Item key="cours" icon={<BookOutlined />}>
            <Router><Link to="/cours" >Cours</Link></Router>
        </Menu.Item>

        
        <SubMenu icon={<SettingOutlined />} title="Navigation Three - Submenu">
            <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
        </SubMenu>

        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Router><Link to="/dashboard" >Dashboard</Link></Router>
        </Menu.Item>



        <Menu.Item key="alipay">
            <a href="https://arche.univ-lorraine.fr/" target="_blank" rel="noopener noreferrer">
                Accès à Arche
          </a>
        </Menu.Item>

        <Menu.Item key="connexion" icon={<LoginOutlined />}>
            <Router><Link to="./">Connexion</Link></Router>
        </Menu.Item>

        
    </Menu>

)
