//class 11.12 part9

import React from "react";
import {connect} from "react-redux";
//to be able to emit a message from client to server we need to import the function
import initSocket from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.sendMessage = this.sendMessage.bind(this);
    }



    sendMessage(e) {
        //emiting a message from client to server first part
        let socket = initSocket();


        if (e.which === 13) {
            console.log("user's message:", e.target.value);
            //emiting a message from client to server 2part
            socket.emit("chatMessage", e.target.value);
        }
    }

    componentDidUpdate() {
        //console.log("this.elem:", this.elem);
        //here write code to change the scroll top to bottom to see
        //I might not need this code on my social network
        //this.elem.scrollTop = this.elem.scrollHeight;
    }

    render() {
        //console.log("this.props.messages:", this.props);
        if (!this.props.messages) {
            return null;
        }


        let arrOfMessages = this.props.messages.map((elem, messageId) => {

            //elem is every message in my array
            //console.log("elem:", elem);
            //render de animals arrays
            return (
                <div key={messageId}>
                    <img id="onlineimg" src = {elem.profilepicurl} />
                    {elem.firstname} {elem.lastname}
                    <p>{elem.messages}</p>
                </div>
            );
        });

        return (
            <div className="chat-container">
                <h1>chat running!</h1>
                <div className="messages-container" ref={elem => (this.elem = elem)}>
                    { arrOfMessages }
                </div>
                <textarea name="chat" onKeyDown = {this.sendMessage} id="chattext" placeholder="let's chat"/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    //console.log("state in mapStateToProps", state);
    return {
        messages: state.addMessages
    };

};

export default connect(mapStateToProps)(Chat);

// <p>{arrOfMessages}</p>
