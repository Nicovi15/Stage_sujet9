import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import {Button} from 'antd'
import { PoweroffOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
class DropZone extends Component {


    constructor(props) {
        super(props);
        this.state ={
            file:null,
            loadings: [],
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
    }

    enterLoading = index => {
        this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = true;

            return {
                loadings: newLoadings,
            };
        });
        setTimeout(() => {
            this.setState(({ loadings }) => {
                const newLoadings = [...loadings];
                newLoadings[index] = false;

                return {
                    loadings: newLoadings,
                };
            });
        }, 6000);
    };


    UPLOAD_ENDPOINT = 'https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/upload.php';



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
        const { loadings } = this.state.loadings;
        return (
            <form onSubmit={ this.onSubmit }>
                <h1> React File Upload Example</h1>
                <input type="file" onChange={ this.onChange } />

                <Button type="primary"  htmlType="submit"
                        icon={<PoweroffOutlined />}
                        loading={loadings[0]}
                        onClick={() => this.enterLoading(0)}>
                    Upload File
                </Button>
            </form>
        )
    }

}

export default DropZone;
