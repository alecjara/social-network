//this component has one job: render the registration component inside a container
//welcome only renders if the user is on the /welcome route
//in the server is where we will check if the user is logged in on the / route or not yet and he is at the /welcome
//we don't need state on the welcome component so here is just a functional component because it doesn't need to know whether
//the user is logged in or not:
import React from 'react';
import Registration from "./registration";
//components are always with capital letters (if it is not caps then react will read it as html instead of react)
//we need to export this so we can use it in other files so we add export default
export default function Welcome() {
    return (
        <div className="welcomecontainer">
            <h1>Welcome!</h1>
            <Registration />
        </div>
    );
}
