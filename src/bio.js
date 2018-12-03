//display a link if there is no bio and it takes you to a text area to add the bio and a save button.
//has to be a class becuase it has state and this state determines if it shows the text of the bio

import React from 'react';
import axios from "./axios";
import {Link} from "react-router-dom";

export default class Bio extends React.Component {
    constructor() {
        //console.log("props in class Uploader:", props);
        super();
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideTextArea = this.hideTextArea.bind(this);
        this.showTextArea = this.showTextArea.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        },() => console.log("this state in handleChange:", this.state));
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/bio', this.state).then(resp => {
            console.log("resp in then on post /bio", resp.data);
            this.props.setBio(resp.data.rows[0].bio);
        }).catch(error => {
            this.setState({error: true});
            console.log("error post bio:", error);
        });
    }

    showTextArea() {
        this.setState({
            textAreaIsVisible: true
        });
    }

    hideTextArea() {
        this.setState({
            textAreaIsVisible: false
        });
    }


    render() {
        return (
            <div>
                <h2>Please, add your BIO!</h2>
                {this.state.error && <div>Error, please try again!!</div>}
                <Link to="/" {textAreaIsVisible}>Click here to Edit your Bio</Link>
                {this.state.textAreaIsVisible && (
                    <form onSubmit={this.handleSubmit}>
                        <textarea onChange ={this.handleChange} defaultValue = {this.state.bio} />

                        <button>save</button>
                    </form>)}
            </div>
        );

    }
}
