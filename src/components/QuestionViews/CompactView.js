import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { setViewMode } from '../../actions/viewMode';
import {Button} from 'reactstrap';

class CompactView extends Component {

  handleViewPoll=()=>{
    const {qustionAnswered, dispatch, question} = this.props;
    if(qustionAnswered){
      dispatch(setViewMode('statistics'));
      this.props.history.push(`/questions/${question.id}`);
    }
    else{
      dispatch(setViewMode('options'));
      this.props.history.push(`/questions/${question.id}`);
    }
  }

  render(){
    return (
      <div className="questionContent">
        <legend>Would You Rather?</legend>
        <p>...{this.props.question.optionOne.text}...</p>
        <Button onClick={this.handleViewPoll}>View Poll</Button>
      </div>
    )
  }
}

function matStateToProps({users, authedUser, dispatch}, {question}){
  const userData = users[authedUser];
  return {
    qustionAnswered : userData.answers[question.id] ? true : false,
    question,
    dispatch
  }
}

export default withRouter(connect(matStateToProps)(CompactView));