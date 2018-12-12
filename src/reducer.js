
export default function reducer (state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        return {
            ...state,
            friendsAndWannabes: action.friendsAndWannabes
        };
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {

        return {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.map(user => {
                if (user.id == action.acceptfriend) {
                    user["accepted"] = true;
                    return user;
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        return {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.filter(user => user.id != action.deletefriend)
        };
    }

    if (action.type == "ONLINE_USERS") {
        return {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }

    if (action.type == "USER_JOINED") {
        return {
            ...state,
            //here map
            onlineUsers: [ ...state.onlineUsers, action.userJoined]
        };
    }

    if (action.type == "USER_LEFT") {
        return {
            ...state,
            onlineUsers: state.onlineUsers.filter(user => user.id != action.userLeft)
        };
    }


    //PART9
    if (action.type == "ADD_MESSAGES") {
        //console.log("action in add messages reducer:", action);
        return {
            ...state,
            addMessages: action.addMessages
        };
    }

    if (action.type == "SINGLE_MESSAGE") {
        console.log("reducer in add single message:", action);
        return {
            ...state,
            addMessages: [...state.addMessages, action.singleMessage]
        };
    }

    return state;

}
