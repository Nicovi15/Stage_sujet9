import React, {Component} from 'react'
import axios from 'axios';
import { Radio } from 'antd';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { Tabs, Button } from 'antd';
import {FireOutlined } from '@ant-design/icons';
import QCMQuestion from "../components/QCMQuestion";
import {HashRouter as Router, Link} from "react-router-dom";
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
            <div>
                <h1>C'est la page où se trouve les menus des questionnaires</h1>
                <Tabs defaultActiveKey="1" >
                    {this.state.theme.map(the => <TabPane tab={the} key={the}>
                        <h2>Questionnaire {the}</h2>
                        <ul >
                            <li> <Router><Link to={"/questionnaire/"+the+"/1"}><Button type="primary" icon={<FireOutlined />}>Difficulté Niveau 1</Button></Link></Router></li> <br/><br/>
                            <li> <Router><Link to={"/questionnaire/"+the+"/2"}><Button type="primary" icon={<><FireOutlined/><FireOutlined/></>}>Difficulté Niveau 2</Button></Link></Router></li><br/><br/>
                            <li> <Router><Link to={"/questionnaire/"+the+"/3"}><Button type="primary" icon={<><FireOutlined/><FireOutlined/><FireOutlined /> </>}>Difficulté Niveau 3</Button></Link></Router></li><br/><br/>
                            <li> <Router><Link to={"/questionnaire/"+the+"/4"}><Button type="primary" icon={<><FireOutlined /><FireOutlined /><FireOutlined /><FireOutlined /> </>}>Difficulté Niveau 4</Button></Link></Router></li><br/><br/>
                            <li> <Router><Link to={"/questionnaire/"+the+"/5"}><Button type="primary" icon={<><FireOutlined /><FireOutlined /><FireOutlined /><FireOutlined /><FireOutlined /> </>}>Difficulté Niveau 5</Button></Link></Router></li><br/><br/>
                        </ul>
                    </TabPane>)}
                </Tabs>
          </div>
        );
    }
}
