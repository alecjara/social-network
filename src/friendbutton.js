import React from 'react';
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "",
            clickAction: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        //console.log("clicked!!!");
        if (this.state.clickAction == "makeFriend" ) {
            axios.post("/friends2/" + this.props.otherUserId).then(data => {
                console.log("friends2 axios post:", data);
                this.setState({
                    buttonText: "Cancel Friedn Request",
                    clickAction: "cancelFriend"
                });
            });
        }

        if (this.state.clickAction == "cancelFriend" ) {
            axios.post("/cancelfriends/" + this.props.otherUserId).then(data => {
                console.log("cancelfriend axios post:", data);
                this.setState({
                    buttonText: "Accept Request",
                });
            });
        }
    }



    componentDidMount() {
        axios.get("/friends/" + this.props.otherUserId).then((data) => {
            console.log("data in axios friendbutton:", data);

            if (data.length) {
                console.log("there is date inside the array");
            } else {
                this.setState({
                    buttonText: "Send Friend Request",
                    clickAction: "makeFriend"
                });
            }

        //     }).catch(error => {
        //         console.log("error get componentDidMount:", error);

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
