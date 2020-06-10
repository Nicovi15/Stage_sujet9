import React, {Component} from 'react'
import axios from 'axios'
import 'antd/dist/antd.css';
import ButtonLoad from "./ButtonLoad";


class DropZone extends Component {



    UPLOAD_ENDPOINT = 'https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/upload.php';
    constructor(props) {
        super(props);
        this.state ={
            file:null
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
    }



    async onSubmit(e){
        e.preventDefault()
        let res = await this.uploadFile(this.state.file);
        console.log(res.data);
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    async uploadFile(file){
        const formData = new FormData();
        formData.append('avatar',file)
        return  await axios.post(this.UPLOAD_ENDPOINT, formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

    render() {
        const { loadings } = this.state;
        return (

            <form onSubmit={ this.onSubmit }>
                <h1> React File Upload Example</h1>
                <input type="file" onChange={ this.onChange } />
                <ButtonLoad/>

            </form>

        )
    }

}

export default DropZone;
