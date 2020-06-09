import React from 'react';
import {Component} from 'react';
import './App.css';
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import axios from "axios";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import {Erreur} from "./pages/Erreur";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Questionnaire from "./pages/Questionnaire";
import Cours from "./Cours";
import Accueil from "./pages/Accueil";
import GestionQ from "./pages/GestionQ";
import {Container} from "react-bootstrap";
import BarreNavigation from "./components/BarreNavigation";
import './design/app.scss'

class App extends Component {

    constructor() {
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
            pseudo: "",
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    checkLoginStatus() {
        axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/session.php", {withCredentials: true}).then(response => {
            //console.log("logged in? ", response.data.status)
            if (response.data.status && this.state.loggedInStatus === "NOT_LOGGED_IN") {
                this.setState({
                    loggedInStatus: "LOGGED_IN",
                    user: response.data.user,
                })
            } else if (!response.data.status && this.state.loggedInStatus === "LOGGED_IN") {
                this.setState({
                    loggedInStatus: "NOT_LOGGED_IN",
                    user: {},
                })
            }
        })
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    handleLogin(data) {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: data,
        });
    }

    handleLogout() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
        });
    }


    render() {
        return (
            <React.Fragment>
                <header id={"menu"}>
                    <BarreNavigation
                        loggedInStatus={this.state.loggedInStatus}
                        user={this.state.user}
                        handleLogout={this.handleLogout} l
                    />
                </header>

                <main>
                <div id={"body"}>
                <Router>
                    <Switch>
                        <Route
                            exact path="/"
                            render={props => (
                                <Connexion {...props}
                                           handleLogin={this.handleLogin}
                                           handleLogout={this.handleLogout}
                                           loggedInStatus={this.state.loggedInStatus}/>
                            )}
                        />
                        <Route path="/inscription" component={Inscription}/>
                        <Route path="/accueil" component={Accueil}/>
                        <Route
                            path="/dashboard"
                            render={props => (
                                <Dashboard {...props}
                                           handleLogin={this.handleLogin}
                                           handleLogout={this.handleLogout}
                                           user={this.state.user}
                                           loggedInStatus={this.state.loggedInStatus}/>
                            )}
                        />
                        <Route
                            exact path="/gestion"
                            render={props => (
                                <GestionQ {...props}
                                          handleLogin={this.handleLogin}
                                          handleLogout={this.handleLogout} l
                                          loggedInStatus={this.state.loggedInStatus}/>
                            )}
                        />
                        <Route path="/menu" component={Menu}/>
                        <Route path="/questionnaire" component={Questionnaire}/>
                        <Route path="/cours" component={Cours}/>
                        <Route path="/erreur" component={Erreur}/>
                    </Switch>
                </Router>
                </div>
            </main>
    </React.Fragment>
    );
    }
    }

    export default App;
