import React from 'react';

export default function ProfilePic(props) {
    console.log("props:", props);
    return (
        <div>
            <h1>Welcome to profile pic, {props.firstname}</h1>
            <img onClick = {props.showUploader} src = {props.profilePicUrl} />
        </div>
    );
}
