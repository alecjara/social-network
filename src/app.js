import React from 'react';
import axios from "./axios";
import Logo from "./logo";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
    }
    //this will be the one to change uploaderIsVisible to true
    //showUploader is a function so it is not in state. I add this also inside the prop ProfilePic below
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        }, () => console.log("state showUploader:", this.state.profilePicUrl));
    }

    hideUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }
    //like mounted on vue:
    //this only runs once the moment we refresh the page and the component renders
    componentDidMount() {
        //console.log("component mounted!!!!!");
        //here is great to do axios request to get data from the server
        //({data}) is destructuring this so we can use data only and before it was resp.data
        axios.get("/user").then(({data}) => {
            console.log("data in /get then:", data.rows[0]);
            this.setState(data.rows[0]);
        });
    }

    //first it renders then it mounts
    render() {
        return (
            <div>
                <Logo />
                <ProfilePic
                    firstname = {this.state.firstname}
                    profilePicUrl = {this.state.profilePicUrl}
                    showUploader = {this.showUploader}
                />

                {this.state.uploaderIsVisible && (<Uploader hideUploader={this.hideUploader}/> )}
                <h1>Welcome to Social Network</h1>
            </div>
        );

    }
}
