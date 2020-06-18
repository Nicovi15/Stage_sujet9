import React, { Component } from "react";
import axios from "axios";
import QuestionFAQ from "../components/QuestionFAQ";

export default class App extends Component {
  constructor() {
      super();

      this.state = {
          question:[],
          libelle:"",
      };

  }

  async componentDidMount(){
    await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getQuestionFAQ.php").then(response => {

        var question=[];
        response.data.map(quest =>{
          question.push(quest);
        });
        this.setState({question});
      });
    //  console.log(this.props.user);
    }

    handleSubmit=(event)=> {
        axios.post("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/AddQuestionFAQ.php",
            {
                libelle : this.state.libelle,
                num_uti : this.props.user.num_uti,
            },
            {withCredentials: true}
        ).then(response => {
            if (response.data.error) {
                console.log(response.data.error)
            } else {
                console.log(response.data);
                if (response.data.status === "Succes") console.log("yes " + response.data);
                this.setState({
                    libelle :"",
                    num_uti :null,
                });
            }
        })
        //event.preventDefault();
    }

    handleChange=event=>{
        this.setState({
            [event.target.name]: event.target.value
        });
        //console.log(this.state.libelle)
    }



    render() {
      let addq;
      if(this.props.user.admin=="1")
        addq=<div></div>;
      else {
        addq=<div key="addQ">
          <form onSubmit={this.handleSubmit}>
           <div class="form-example">
             <label htmlFor="reponse">Posez une question !</label><br/>
             <input  name="libelle" type="text" value={this.state.reponse} onChange={this.handleChange} required/>
           </div>
           <div class="form-example">
             <input  type="submit"  value="Envoyer"/>
           </div>
         </form>;
        </div>
      }
        return (
        <div key="page">
          {addq}
          <div key ="FAQ">
          {this.state.question.map(q=>
            <QuestionFAQ admin={this.props.user.admin} key ={q.idQuestionFAQ} idQuestion={q.idQuestionFAQ} question={q.libelle} reponse={q.Reponse}/>)}
        </div>
      </div>
        );
    }
}
