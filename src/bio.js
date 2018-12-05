//display a link if there is no bio and it takes you to a text area to add the bio and a save button.
//has to be a class becuase it has state and this state determines if it shows the text of the bio

import React from 'react';
import axios from "./axios";
import {Link} from "react-router-dom";

export default class Bio extends React.Component {
    constructor(props) {
        //console.log("props in class Uploader:", props);
        super(props);
        this.state = {
            textAreaIsVisible: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.textAreaIsVisible = this.textAreaIsVisible.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        },() => console.log("this state in handleChange:", this.state));
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/bio', this.state).then(resp => {
            //console.log("resp in then on post /bio", resp.data.bio);
            this.props.setBio(resp.data.bio);
            this.setState({
                textAreaIsVisible: false
            });
        }).catch(error => {
            this.setState({error: true});
            console.log("error post bio:", error);
        });
    }

    textAreaIsVisible(e) {
        e.preventDefault();
        this.setState({
            bio: this.props.bio,
            textAreaIsVisible: true
        });
    }

    render() {
        return (
            <div>
                <h2>Please, add your BIO!</h2>
                {this.state.error && <div>Error, please try again!!</div>}
                {this.state.textAreaIsVisible ? (
                    <form onSubmit={this.handleSubmit}>
                        <textarea name="bio" onChange ={this.handleChange} defaultValue = {this.state.bio} />

                        <button>save</button>
                    </form>
                ) : (
                    <div>
                        {this.props.bio ? (
                            <div>
                                {this.props.bio}{" "}
                                <br />
                                <br />
                                <Link onClick={this.textAreaIsVisible} to="/">Edit your Bio</Link>
                            </div>
                        ) : (
                            <div>
                                <Link onClick={this.textAreaIsVisible} to="/">Add your Bio</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );

    }
}
