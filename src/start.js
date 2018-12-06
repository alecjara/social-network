import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from "./welcome";
import App from "./app";
//import Provider from "react-redux";


//check what else I need for redux from hotornot and check all imports!!
// const store = createStore(
//     reducer,
//     composeWithDevTools(
//         applyMiddleware(reduxPromise)
//     )
// );
//
// const elem = <Provider store={store}><App /></Provider>
//


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
