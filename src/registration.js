import React from 'react';
import axios from "axios";
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
        console.log("name of input:", e.target.name);
        this.setState({
            [e.target.name]: e.target.value
            //we add a callback function to console.log this.state and we do this after the } before the )
        }, () => console.log("this state in handleChange:", this.state));

    }


    handleSubmit(e) {
        //we need this so we can stop our page to reload when we click register button.
        e.preventDefault();
        console.log("handleSubmit Running!:", this.state);
        axios.post('/registration', this.state).then(resp => {
            console.log("resp in then on post /registration", resp);
            //if everything goes well and the user is registered we redirect him to /ROUTE
            if (resp.data.success) {
                location.replace('/');
            } else {
                this.setState({error: true});
                console.log("Error in handleSubmit");
            }
        });
    }

    render() {
        return (
            <div className="registration-container">
                <h1>Please Register!!!</h1>
                {this.state.error && <div>Error, please try again!!</div>}
                <form onSubmit={this.handleSubmit}>
                    <input onChange= {this.handleChange} name="firstname" type="text" placeholder="first name" />
                    <input onChange= {this.handleChange} name="lastname" type="text" placeholder="last name" />
                    <input onChange= {this.handleChange} name="email" type="text" placeholder="email" />
                    <input onChange= {this.handleChange} name="password" type="password" placeholder="password" />
                    <button>Register</button>
                </form>
                <h3>If you are already a member, please <a href="login">log in</a></h3>
            </div>
        );
    }
}
