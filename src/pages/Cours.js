import React, {Component} from 'react'
import DropZone from'../components/DropZone'
import AfficheCours from '../components/AfficheCours'
import DashboardAdmin from "../components/DashboardAdmin";
import HistoQCM from "../components/HistoQCM";


function DashboardContent(props) {
    if(props.user.admin === "1")return <><DropZone/></>
    else return null
}


export default class Cours extends Component {




    constructor(props) {
        super(props);



    }


    render() {
        return (
            <div>


                <DashboardContent user={this.props.user} />
                <br/>
                <AfficheCours user={this.props.user}/>

            </div>
        );
    }
}
