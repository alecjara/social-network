import React from 'react';
import axios from "./axios";
import Logo from "./logo";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import {BrowserRouter, Route} from "react-router-dom";
import Profile from "./profile";


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: true
        }, () => console.log("state showUploader:", this.state.profilepicurl));
    }

    hideUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }

    updateImage(cUrl) {
        this.setState({
            profilepicurl: cUrl
        });
    }

    setBio(bio) {
        this.setState({
            bio: bio
        });
    }

    componentDidMount() {
        axios.get("/user").then(({data}) => {
            console.log("data in /get then:", data);
            this.setState(data);
        });
    }

    render() {
        return (
            <div>
                <div id="top-container">
                    <Logo />
                    <ProfilePic
                        firstname = {this.state.firstname}
                        lastname = {this.state.lastname}
                        profilePicUrl = {this.state.profilepicurl ? this.state.profilepicurl : "/profile.png"}
                        showUploader = {this.showUploader}
                    />
                </div>
                <div>
                    <BrowserRouter>
                        <div id="probio">
                            <Route exact path="/" render={() => {
                                return <Profile
                                    id = {this.state.id}
                                    firstname = {this.state.firstname}
                                    lastname = {this.state.lastname}
                                    profilePicUrl = {this.state.profilepicurl}
                                    bio = {this.state.bio}
                                    setBio = {this.setBio}
                                    showUploader = {this.showUploader}
                                />;
                            }} />
                        </div>
                    </BrowserRouter>
                </div>

                {this.state.uploaderIsVisible && (<Uploader hideUploader={this.hideUploader} updateImage={this.updateImage}/> )}
            </div>
        );

    }
}
