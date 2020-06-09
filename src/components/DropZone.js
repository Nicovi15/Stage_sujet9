import React, {Component} from 'react'
import axios from 'axios'

class DropZone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pdf: ''
        }
    }

    onChange(e){
        let files=e.target.files
        console.warn("data file", files)

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload=(e)=>{
            console.warn("pdf data", e.target.result)
        }
    }

    render() {
        return (
            <div onSubmit={this.onFormSubmit}>
                <h1>Dropzone pdf</h1>
                <input type="file" name="file" onChange={(e) => this.onChange(e)}/>
            </div>
        );
    }
}


export default DropZone;


