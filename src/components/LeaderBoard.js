import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserProfile from './UserProfile';

const LeaderBoard = (props) => {
  const { loggedIn, orderedUsersList } = props;
  return (
    <div>
      {loggedIn
        ? (<div className="question">
          {orderedUsersList.map((item) => (
            <UserProfile key={item.userId} userData={item} />
          ))}
        </div>)
        : (<Redirect to="/" />)}
    </div>
  )
}

function mapStateToProps({ users, authedUser }) {
  const loggedIn = authedUser === null ? false : true;
  const userWithScore = Object.keys(users).map(userId => {
    const voteNumber = Object.keys(users[userId].answers).length;
    const questionNumber = users[userId].questions.length;
    const finalScore = voteNumber + questionNumber;
    return {
      userId,
      voteNumber,
      questionNumber,
      finalScore
    }
  });
  const orderedUsersList = userWithScore.sort((a, b) => b.finalScore - a.finalScore);
  if (!loggedIn) {
    return {
      loggedIn
    }
  }
  return {
    orderedUsersList,
    loggedIn
  }
}

export default connect(mapStateToProps)(LeaderBoard);