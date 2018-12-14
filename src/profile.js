import React from 'react';
import ProfilePic from "./profilepic";
import Bio from "./bio";


export default function Profile(props) {
    return (
        <div id="profile">
            <ProfilePic showUploader={props.showUploader} profilePicUrl={props.profilePicUrl || "/profile.png"} />
            <br/>
            {props.firstname} {props.lastname}
            <Bio bio={props.bio} setBio={props.setBio} />
        </div>
    );
}
