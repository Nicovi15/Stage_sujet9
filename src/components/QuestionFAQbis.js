import React, { Component } from "react";
import axios from "axios";

export default class QuestionFAQbis extends Component {
  constructor() {
      super();

      this.state = {
          reponse:"",
          user:"",

      };

  }

  Toggle = () =>{
    if(this.state.showResults)
      this.setState({showResults:false});
    else
      this.setState({showResults:true});
  }

  handleChange=event=>{

      this.setState({
          [event.target.name]: event.target.value
      });
  }

  async updateUser(num_uti){
      await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~vivier19u/quizzuml/getinfouser.php",
            {
                num_uti :num_uti,
            },
            {withCredentials: true}
        ).then(response => {
            if ( response.data.error ) {
                //console.log(response.data);
                this.setState({
                    echec : true,
                });
            }
            else {
              //console.log(response.data.user.pseudo);
                if(response.data.status === "Succes"){
                    this.setState({
                        user : response.data.user.pseudo,
                    });
                      // console.log(this.state.user);
                }
            }
        })
    }

    componentDidMount(){
      this.updateUser(this.props.num_uti);
    }

  repondre=(event)=>{
    axios.post("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/AnswerQuestionFAQ.php",
        {
            idQuestion : this.props.id,
            reponse : this.state.reponse,
        },
        {withCredentials: true}
    ).then(response => {
        if (response.data.error) {
            console.log(response.data.error)
        } else {
            console.log(response.data);
            if (response.data.status === "Succes") console.log("yes " + response.data);
            this.setState({
              reponse : "",
            });
        }
    })
  }

    render() {
      let reponse=null;
      if(this.props.reponse==null){
        if(this.props.admin=="1"){
          reponse=<td> <form onSubmit={this.repondre}>
                    <div class="form-example">
                      <input  name="reponse" type="text" value={this.state.reponse} onChange={this.handleChange} required/>
                      <input  type="submit"  value="répondre"/>
                    </div>
                  </form></td>;
        }
      }else
        reponse=<td>{this.props.reponse}</td>;
        return (
          <tr>
              <td>{this.props.libelle}</td>
              <td>{this.state.user}</td>
              {reponse}
          </tr>


        );
    }
}
