import React from 'react';
import {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Connexion} from "./pages/Connexion";
import {Inscription} from "./pages/Inscription";
import {Erreur} from "./pages/Erreur";
import {Dashboard} from "./pages/Dashboard";
import {Menu} from "./pages/Menu";
import {Questionnaire} from "./pages/Questionnaire";
import {Cours} from "./Cours";
import {Accueil} from "./pages/Accueil";
import {Container} from "react-bootstrap";
import {BarreNavigation} from "./components/BarreNavigation";

class App extends Component {
  render(){
  return (
      <React.Fragment>
        <Container>
          <BarreNavigation/>
            <Router>
              <switch>
                <Route exact path = "/" component = {Connexion} />
                <Route  path = "/inscription" component = {Inscription} />
                <Route  path = "/accueil" component = {Accueil} />
                <Route  path = "/dashboard" component= {Dashboard} />
                <Route  path = "/menu" component = {Menu} />
                <Route  path = "/questionnaire" component = {Questionnaire} />
                <Route  path = "/cours" component= {Cours}/>
                <Route path = "/erreur" component= {Erreur}/>
              </switch>
            </Router>
        </Container>
      </React.Fragment>
  );
  }
}

export default App;
