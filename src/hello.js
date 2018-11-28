import React from 'react';
import AquaBox from "./AquaBox";
import Greetee from "./greetee";

export default class Hello extends React.Component {
    //classie components
    constructor(props) {
        //super is React.Component
        super(props);
        //state is like data in vue/ If I want the user to see it, it should use state
        this.state = {
            name: this.props.name
        };
        //do bind (in vue we would use var self = this but it works different here so use bind!!!!!!)
        this.ChangeName = this.ChangeName.bind(this);
        //after I do this my component has a property this.props
        //console.log(this.props);
    }

    // handleChange(e) {
    //     this.setState({
    //         name: e.target.value
    //     });
    // }
    //moving the input to a child component we need to do this different:
    ChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    //every component we make creating a class we render so we return stuff
    render() {
        return (
            <div>
                <h1>Hello!,<AquaBox><Greetee name={this.state.name} /> </AquaBox>!</h1>
                <AquaBox>sneakers</AquaBox>
                <GreeteeChanger />
            </div>
        );
    }
}

function GreeteeChanger(props) {
    return <input onChange={props.handleChange} />
}
