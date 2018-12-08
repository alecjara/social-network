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
