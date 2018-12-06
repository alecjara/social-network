import React from 'react';
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        //console.log("clicked!!!");
        if (this.state.click == "makeFriend" ) {
            axios.post("/friends2/" + this.props.otherUserId).then(() => {
                //console.log("friends2 axios post:", data);
                this.setState({
                    buttonText: "Cancel Friend Request",
                    click: "cancelFriend"
                });
            });
        }

        if (this.state.click == "cancelFriend" ) {
            axios.post("/cancelfriends/" + this.props.otherUserId).then(() => {
                //console.log("cancelfriend axios post:", data);
                this.setState({
                    buttonText: "Make Friend Request",
                    click: "makeFriend"
                });
            });
        }

        if (this.state.click == "acceptFriend" ) {
            axios.post("/acceptfriends/" + this.props.otherUserId).then(() => {
                //console.log("cancelfriend axios post:", data);
                this.setState({
                    buttonText: "End Friendship",
                    click: "deleteFriend"
                });
            });
        }

        if (this.state.click == "deleteFriend" ) {
            axios.post("/deletefriends/" + this.props.otherUserId).then(() => {
                //console.log("cancelfriend axios post:", data);
                this.setState({
                    buttonText: "Make Friend Request",
                    cick: "makeFriend"
                });
            });
        }

    }






    componentDidMount() {
        axios.get("/friends/" + this.props.otherUserId).then((data) => {
            console.log("data in axios friendbutton:", data);

            if (data.length) {
                if (data.rows[0].accepted) {
                    console.log("there is data inside the array");
                    this.setState({
                        buttonText: "End Friendship",
                        click: "deleteFriend"
                    });
                } else {
                    if (this.props.otherUserId == data.rows[0].receiver) {
                        this.setState({
                            buttonText: "Cancel Friend Request",
                            click: "cancelFriend"
                        });
                    } else {
                        this.setState({
                            buttonText: "Accept Friend Request",
                            click: "acceptFriend"
                        });
                    }
                }
            } else {
                this.setState({
                    buttonText: "Make Friend Request",
                    click: "makeFriend"
                });
            }
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>{this.state.buttonText}</button>


            </div>
        );
    }
}

//we want the most recent id, do orderby created at desc or asc, the newest at the top
//but I want the firstone for data.rows[0] (add this in the query)
//then do the logic based on that one
