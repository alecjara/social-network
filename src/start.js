import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from "./welcome";
import Logo from "./logo";
import Login from "./login";
//to put html on the page! this is the only place where we need to add ReactDOM but react
//needs to be imported in many places.
//I can do something like this:
// const elem = <h1>add here text</h1> and render elem inside < /> and I get whatever text I put inside here

let component;
if (location.pathname === "/welcome") {
    //render welcome
    component = <Welcome />;
}

if (location.pathname ==="/") {
    component = <Logo />;
}

if (location.pathname ==="/login") {
    component = <Login />;
}

//ReactDOM should only be called ONCE IN THE WHOLE PROJECT!!!!!
ReactDOM.render(
    component,
    document.querySelector('main')
);

// function Hello(props) {
//     //we could do this instead of using CSS:
//     var myStyle = {
//         color: 'tomato',
//         fontSize: '30px'
//     };
//         //the () allows me only to have the div in a next line, it allows formatting
//     return (
//         //we can only use ONE ELEMENT HERE but I can put everything inside a <div>
//         //to make it dynamic here is single { }
//         //we cannot use div class= so we can use className=
//         <div style={myStyle} className={"pretty" + Date.now()}>
//             <h1>Hello, {props.name}!</h1>
//         </div>
//     );
// }
