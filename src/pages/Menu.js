import React, {Component} from 'react'
import axios from 'axios';
import { Radio } from 'antd';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

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
                <ul>

                </ul>

                <Radio.Group onChange={this.onChange} defaultValue="a">
                  {this.state.theme.map(theme => <Radio.Button value={theme}>{theme}</Radio.Button>)}
                </Radio.Group>

                <div>
                  <div className="site-checkbox-all-wrapper">
                    <Checkbox
                      indeterminate={this.state.indeterminate}
                      onChange={this.onCheckAllChange}
                      checked={this.state.checkAll}
                    >
                      Tout selectionner
                    </Checkbox>
                  </div>
                  <br />
                  <CheckboxGroup
                    options={this.state.theme}
                    value={this.state.checkedList}
                    onChange={this.onChange2}
                  />
              </div>
          </div>
        );
    }
}
