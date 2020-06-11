import React, {Component} from 'react'
import axios from 'axios'
import 'antd/dist/antd.css';
import ButtonLoad from "./ButtonLoad";


function Success(props) {
    const ajout = props.ajout
    if (ajout) {
        return <h6>Fichier ajouter avec succes.</h6>
    } else
        return <></>
}

function Echec(props) {
    const echecAj = props.echecAj
    if (echecAj) {
        return <h6>Echec de l'ajout.</h6>
    } else
        return <></>
}

class DropZone extends Component {


    UPLOAD_ENDPOINT = 'https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/upload.php';

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            success: false,
            echec: false,
            themes: [],
            theme: "",
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        //console.log("value ",event.target.value);
        //console.log("name ",event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        })
        this.setState({
            reussite: false,
            echec: false,
        })
    }

    async componentDidMount() {
        var themes = [];
        await axios.get("https://devweb.iutmetz.univ-lorraine.fr/~cazzoli2u/quizzuml/getTheme.php")
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                res.data.map(donne => {
                    themes.push(donne.libelle);
                });
                this.setState({themes},);
                this.setState({theme: this.state.themes[0]},)
            })
        //console.log(this.state.theme);
    }


    async onSubmit(e) {
        e.preventDefault()
        let res = await this.uploadFile(this.state.file);
        console.log(res.data);
        if (res.data.status === "success" && (!(res.data.status === "error"))) {
            this.setState({
                success: true,
                echec : false,
            })
            axios.post("https://devweb.iutmetz.univ-lorraine.fr/~collign87u/quizzuml/ajoutcours.php",
                {
                    url : res.data.url_fichier,
                    theme : this.state.theme
                },
                {withCredentials: true}
            ).then(response => {
            })
        } else if (res.data.status === "error" && (!(res.data.status === "success"))) {
            this.setState({
                success: false,
                echec: true,
            })
        }
        console.log("theme", this.state.theme)
        console.log("status",res.data.status);
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file )

        return await axios.post(this.UPLOAD_ENDPOINT, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }


    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1> React File Upload Example</h1>
                    <input type="file" onChange={this.onChange}/>
                    <ButtonLoad/>
                    <td>
                        <select name="theme" value={this.state.theme} style={{width: 120}}
                                onChange={this.handleChange}>
                            {this.state.themes.map(theme => <option key={theme} value={theme}>{theme}</option>)}
                        </select>
                    </td>
                </form>

                <Success ajout={this.state.success}/>
                <Echec echecAj={this.state.echec}/>
            </div>
        )
    }

}

export default DropZone;
