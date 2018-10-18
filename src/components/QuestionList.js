import React, { Component } from 'react'
import { connect } from 'react-redux';
import Question from './Question';
import { setViewMode } from '../actions/viewMode';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class QuestionList extends Component {

  componentDidMount(){
    this.props.dispatch(setViewMode('compact'));
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTab: "unanswered",
      filteredQuestions: this.filterQuestions("unanswered")
    }
  }

  onToggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  filterQuestions(activeTab) {
    switch (activeTab) {
      case "unanswered":
        return this.getUnansweredQuestions();
      case "answered":
        return this.getAnsweredQuestions();
      default:
        return this.getUnansweredQuestions();
    }
  }

  getAnsweredQuestions() {
    const { authedUser, users, questions } = this.props;
    let userData = users[authedUser];
    if (!userData) return [];
    return Object.keys(userData.answers).sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  }

  getUnansweredQuestions() {
    const { authedUser, users, questions } = this.props;
    let userData = users[authedUser];
    if (!userData) return [];
    const unansweredQuestions = Object.keys(questions).filter(item => !userData.answers.hasOwnProperty(item));
    return unansweredQuestions.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  }

  render() {
    return (
      <div className="container">
        <div className="questions">
          <Nav tabs className="questionsTabs">
            <NavItem>
              <NavLink
                className={this.state.activeTab === "unanswered" ? "active" : ""}
                onClick={() => this.onToggle("unanswered")}
              >
                <h4>Unanswered Questions</h4>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={this.state.activeTab === "answered" ? "active" : ""}
                onClick={() => this.onToggle("answered")}
              >
                <h4>Answered Questions</h4>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="questionsContent" activeTab={this.state.activeTab}>
            <TabPane tabId={"unanswered"}>
              {this.filterQuestions("unanswered").map(id => (
                <div key={id}>
                  <Question id={id} />
                </div>
              ))}
            </TabPane>
            <TabPane tabId={"answered"}>
              {this.filterQuestions("answered").map(id => (
                <div key={id}>
                  <Question id={id} />
                </div>
              ))}
            </TabPane>
          </TabContent>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  if (authedUser === null) props.history.push("/");
  return {
    authedUser,
    users,
    questions
  }
}

export default withRouter(connect(mapStateToProps)(QuestionList));