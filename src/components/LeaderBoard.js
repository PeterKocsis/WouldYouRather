import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LeaderBoard extends Component {
  render(){
    const {loggedIn} = this.props;
    return (
      <div>
        {loggedIn
          ? (<p>LeaderBoard</p>)
          : (<Redirect to="/"/>)}
      </div>
    )
  }
}

function mapStateToProps({users, questions, authedUser}){
  const loggedIn = authedUser===null ? false : true;
  if(loggedIn) {
    return {
      loggedIn
    }
  }
  return {
    users,
    questions,
    authedUser,
    loggedIn
  }
}

export default connect(mapStateToProps)(LeaderBoard);