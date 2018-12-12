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
        //console.log("buttonTexted!!!");
        if (this.state.buttonText == "MakeFriendRequest" ) {
            axios.post("/friends2/" + this.props.otherUserId).then(() => {
                //console.log("friends2 axios post:", data);
                this.setState({
                    buttonText: "CancelFriendRequest"
                });
            });
        }

        if (this.state.buttonText == "AcceptFriendRequest" ) {
            axios.post("/acceptfriends/" + this.props.otherUserId).then(() => {
                //console.log("cancelfriend axios post:", data);
                this.setState({
                    buttonText: "EndFriendship"
                });
            });
        }

        if (this.state.buttonText == "CancelFriendRequest" ) {
            axios.post("/cancelfriends/" + this.props.otherUserId).then(() => {
                //console.log("cancelfriend axios post:", data);
                this.setState({
                    buttonText: "MakeFriendRequest"
                });
            });
        }


        if (this.state.buttonText == "EndFriendship" ) {
            axios.post("/deletefriends/" + this.props.otherUserId).then(() => {
                //console.log("cancelfriend axios post:", data);
                this.setState({
                    buttonText: "MakeFriendRequest"
                });
            });
        }

    }





    componentDidMount() {
        axios.get("/friends/" + this.props.otherUserId).then((data) => {
            //console.log("data in axios friendbutton:", data);

            // if (data.length) {
            if (data.data.rows.length == 0) {
                console.log("get friends data.rows[0]:", data.data.rows);
                this.setState({
                    buttonText: "MakeFriendRequest"
                });
            } else if (data.data.rows[0].receiverid == this.props.otherUserId && data.data.rows[0].accepted == false) {
                this.setState({
                    buttonText: "CancelFriendRequest"
                });
            } else if (!data.data.rows[0].accepted) {
                this.setState({
                    buttonText: "AcceptFriendRequest"
                });
            } else if (data.data.rows[0].accepted) {
                this.setState({
                    buttonText: "EndFriendship"
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
