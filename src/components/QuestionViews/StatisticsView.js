import React, {Component} from 'react';
import { connect } from 'react-redux';
import {CardTitle, Card, Progress, Badge} from 'reactstrap';

class StatisticsView extends Component {
  render(){
    const {question, numberOfVotes, userVoted} = this.props;
    const optionOneVoteCount = question.optionOne.votes.length;
    const optionTwoVoteCount = question.optionTwo.votes.length;
    return(
      <div className="questionContent">
        <legend>Results:</legend>
        <Card className="questionStatistics">
          {userVoted==="optionOne" && (<Badge style={{width:"50px", marginLeft:"auto"}} color="warning">Your Vote</Badge>)}
          <CardTitle><div><span>Would you rather {question.optionOne.text}?</span></div></CardTitle>
          <Progress style={{height:"20px"}} className="progress" color="success" value={optionOneVoteCount} max={numberOfVotes}>{optionOneVoteCount/numberOfVotes*100}%</Progress>
          <div className="text-center">{`${optionOneVoteCount} of ${numberOfVotes}`}</div>
        </Card>
        <Card className="questionStatistics">
          {userVoted==="optionTwo" && (<Badge style={{width:"50px", marginLeft:"auto"}} color="warning">Your Vote</Badge>)}
          <CardTitle>Would you rather {question.optionTwo.text}?</CardTitle>
          <Progress style={{height:"20px"}} className="progress" color="success" value={optionTwoVoteCount} max={numberOfVotes}>{optionTwoVoteCount/numberOfVotes*100}%</Progress>
          <div className="text-center">{`${optionTwoVoteCount} of ${numberOfVotes}`}</div>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users}, {question}){
  const userVoted = users[authedUser].answers[question.id];
  const numberOfVotes = question.optionOne.votes.length + question.optionTwo.votes.length
  return {
    userVoted,
    question,
    numberOfVotes
  }
}

export default connect(mapStateToProps)(StatisticsView);