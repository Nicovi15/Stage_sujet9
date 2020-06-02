import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import styled from "styled-components";

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
    `;

export const BarreNavigation = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/">UML Challenge</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/accueil">Accueil</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/cours">Cours</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/dashboard">Dashboard</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>

)
