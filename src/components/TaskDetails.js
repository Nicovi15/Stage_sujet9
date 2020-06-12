import React from "react";
import {withRouter} from "react-router-dom";
import Questionnaire from "../pages/Questionnaire";

class TaskDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            id:null,
            dif :null,
        }
    }

    componentDidMount() {
        this.setState({
            id : this.props.match.params.id,
            dif : this.props.match.params.dif,
        });
    }

    render() {
        return <Questionnaire id={this.state.id} dif={this.state.dif} user={this.props.user} update={this.props.update}/>;
    }
}

export default withRouter(TaskDetails);
