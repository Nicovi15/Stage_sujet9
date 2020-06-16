import React, {Component} from 'react'
import DropZone from'../components/DropZone'
import AfficheCours from '../components/AfficheCours'
import DashboardAdmin from "../components/DashboardAdmin";
import HistoQCM from "../components/HistoQCM";


function DashboardContent(props) {
    if(props.user.admin === "1")return <DropZone reload={props.reload}/>
    else return null
}


export default class Cours extends Component {




    constructor(props) {
        super(props);
        this.afficheCoursElement = React.createRef();

    }

    reload = () =>{
      console.log("j'actualise");
      this.afficheCoursElement.current.reloadCours2();
    }


    render() {
        return (
            <div>


                <DashboardContent user={this.props.user} reload={this.reload} />
                <br/>
                <AfficheCours ref={this.afficheCoursElement} user={this.props.user}/>

            </div>
        );
    }
}
