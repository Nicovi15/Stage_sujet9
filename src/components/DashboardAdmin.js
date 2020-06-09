import React, {Component} from 'react'
import axios from 'axios';
import { Radio } from 'antd';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { Tabs, Button } from 'antd';
import AffichUti from "./AffichUti";
const CheckboxGroup = Checkbox.Group;
const { TabPane } = Tabs;


export default class DashboardAdmin extends Component {


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


    render() {
        return (
            <div>
                <h1></h1>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Utilisateurs" key="1">
                        <h2>Gestion des utilisateurs</h2>
                        <AffichUti/>
                    </TabPane>
                    <TabPane tab="Gestion des contrôles" key="2">
                        <h2>Gestion des contrôles</h2>
                    </TabPane>
                    <TabPane tab="Résultat des contrôles" key="3">
                        <h2>Résultat des contrôles</h2>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
