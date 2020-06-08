import React, {Component} from "react";
import {HashRouter as Router, Link, Route, Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import {
    HomeOutlined,
    BookOutlined,
    DashboardOutlined,
    SettingOutlined,
    LoginOutlined,
    CheckCircleOutlined,
    FormOutlined,
    DiffOutlined
} from '@ant-design/icons';
import axios from "axios";
import '../design/barreNavigation.scss'

const {SubMenu} = Menu;

function Resultat(props) {
    const reussite = props.reussite;
    if (reussite === "LOGGED_IN") {
        return <h6>Connecté</h6>
    } else
        return (null);
}

function Menaff(props) {

    const logged = props.logged;
    const admin = props.admin;


    if (logged === "LOGGED_IN" && (!(admin === "1"))) {

        return (

            <Menu id={"menuaff"} mode="horizontal">


                <Menu.Item key="accueil" icon={<HomeOutlined/>}>
                    <Router><Link to="/accueil">Accueil</Link></Router>
                </Menu.Item>

                <Menu.Item key="cours" icon={<BookOutlined/>}>
                    <Router><Link to="/cours">Cours</Link></Router>
                </Menu.Item>


                <Menu.Item key="dashboard">
                    <Router><Link to="/menu"><CheckCircleOutlined/>Questionnaires</Link></Router>
                </Menu.Item>

                <Menu.Item key="dashboard2">
                    <Router><Link to="/dashboard"> <DashboardOutlined/> Dashboard</Link></Router>
                </Menu.Item>

                <li className={"spacer"}></li>

                <Menu.Item id={"partieD"} key="arche">
                    <a href="https://arche.univ-lorraine.fr/" target="_blank" rel="noopener noreferrer">
                        Accès à Arche
                    </a>
                </Menu.Item>


                <Menu.Item id={"partieD"} onClick={props.deconnecter}><Router><Link to="/connexion"><LoginOutlined/>Se
                    déconnecter</Link></Router>
                </Menu.Item>


            </Menu>

        )
    } else if (logged === "LOGGED_IN" && admin === "1") {

        return (

            <Menu id={"menuaff"} mode="horizontal">


                <Menu.Item id={"partieD"} key="accueil" icon={<HomeOutlined/>}>
                    <Router><Link to="/accueil">Accueil</Link></Router>
                </Menu.Item>

                <Menu.Item id={"partieD"} key="cours" icon={<BookOutlined/>}>
                    <Router><Link to="/cours">Cours</Link></Router>
                </Menu.Item>


                <Menu.Item id={"partieD"} key="gestion">
                    <Router><Link to="/gestion"> <DiffOutlined/>Gestionnaire de question</Link></Router>
                </Menu.Item>

                <Menu.Item id={"partieD"} key="dashboard">
                    <Router><Link to="/menu"><CheckCircleOutlined/>Questionnaires</Link></Router>
                </Menu.Item>

                <Menu.Item id={"partieD"} key="dashboard2">
                    <Router><Link to="/dashboard"> <DashboardOutlined/> Dashboard</Link></Router>
                </Menu.Item>

                <li className={"spacer"}></li>
                <Menu.Item id={"partieD"} key="arche">
                    <a href="https://arche.univ-lorraine.fr/" target="_blank" rel="noopener noreferrer">
                        Accès à Arche
                    </a>
                </Menu.Item>


                <Menu.Item id={"partieD"} onClick={props.deconnecter}><Router><Link to="/"><LoginOutlined/>Se
                    déconnecter</Link></Router></Menu.Item>


            </Menu>

        )

    } else if (logged === "NOT_LOGGED_IN") {

        return (

            <Menu id={"menuaff"} mode="horizontal">


                <Menu.Item key="accueil" icon={<HomeOutlined/>}>
                    <Router><Link to="/accueil">Accueil</Link></Router>
                </Menu.Item>

                <Menu.Item id={"partieD0"} key="cours" icon={<BookOutlined/>}>
                    <Router><Link to="/cours">Cours</Link></Router>
                </Menu.Item>


                <li class={"spacer"}></li>

                <Menu.Item id={"partieD1"} key="arche">
                    <a href="https://arche.univ-lorraine.fr/" target="_blank" rel="noopener noreferrer">
                        Accès à Arche
                    </a>
                </Menu.Item>

                <Menu.Item id={"partieD2"} key="inscrip">
                    <Router><Link to="/inscription"><FormOutlined/>S'inscrire</Link></Router>
                </Menu.Item>


                <Menu.Item id={"partieD3"} key="connexion">
                    <Router><Link to="/"><LoginOutlined/>Se connecter</Link></Router>
                </Menu.Item>


            </Menu>


        )
    }

}


export default class BarreNavigation extends Component {


    constructor(props) {
        super(props);


        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }


    handleLogoutClick() {
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/deconnexion.php", {withCredentials: true}).then(response => {
        });
        this.props.handleLogout();
    }


    render() {


        return (

            <Menaff logged={this.props.loggedInStatus} admin={this.props.user.admin}
                    deconnecter={this.props.handleLogout}/>


        );
    }


}




