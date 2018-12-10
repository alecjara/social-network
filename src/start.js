import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from "./welcome";
import App from "./app";
//with Redux
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import {composeWithDevTools} from "redux-devtools-extension";
import reducer from './reducer';
import {Provider} from "react-redux";
//socket.io:
import initSocket from "./socket";


const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let component;
if (location.pathname === "/welcome") {
    //render welcome
    component = <Welcome />;
} else {
    component = (
        //passing store as an argument so the socket function reaches store and dispatch method!
        initSocket(store),
        <Provider store={store}>
            <App />
        </Provider>
    );
}


//ReactDOM should only be called ONCE IN THE WHOLE PROJECT!!!!!
ReactDOM.render(
    component,
    document.querySelector('main')
);
