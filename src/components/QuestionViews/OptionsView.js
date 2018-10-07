import React, {Component} from 'react';
import { connect } from 'react-redux';
import { handleSetViewMode } from '../../actions/viewMode';
import { handleSetAnswer } from './../../actions/questions';
import { handleAddAnswer } from '../../actions/users';

class OptionsView extends Component {

  state={
    selectedOption : 'optionOne'
  }

  onSelectionChange=(option)=>{
    console.log(option);
    this.setState(()=>({
      selectedOption : option
    }));
  }

  setAnswer=()=>{
    const {dispatch, authedUser, question} = this.props;
    dispatch(handleSetViewMode('statistics'));
    dispatch(handleSetAnswer(authedUser, question.id, this.state.selectedOption));
    dispatch(handleAddAnswer(authedUser, question.id, this.state.selectedOption));
  }



  render(){
    const {question} = this.props;
    return(
      <div>
        <h3>Would You Rather?</h3>
        <form onSubmit={this.setAnswer}>
          <p>
            <input type='radio' name='question' value='optionOne' onChange={(e)=>this.onSelectionChange(e.target.value)}/> {question.optionOne.text}
          </p>
          <p>
            <input type='radio' name='question' value='optionTwo'onChange={(e)=>this.onSelectionChange(e.target.value)}/> {question.optionTwo.text}
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