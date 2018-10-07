import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { handleSetViewMode } from '../../actions/viewMode';

class CompactView extends Component {

  handleViewPoll=()=>{
    const {qustionAnswered, dispatch, question} = this.props;
    if(qustionAnswered){
      dispatch(handleSetViewMode('statistics'));
      this.props.history.push(`/questions/${question.id}`);
    }
    else{
      dispatch(handleSetViewMode('options'));
      this.props.history.push(`/questions/${question.id}`);
    }
  }

  render(){
    return (
      <div>
        <h3>Would You Rather?</h3>
        <p>...{this.props.question.optionOne.text}...</p>
        <button onClick={this.handleViewPoll}>View Poll</button>
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