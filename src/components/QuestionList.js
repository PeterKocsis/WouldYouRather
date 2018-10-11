import React, {Component} from 'react'
import { connect } from 'react-redux';
import Question from './Question';
import { handleSetViewMode } from '../actions/viewMode';
import Navigation from './Navigation';

class QuestionList extends Component{
  constructor(props){
    super(props);
    this.state={
      questionAnswered: false,
      filteredQuestions : this.filterQuestions(false)
    }
    this.props.dispatch(handleSetViewMode('compact'));
  }

  selectQuestions=()=>{
    this.setState(()=>({
      questionAnswered : !this.state.questionAnswered,
      filteredQuestions : this.filterQuestions(!this.state.questionAnswered)
    }));
  }

  filterQuestions(questionAnswered){
    switch(questionAnswered) {
      case false:
        return this.getUnansweredQuestions();
      case true:
        return this.getAnsweredQuestions();
      default:
        return this.getUnansweredQuestions();
    }
  }

  getAnsweredQuestions(){
    const {authedUser, users} = this.props;
    let userData = users[authedUser];
    if(!userData) return [];
    return Object.keys(userData.answers);
  }

  getUnansweredQuestions(){
    const {authedUser, users, questions} = this.props;
    let userData = users[authedUser];
    if(!userData) return [];
    return Object.keys(questions).filter(item=>!userData.answers.hasOwnProperty(item));
  }

  render(){
    return(
      <div className="container">
        <Navigation></Navigation>
        <div className="questions">
          <input type='checkbox' value={this.state.questionAnswered} onChange={(event)=>this.selectQuestions(event)}/>
          <h4>Show All Question</h4>
          <br/>
          <ul>
            {this.state.filteredQuestions.map(id=>(
              <li key={id}>
                <Question id={id}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}){
  return{
    authedUser,
    users,
    questions
  }
}

export default connect(mapStateToProps)(QuestionList)