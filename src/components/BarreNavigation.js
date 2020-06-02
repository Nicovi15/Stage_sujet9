import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import styled from "styled-components";
import {HashRouter as Router, Link} from "react-router-dom";

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

export const BarreNavigation = () => (
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

)
