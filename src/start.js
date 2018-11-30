import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from "./welcome";
import App from "./app";

let component;
if (location.pathname === "/welcome") {
    //render welcome
    component = <Welcome />;
} else {
    component = <App />;
}


//ReactDOM should only be called ONCE IN THE WHOLE PROJECT!!!!!
ReactDOM.render(
    component,
    document.querySelector('main')
);
