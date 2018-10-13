import React, {Component} from 'react'
import { connect } from 'react-redux';
import Question from './Question';
import { handleSetViewMode } from '../actions/viewMode';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import { withRouter } from 'react-router-dom';

class QuestionList extends Component{

  constructor(props){
    super(props);
    this.state={
      activeTab: "unanswered",
      filteredQuestions : this.filterQuestions("unanswered")
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

  filterQuestions(activeTab){
    switch(activeTab) {
      case "unanswered":
        return this.getUnansweredQuestions();
      case "answered":
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
        <div className="questions">
          <Nav tabs className="questionsTabs">
            <NavItem>
              <NavLink
                className ={this.state.activeTab==="unanswered" ? "active" : ""}
                onClick={()=>this.onToggle("unanswered")}
              >
                Unanswered Questions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className = {this.state.activeTab==="answered" ? "active" : ""}
                onClick={()=>this.onToggle("answered")}
              >
                Answered Questions
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="questionsContent" activeTab={this.state.activeTab}>
            <TabPane tabId={"unanswered"}>
              {this.filterQuestions("unanswered").map(id=>(
                <div key={id}>
                  <Question id={id}/>
                </div>
              ))}
            </TabPane>
            <TabPane tabId={"answered"}>
              {this.filterQuestions("answered").map(id=>(
                <div key={id}>
                  <Question id={id}/>
                </div>
              ))}
            </TabPane>
          </TabContent>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}, props){
  if(authedUser === null) props.history.push("/");
  return{
    authedUser,
    users,
    questions
  }
}

export default withRouter(connect(mapStateToProps)(QuestionList));