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
                <h1>C'est la page où se trouve les cours</h1>

                <DashboardContent user={this.props.user} />
                <br/>
                <AfficheCours/>

            </div>
        );
    }
}
