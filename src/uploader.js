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
        formData.append('file', this.form.profilePicUrl);

        axios.post("/upload", formData).then(function(resp) {
            console.log("Resp in handleSubmit:", resp.data);
            this.setState({profilePicUrl: resp.data.profilePicUrl});
        });

        //after this then we need to figure out how to close this uploader and
        //we need to show the new image instantly so we have to go to app and tell it to change the profilePicUrl and
        //uploaderIsVisible set to false.
    }

    render() {
        return (
            <div>
                <h1>upload an image!</h1>
                <form onSubmit={this.handleSubmit}>
                    <input name="file" onChange={this.handleChange} type="file" accept="image/*" />
                    <button>upload</button>
                    <h2 onClick={this.props.hideUploader(this.state.profilePicUrl)}></h2>
                </form>
            </div>
        );

    }
}
