import React from "react";
import {withRouter} from "react-router-dom";
import Controle from "../pages/Controle";

class TaskDetails2 extends React.Component {

    constructor() {
        super();
        this.state = {
            id:null,
        }

    }

    componentDidMount() {
        this.setState({
            id : this.props.match.params.id,
        });
    }

    render() {
        console.log(this.state.id);
        return <Controle id={this.state.id}s user={this.props.user} />;
    }
}

export default withRouter(TaskDetails2);
