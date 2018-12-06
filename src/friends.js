// import {connect} from "react-redux";
// import {receiveFriendsAndWannabes, unfriend, acceptedFriendRequest} from "./actions"
//we import like that to use like this: receiveFriendsAndWannabes();

//DO NOT EXPORT THIS COMPONENT!!!!!
//THIS SHOULD BE A CLASS!!! because we want componentDidMount here!!
//in componentDidMount use this:
//this.props.dispatch(
//receiveFriendsAndWannabes()
//)
// componentDidMount I dispatch the action for receiving a list of friends and wannabes USE this.props.dispatch

//Do this function HERE!!!
// function mapStateToProps(state) {
//     var list = state.RECEIVE_FRIENDS_WANNABES;
//     return {
//         //one prop
//         friends: list && list.filter(
//             //the ones who aren't friends get filtered out
//             user => user.accepted == true
//         ),
//         //second prop
//         wannabes: list && list.filter(
//             user => !user.accepted
//         ),
//
//
//     };
// }

//need a render method to render the two different lists this.props.friends and this.props.wannabes
// render() {
//     return (
//         <div>
//         <h1>Friends</h1>
//  -----------HERE IS HOW WE DO THE LOOP!!!!!!!!!!!!!!!!!
//         {this.props.friends.map(
//             friend => {
//                 return (
//                     <div key={friend.id onClick={//here I dispatch the action}}>
//                         <img src = {friend.url} />
//                         {friend.fristname} {friend.lastname}
//                     </div>
//                 )
//             }
//         )}
//         </div>
//     )
// }


//call connect and pass it the mapStateToProps function i defined i get back a function that i should call
//and pass it the friends component you've created
//Export the result of that (we don't export this whole file but the result here below)
// export default connect(mapStateToProps)(friends);

//On each friend element we need onClick that dispatches the unfriend action. pass id of friend
//on each wannabe element we need onClick (read rest of info from David's list)

//NOT SURE IF THIS NEXT THING GOES IN THIS FILE BUT I THINK SO!!!
//redux state:
// {
//     friendsAndWannabes: [
//         {
//             accepted: true
//         },
//         {
//             accepted: false
//         }
//     ]
// }
