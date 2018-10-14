import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setViewMode } from '../../actions/viewMode';
import { handleSetAnswer } from './../../actions/questions';
import { Button } from 'reactstrap';

class OptionsView extends Component {

  state = {
    selectedOption: 'optionOne'
  }

  onSelectionChange = (option) => {
    console.log(option);
    this.setState(() => ({
      selectedOption: option
    }));
  }

  setAnswer = (e) => {
    e.preventDefault();
    const { dispatch, authedUser, question } = this.props;
    dispatch(handleSetAnswer(authedUser, question.id, this.state.selectedOption));
    dispatch(setViewMode('statistics'));
  }



  render() {
    const { question } = this.props;
    return (
      <div className="questionContent">
        <form id='saveAnswerForm' onSubmit={(e) => this.setAnswer(e)}>
          <legend>Would You Rather?</legend>
          <p><input
            type='radio'
            name='question'
            value='optionOne'
            onChange={(e) => this.onSelectionChange(e.target.value)} />
            {question.optionOne.text}
          </p>
          <p><input
            type='radio'
            name='question'
            value='optionTwo'
            onChange={(e) => this.onSelectionChange(e.target.value)} />
            {question.optionTwo.text}
          </p>
          <Button type='submit'>Submit</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }, { question }) {
  return {
    authedUser,
    question
  }
}

export default connect(mapStateToProps)(OptionsView);