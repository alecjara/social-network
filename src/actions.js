import axios from './axios';


export async function receiveFriendsAndWannabes() {
    const { data } = await axios.get('/friendslist');
    //console.log("receiveFriendsAndWannabes:", data);
    return {
        type: 'RECEIVE_FRIENDS_WANNABES',
        friendsAndWannabes: data
    };
}

export async function unfriend(user_id) {
    await axios.post("/deletefriends/" + user_id);
    return {
        type: 'UNFRIEND',
        deletefriend: user_id
    };
}

export async function acceptfriend(user_id) {
    console.log("before!");
    await axios.post("/acceptfriends/" + user_id);
    console.log("after!");
    return {
        type: 'ACCEPT_FRIEND_REQUEST',
        acceptfriend: user_id
    };
}

//part8
export async function onlineUsers(listOfOnlineUsers) {
    return {
        type: 'ONLINE_USERS',
        onlineUsers: listOfOnlineUsers
    };
}

export async function userJoined(userWhoJoined) {
    return {
        type: 'USER_JOINED',
        userJoined: userWhoJoined
    };
}

export async function userLeft(userWhoLeft) {

    return {
        type: 'USER_LEFT',
        userLeft: userWhoLeft
    };
}

export function addMessages(messages) {
    //console.log("action at messages running!");
    return {
        type: 'ADD_MESSAGES',
        addMessages: messages
    };
}

export function singleMessage(singleMessage) {
    return {
        type: "SINGLE_MESSAGE",
        singleMessage: singleMessage
    };
}
