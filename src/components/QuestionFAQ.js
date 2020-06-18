import React, { Component } from "react";
import axios from "axios";


// function Formulaire({result,reponse,repondre,handleChange}){
//   if(result == null)
//     return(
//       <form onSubmit={repondre}>
//         <div class="form-example">
//           <label for="name">Veuillez saisir une réponse</label><br/>
//           <input type="text" value={reponse} required/>
//         </div>
//         <div class="form-example">
//           <input onChange={handleChange} type="submit" value="Répondre"/>
//         </div>
//       </form>
//   );
// else
//   return (<div>{result}</div>);
// }



export default class QuestionFAQ extends Component {
  constructor() {
      super();

      this.state = {
          showResults:false,
          reponse:"",
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

  repondre=(event)=>{
  //  console.log("reponse "+this.state.reponse);
    axios.post("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/AnswerQuestionFAQ.php",
        {
            idQuestion : this.props.idQuestion,
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
      let reponse;
      if(this.state.showResults)
        if(this.props.reponse==null)
          if(this.props.admin=="1"){
            reponse= <form onSubmit={this.repondre}>
                      <div class="form-example">
                        <label htmlFor="reponse">Veuillez saisir une réponse</label><br/>
                        <input  name="reponse" type="text" value={this.state.reponse} onChange={this.handleChange} required/>
                      </div>
                      <div class="form-example">
                        <input  type="submit"  value="Répondre"/>
                      </div>
                    </form>;
                  }else{
                    reponse=<div>Pas encore de reponse disponible</div>;
                  }
        else {
          reponse=<div>{this.props.reponse}</div>;
        }
    else {
      reponse=<div/>;
    }

        return (
        <div key="question">
          <button  onClick={this.Toggle}>
            {this.props.question}
          </button>
          {reponse}
        </div>


        );
    }
}
