import React, {Component} from 'react';
import { connect } from 'react-redux';

class OptionsView extends Component {
  render(){
    const {question} = this.props;
    return(
      <div>
        <h3>Would You Rather?</h3>
        <form onSubmit={this.setAnswer}>
          <p>
            <input type='radio' name='question' value={question.optionOne.text}/> {question.optionOne.text}
          </p>
          <p>
            <input type='radio' name='question' value={question.optionTwo.text}/> {question.optionTwo.text}
          </p>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({authedUser}, {question}){
  return {
    authedUser,
    question
  }
}

export default connect(mapStateToProps)(OptionsView);