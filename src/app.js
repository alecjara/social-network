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
        this.updateImage = this.updateImage.bind(this);
    }

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

    updateImage(cUrl) {
        this.setState({
            profilePicUrl: cUrl
        });
    }

    componentDidMount() {
        axios.get("/user").then(({data}) => {
            console.log("data in /get then:", data.rows[0]);
            this.setState(data.rows[0]);
        });
    }

    //first it renders then it mounts
    render() {
        return (
            <div>
                <h1>Welcome to Social Network</h1>
                <Logo />
                <ProfilePic
                    firstname = {this.state.firstname}
                    profilePicUrl = {this.state.profilePicUrl ? this.state.profilePicUrl: "/profile.png"}
                    showUploader = {this.showUploader}
                />
                {this.state.uploaderIsVisible && (<Uploader hideUploader={this.hideUploader} updateImage={this.updateImage}/> )}
            </div>
        );

    }
}
