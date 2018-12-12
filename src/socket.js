//this is the client side socket.io:
//all our code today will go here:

import * as io from 'socket.io-client';
import {onlineUsers , userJoined, userLeft, addMessages, singleMessage} from "./actions";

let socket;

export default function initSocket(store) {
    if (!socket) {
        socket = io.connect();
        //most of our client side socket code will go here
        //the way we listen for messages coming from Server
        //2 argumens: 1st is event we are listening for (same name as in index.js)
        //2nd callback function that will run when client hears onlineUsers
        socket.on("onlineUsers", listOfOnlineUsers => {
            //console.log("listOfOnlineUsers:", listOfOnlineUsers);
            //how de we access dispatch and do all the redux if we are not on the component!!!!
            //now that we have store here we can do:
            //here on store.dispatch we will pass an action creator
            store.dispatch(onlineUsers(listOfOnlineUsers));
        });

        socket.on("userJoined", userWhoJoined => {
            store.dispatch(userJoined(userWhoJoined));
        });

        socket.on("userLeft", userWhoLeft => {
            store.dispatch(userLeft(userWhoLeft));
        });

        socket.on("messages", data => {
            //console.log("data:", data);
            store.dispatch(addMessages(data));
        });

        socket.on("singleMessage", data => {
            //console.log("singleMesssage", data );
            store.dispatch(singleMessage(data));
        });
    }
    //never forget this return!!
    return socket;
}
