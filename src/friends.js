import React from "react";
import {connect} from "react-redux";

import {receiveFriendsAndWannabes, unfriend, acceptfriend} from "./actions";

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
                <br />
                <span className="friends">Friends</span>
                <div className="lists">
                    {friends.map(friend => {
                        return (
                            <div key={friend.id} id="listinfo">
                                <img id="friendsAndWannabesimg" src = {friend.profilepicurl} />
                                {friend.firstname} {friend.lastname}
                                <br />
                                <button onClick={() => this.props.dispatch(unfriend(friend.id))}>
                                    EndFriendship
                                </button>
                                
                            </div>
                        );
                    }
                    )}
                </div>
                <br />
                <span className="wannabes">Wannabes</span>
                <br />
                {wannabes.map(wannabe => {
                    return (
                        <div key={wannabe.id} id="listinfo">
                            <img id="friendsAndWannabesimg" src = {wannabe.profilepicurl} />
                            {wannabe.firstname} {wannabe.lastname}
                            <br />
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

        friends: list && list.filter(
            user => user.accepted == true
        ),
        //second prop
        wannabes: list && list.filter(
            user => !user.accepted
        ),
    };
}

export default connect(mapStateToProps)(Friends);
