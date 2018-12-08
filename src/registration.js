import React from 'react';
//we are getting axios now from our local axios file so i need to add ./
import axios from "./axios";
//Link is the jsx tag instead of <a> and we have to import it every where we need it:
import {Link} from "react-router-dom";
//we need to add state to this so we will use class:
//child of welcome so I need to import in welcome
//every class has extends React.Component
export default class Registration extends React.Component {
    constructor() {
        super();

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //function for the input fields to handle the information (then we need to store the value in state)
    handleChange(e) {
        //console.log("handleChange running!", e.target.value);
        //console.log("name of input:", e.target.name);
        this.setState({
            [e.target.name]: e.target.value
            //we add a callback function to console.log this.state and we do this after the } before the )
        }, () => console.log("this state in handleChange:", this.state));

    }


    handleSubmit(e) {
        //we need this so we can stop our page to reload when we click register button.
        e.preventDefault();
        //console.log("handleSubmit in registration Running!:", this.state);
        axios.post('/registration', this.state).then(resp => {
            console.log("resp in then on post /registration", resp);
            //if everything goes well and the user is registered we redirect him to /ROUTE
            if (resp.data.success) {
                location.replace('/');
            } else {
                this.setState({error: true});
                console.log("Error in registration handleSubmit");
            }
        });
    }

    render() {
        return (
            <div className="registration-container">
                <br />
                {this.state.error && <div>Error, please try again!!</div>}
                <form onSubmit={this.handleSubmit}>
                    <h1>Please Register!!!</h1>
                    <input onChange= {this.handleChange} name="firstname" type="text" placeholder="first name" />
                    <br />
                    <input onChange= {this.handleChange} name="lastname" type="text" placeholder="last name" />
                    <br />
                    <input onChange= {this.handleChange} name="email" type="text" placeholder="email" />
                    <br />
                    <input onChange= {this.handleChange} name="password" type="password" placeholder="password" />
                    <br />

                    <button className="regbutton">Register</button>
                </form>
                <h3>If you are already a member, please <Link to="/login">login!</Link></h3>
            </div>
        );
    }
}
