import React from 'react';
import axios from "./axios";
//import {Link} from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        //console.log("handleChange in login running!", e.target.value);
        //console.log("name of input:", e.target.name);
        this.setState({
            [e.target.name]: e.target.value
            //we add a callback function to console.log this.state and we do this after the } before the )
        }, () => console.log("this state in handleChange login:", this.state));

    }

    handleSubmit(e) {
        //we need this so we can stop our page to reload when we click register button.
        e.preventDefault();
        console.log("handleSubmit in login Running!:", this.state);
        axios.post('/login', this.state).then(resp => {
            console.log("resp in then on post /login", resp);
            //if everything goes well and the user is registered we redirect him to /ROUTE
            if (resp.data.success) {
                location.replace('/');
            } else {
                this.setState({error: true});
                console.log("Error in login handleSubmit");
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Please,login!</h2>
                {this.state.error && <div>Error, please try again!!</div>}
                <form onSubmit={this.handleSubmit}>
                    <input onChange= {this.handleChange} name="email" type="text" placeholder="email" />
                    <input onChange= {this.handleChange} name="password" type="password" placeholder="password" />
                    <button>Login</button>
                </form>
            </div>
        );

    }
}
