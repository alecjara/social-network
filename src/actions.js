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


//here I need 3 action creator:
//1. receiveFriendsAndWannabes (no arguments)
//2. unfriend (id of friend to delete)
//3. acceptedFriendRequest (id of other peson)
