import React from 'react';

export default function ProfilePic(props) {
    console.log("props:", props);
    return (
        <div>
            <h3>Welcome, {props.firstname} {props.lastname}</h3>
            <img className="profilepic" onClick = {props.showUploader} src = {props.profilePicUrl} />
        </div>
    );
}
