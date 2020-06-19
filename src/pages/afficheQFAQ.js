import {HashRouter as Router, Link, Redirect} from "react-router-dom";
import React, {Component} from 'react'
import axios from "axios";
import {Button } from 'antd';

export default class AfficheQFAQ extends Component {
    constructor(props) {
        super(props);

        this.state = {
          question:[],
          libelle:"",
          reponse:"",
          rep:"",
        }

        this.handleChange = this.handleChange.bind(this);


    }

    async getQ(){
      let question=[];
        await axios.post("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getQuestionFAQ.php",
            {
                id : this.props.match.params.id,
            },
            {withCredentials: true}
        ).then(response => {

            if (response.data.error) {
                //console.log(response.data.error)
            } else {
                //console.log("data"+response.data);

                if (response.data.status === "Succes") console.log("yes " + response.data);
                response.data.map(q=>{
                    //console.log("yes aa" + q.Reponse);
                    if(q.idQuestionFAQ === this.props.match.params.id ) this.setState({libelle : q.libelle,
                    reponse : q.Reponse})
                  question.push(q);
                })

                this.setState({question});
                //console.log("Les réponse");
                //console.log(this.state.question);
            }
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    repondre=(event)=>{
      console.log("reponse "+this.state.reponse);
      axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/php/AnswerQuestionFAQ.php",
          {
              idQuestion : this.props.match.params.id,
              reponse : this.state.rep,
          },
          {withCredentials: true}
      ).then(response => {
          if (response.data.error) {
              console.log(response.data.error)
          } else {
              //console.log(response.data);
              if (response.data.status === "Succes") console.log("yes " + response.data);
              this.setState({
                reponse : "",
              });
          }
      })
    }



    async componentDidMount(){
      this.getQ();
      //console.log(this.state.question);
      this.getDetail();
        //    console.log(this.state.question);
    }

    getDetail=()=>{
      console.log(this.state.question);
      this.state.question.map(q =>{
        if(q.idQuestionFAQ==this.props.match.params.id){

           console.log("reponse"+q.reponse);
           console.log(q.libelle);

          this.setState({libelle:q.libelle,reponse:q.Reponse});
        }
      })
    }

    afficheRep(){
        this.setState({
            afficheRep : !this.state.afficheRep,
        })
    }


    render() {
      let reponse;
      if(this.state.reponse==null){
        if(this.props.user.admin=="1"){
            reponse = <form onSubmit={this.repondre}>
                    <div class="form-example">
                      <label htmlFor="reponse">Veuillez saisir une réponse</label><br/>
                      <input  name="rep" type="text" onChange={this.handleChange} required/>
                    </div>
                    <div class="form-example">
                      <input  type="submit"  value="Répondre"/>
                    </div>
                  </form>;
                }else{
                  reponse = <div>Pas encore de reponse disponible</div>;
                }
        }else {

        }
      return(
        <div>
          <h1>Question N°{this.props.match.params.id}</h1>

            <div>
            <p>
                {this.state.libelle}
            </p>
                {reponse}
            <p>
                {this.state.reponse}
            </p>
            </div>
        </div>
      )
    }
}
