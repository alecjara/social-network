import React from "react";
import {connect} from "react-redux";
//we import like that to use like this: receiveFriendsAndWannabes();
import {receiveFriendsAndWannabes, unfriend, acceptfriend} from "./actions";
// import { Link } from 'react-router-dom';

//DO NOT EXPORT THIS COMPONENT!!!!!
class Friends extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(receiveFriendsAndWannabes());
    }

    render() {
        const {friends, wannabes} = this.props;
        if (!friends ) {
            return null;
        }
        if (!wannabes) {
            return null;
        }


        return (
            <div className="lists-container">
                <h1>Friends</h1>
                <div className="lists">
                    {friends.map(friend => {
                        return (
                            <div key={friend.id}>
                                <img id="friendsAndWannabesimg" src = {friend.profilepicurl} />
                                {friend.firstname} {friend.lastname}
                                <button onClick={() => this.props.dispatch(unfriend(friend.id))}>
                                    EndFriendship
                                </button>
                            </div>
                        );
                    }
                    )}
                </div>
                <h1>Wannabes</h1>
                {wannabes.map(wannabe => {
                    return (
                        <div key={wannabe.id}>
                            <img id="friendsAndWannabesimg" src = {wannabe.profilepicurl} />
                            {wannabe.firstname} {wannabe.lastname}
                            <button onClick={() => this.props.dispatch(acceptfriend(wannabe.id))}>
                                AcceptFriendRequest
                            </button>
                        </div>
                    );
                }
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    var list = state.friendsAndWannabes;
    return {
        //one prop
        friends: list && list.filter(
            //the ones who aren't friends get filtered out
            user => user.accepted == true
        ),
        //second prop
        wannabes: list && list.filter(
            user => !user.accepted
        ),
    };
}



export default connect(mapStateToProps)(Friends);



//On each friend element we need onClick that dispatches the unfriend action. pass id of friend
//on each wannabe element we need onClick (read rest of info from David's list)

//NOT SURE IF THIS NEXT THING GOES IN THIS FILE BUT I THINK SO!!!
//redux state:
// {
//     friendsAndWannabes: [
//         {
//             accepted: true
//         },
//         {
//             accepted: false
//         }
//     ]
// }
