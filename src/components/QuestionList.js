import React, {Component} from 'react'
import { connect } from 'react-redux';
import Question from './Question';
import { handleSetViewMode } from '../actions/viewMode';
import Navigation from './Navigation';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom';

class QuestionList extends Component{
  constructor(props){
    super(props);
    this.state={
      questionAnswered: false,
      filteredQuestions : this.filterQuestions(false),
      activeTab: '1'
    }
    this.props.dispatch(handleSetViewMode('compact'));
  }

  onToggle=(tab)=>{
    if(this.state.activeTab !== tab){
      this.setState({
        activeTab: tab
      });
    }
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
          <Nav tabs>
            <NavItem>
              <NavLink
                className ={this.state.activeTab==='1' ? "active" : ""}
                onClick={()=>this.onToggle('1')}
              >
                Unanswered Questions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className = {this.state.activeTab==='2' ? "active" : ""}
                onClick={()=>this.onToggle('2')}
              >
                Answered Questions
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId='1'>
              {this.filterQuestions(false).map(id=>(
                <div key={id}>
                  <Question id={id}/>
                </div>
              ))}
            </TabPane>
            <TabPane tabId='2'>
              {this.filterQuestions(true).map(id=>(
                <div key={id}>
                  <Question id={id}/>
                </div>
              ))}
            </TabPane>
          </TabContent>
          {/* <input type='checkbox' value={this.state.questionAnswered} onChange={(event)=>this.selectQuestions(event)}/>
          <h4>Show All Question</h4>
          <br/>
            {this.state.filteredQuestions.map(id=>(
              <div key={id}>
                <Question id={id}/>
              </div>
            ))} */}
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