import React from 'react';
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        console.log("props in class Uploader:", props);
        super();
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        //console.log("handle changing:", e.target.files[0]);
        //we have to store this uploaded image in state.
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("handle submit");
        var formData = new FormData();
        formData.append('file', this.state.file);

        var self = this;
        axios.post("/upload", formData).then(function(resp) {
            console.log("Resp in handleSubmit upload:", resp);
            self.props.updateImage(resp.data.rows[0].profilepicurl);
        }).catch(error => {
            this.setState({error: true});
            console.log("error post upload:", error);
        });
    }

    render() {
        return (
            <div id="uploader">
                <h2 id="movex" onClick={this.props.hideUploader}>x</h2>
                <h1>upload an image!</h1>
                {this.state.error && <div>Error, please try again!!</div>}
                <form onSubmit={this.handleSubmit}>
                    <input name="file" onChange={this.handleChange} type="file" accept="image/*" />
                    <button>upload</button>
                </form>
            </div>
        );

    }
}
