//this component has one job: render the registration component inside a container
//welcome only renders if the user is on the /welcome route
//in the server is where we will check if the user is logged in on the / route or not yet and he is at the /welcome
//we don't need state on the welcome component so here is just a functional component because it doesn't need to know whether
//the user is logged in or not:
import React from 'react';
import Registration from "./registration";
import Login from "./login";
//react router: HashRouter, BrowserRouter(don't add a hash in the url)
//for the not logged in we use HashRouter and for logged it we will use BrowserRouter
import {HashRouter, Route} from "react-router-dom";
//components are always with capital letters (if it is not caps then react will read it as html instead of react)
//we need to export this so we can use it in other files so we add export default
export default function Welcome() {
    return (
        <div className="welcome-container">
            <h1>Welcome!</h1>

            <HashRouter>
                <div>
                    <Route exact path = "/" component = {Registration} />
                    <Route path = "/login" component= {Login} />
                </div>
            </HashRouter>

        </div>
    );
}
// INSIDE THE <HashRouter> we are doing this with Route ...:
// if (the url is /), then render Registration
// if (the url is /login), then render the Login component

//we cannot use <a> in React we need to use Link!
