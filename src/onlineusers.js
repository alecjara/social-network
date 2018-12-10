

import React from "react";
import {connect} from "react-redux";

class OnlineUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.user)  {
            return null;
        }

        return (
            <div className="online-container">
                <h1>Online users:</h1>
                {this.props.user && this.props.user.map(online => {
                    return (
                        <div key={online.id}>
                            <img id="onlineimg" src = {online.profilepicurl} />
                            {online.firstname} {online.lastname}
                        </div>
                    );
                }
                )}

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("this are states:", state && state);
    var list = state.onlineUsers;
    return {
        user: list
    };
}

export default connect(mapStateToProps)(OnlineUsers);
