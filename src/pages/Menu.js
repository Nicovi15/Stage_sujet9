import React, {Component} from 'react'
import axios from 'axios';
import { Radio } from 'antd';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { Tabs, Button } from 'antd';
import {FireOutlined , FireFilled} from '@ant-design/icons';
import QCMQuestion from "../components/QCMQuestion";
import {HashRouter as Router, Link, Route, Switch} from "react-router-dom";
import Questionnaire from "./Questionnaire";
import TaskDetails from "../components/TaskDetails";
import SelecCont from "../components/SelecCont";
import '../design/menuQ.scss'
const CheckboxGroup = Checkbox.Group;
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
    }
    onChange = (e) =>{
       console.log(`radio checked:${e.target.value}`);
     }
    async componentDidMount(){
      var theme=[];
      await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getTheme.php")
         .then(res => {
           // console.log(res);
           // console.log(res.data);
           res.data.map(donne =>{
             theme.push(donne.libelle);
           });
           this.setState({theme});
         })
         //console.log(this.state.theme);
     }

     onChange2 = checkedList => {
        this.setState({
          checkedList,
          indeterminate: !!checkedList.length && checkedList.length < this.state.theme.length,
          checkAll: checkedList.length === this.state.theme.length,
        });
      };

      onCheckAllChange = e => {
        this.setState({
          checkedList: e.target.checked ? this.state.theme : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
      };



    render() {
        return (
            <div id={"menuQ"}>

                <Tabs defaultActiveKey="1" >
                    {this.state.theme.map(the => <TabPane tab={the} key={the}>
                        <h2>Questionnaire {the}</h2>
                        <ul >
                            <li> <Router><Link to={"/questionnaire/"+the+"/1"}><Button  icon={<FireFilled style={{ fontSize: '16px', color: '#15DC05' }} />}>Difficulté Niveau 1</Button></Link><Switch>
                                <Route path="/questionnaire/:id/:dif" children={<TaskDetails/>} />
                            </Switch></Router></li> <br/><br/>
                            <li> <Router><Link to={"/questionnaire/"+the+"/2"}><Button  icon={<FireFilled style={{ fontSize: '16px', color: '#C9C606' }} />}>Difficulté Niveau 2</Button></Link><Switch>
                                <Route path="/:id/:dif" children={<Questionnaire />} />
                            </Switch></Router></li><br/><br/>
                            <li> <Router><Link to={"/questionnaire/"+the+"/3"}><Button  icon={<FireFilled style={{ fontSize: '16px', color: '#FCA801' }} />}>Difficulté Niveau 3</Button></Link><Switch>
                                <Route path="/:id/:dif" children={<Questionnaire />} />
                            </Switch></Router></li><br/><br/>
                            <li> <Router><Link to={"/questionnaire/"+the+"/4"}><Button  icon={<FireFilled style={{ fontSize: '16px', color: '#FC0C01' }} /> }>Difficulté Niveau 4</Button></Link><Switch>
                                <Route path="/:id/:dif" children={<Questionnaire/>} />
                            </Switch></Router></li><br/><br/>
                            <li> <Router><Link to={"/questionnaire/"+the+"/5"}><Button  icon={<FireFilled style={{ fontSize: '16px', color: '#B401FC' }} /> }>Difficulté Niveau 5</Button></Link><Switch>
                                <Route path="/:id/:dif" children={<Questionnaire />} />
                            </Switch></Router></li><br/><br/>
                        </ul>
                    </TabPane>)}
                    <TabPane tab="Contrôles" key="Contrôle">
                        <h2>Contrôles</h2>
                        <SelecCont/>
                    </TabPane>
                </Tabs>
          </div>
        );
    }
}
