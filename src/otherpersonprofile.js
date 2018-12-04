import React from 'react';
import axios from "./axios";
//import {Link} from "react-router-dom";

export default class OtherPersonProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get(`/user/${this.props.match.params.id}/info`).then(({data}) => {
            console.log("data in /get then of otherpersonprofile:", data);
            if (data.data.rows.length == 0 || data.user_id == `${this.props.match.params.id}`
            ) {
                this.props.history.push("/");
            } else {
                this.setState(data.data.rows[0]);
            }
            //redirects user to / route: use this if user writes nonsense in url
        }).catch(error => {
            console.log("error get user id SPICED:", error);
        });
    }

    render() {
        return (
            <div className="opp-container">
                <img className="userpic" onClick = {this.state.showUploader} src = {this.state.profilepicurl ? this.state.profilepicurl : "/profile.png"} />
                {this.state.firstname} {this.state.lastname}
                <br />
                {this.state.email}
                <br />
                {this.state.bio}


            </div>
        );
    }}

// <OtherPersonProfile profilePicUrl={this.props.profilePicUrl} />
// {this.props.firstname} {this.props.lastname}

// <h1>{}</h1>

// part 6
//THE BUTTON GOES HERE!!!!!!!!!!!!!!!!
// <FriendButton otherUserId = {this.props.match.params.id} />
//when the friend button mounts passes as a parameter

// req.session.user_id
//component will get back the info of what it needs to render (accepted boolean and the receiverid and it figures out what the button should say)
//
// The Route should return
