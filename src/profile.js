import React from 'react';
// import axios from "./axios";
import ProfilePic from "./profilepic";
import Bio from "./bio";


export default function Profile(props) {
    return (
        <div id="profile">
            <ProfilePic showUploader={props.showUploader} profilePicUrl={props.profilePicUrl} />
            {props.firstname} {props.lastname}
            <Bio bio={props.bio} setBio={props.setBio} />
        </div>
    );
}
