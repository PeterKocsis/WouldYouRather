import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';

class LeaderBoard extends React.Component {
  render(){
    return (
      <div>
        <Navigation/>
        Leaderboard
      </div>
    )
  }
}

function mapStateToProps({users, questions, authedUser}){
  return {
    users,
    questions,
    authedUser
  }
}

export default connect(mapStateToProps)(LeaderBoard);
