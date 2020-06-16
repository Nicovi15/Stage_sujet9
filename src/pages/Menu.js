import React, {Component} from 'react'
import axios from 'axios';
import 'antd/dist/antd.css';
import { Tabs, Button } from 'antd';
import {FireFilled} from '@ant-design/icons';
import {HashRouter as Router, Link, Route, Switch} from "react-router-dom";
import TaskDetails from "../components/TaskDetails";
import SelecCont from "../components/SelecCont";
import '../design/menuQ.scss'
const { TabPane } = Tabs;
export default class Menu extends Component {


    constructor(props) {
        super(props);
        this.state = {
            theme:[],
            difficulte:[1,2,3],
            checkedList: [],
            indeterminate: true,
            checkAll: false,
        };
        this.testDis = this.testDis.bind(this);
    }
    onChange = (e) =>{
       console.log(`radio checked:${e.target.value}`);
     }
    async componentDidMount(){
      var theme=[];
      await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/gettheme.php")
         .then(res => {
           // console.log(res);
           // console.log(res.data);
           res.data.map(donne =>{
             theme.push(donne);
           });
           this.setState({theme});
         })
         //console.log(this.state.theme);
     }


      testDis(b){
          if(parseInt(this.props.user.niveau) < b)
              return true;
          else return false;
      }

    render() {
        return (
            <div id={"menuQ"}>

                <Tabs defaultActiveKey="1" >
                    {/*
                    <TabPane tab ="Tout" key={"Tout"}>
                        <h2>Questionnaire portant sur toutes les questions</h2>
                        <ul id={"niveau"}>
                            <li> <Router><Link to={"/questionnaire/tout/1"}><Button id={"bu"} disabled={this.testDis(1)} icon={<FireFilled style={{ fontSize: '16px', color: '#15DC05' }} />}>Difficulté Niveau 1</Button></Link><Switch>
                                <Route path="/questionnaire/:id/:dif" children={<TaskDetails/>} />
                            </Switch></Router></li> <br/><br/>
                            <li> <Router><Link to={"/questionnaire/tout/2"}><Button id={"bu"} disabled={this.testDis(2)}  icon={<FireFilled style={{ fontSize: '16px', color: '#C9C606' }} />}>Difficulté Niveau 2</Button></Link><Switch>
                                <Route path="/:id/:dif" children={<TaskDetails/>} />
                            </Switch></Router></li><br/><br/>
                            <li> <Router><Link to={"/questionnaire/tout/3"}><Button id={"bu"} disabled={this.testDis(3)}  icon={<FireFilled style={{ fontSize: '16px', color: '#FCA801' }} />}>Difficulté Niveau 3</Button></Link><Switch>
                                <Route path="/:id/:dif" children={<TaskDetails/>} />
                            </Switch></Router></li><br/><br/>
                        </ul>


                    </TabPane>*/}
                    {this.state.theme.map(the =>{ if(the.visible==="oui") return <><TabPane tab={the.libelle} key={the.libelle}>
                        <h2>Questionnaire {the.libelle}</h2>
                        <ul id={"niveau"}>
                            <li> <Router><Link to={"/questionnaire/"+the.libelle+"/1"}><Button id={"bu"} disabled={this.testDis(1)} icon={<FireFilled style={{ fontSize: '16px', color: '#15DC05' }} />}>Difficulté Niveau 1</Button></Link><Switch>
                                <Route path="/questionnaire/:id/:dif" children={<TaskDetails/>} />
                            </Switch></Router></li> <br/><br/>
                            <li> <Router><Link to={"/questionnaire/"+the.libelle+"/2"}><Button id={"bu"} disabled={this.testDis(2)}  icon={<FireFilled style={{ fontSize: '16px', color: '#C9C606' }} />}>Difficulté Niveau 2</Button></Link><Switch>
                                <Route path="/:id/:dif" children={<TaskDetails/>} />
                            </Switch></Router></li><br/><br/>
                            <li> <Router><Link to={"/questionnaire/"+the.libelle+"/3"}><Button id={"bu"} disabled={this.testDis(3)}  icon={<FireFilled style={{ fontSize: '16px', color: '#FCA801' }} />}>Difficulté Niveau 3</Button></Link><Switch>
                                <Route path="/:id/:dif" children={<TaskDetails/>} />
                            </Switch></Router></li><br/><br/>
                        </ul>
                    </TabPane></>
                    })}
                    <TabPane tab="Contrôles" key="Contrôle">

                        <SelecCont/>
                    </TabPane>
                </Tabs>
          </div>
        );
    }
}
