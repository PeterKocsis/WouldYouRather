import React, { Component } from 'react';
import { connect } from 'react-redux'
import Login from './Login';
import QuestionList from './QuestionList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuestionPage from './QuestionPage';
import CreateQuestion from './CreateQuestion';
import LeaderBoard from './LeaderBoard';
import Navigation from './Navigation';
import { handleReceiveUsers } from './../actions/users';
import { setViewMode } from '../actions/viewMode';
import { handleReceiveQuestions } from './../actions/questions';
import ContentUnavailable from './ContentUnavailable';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveUsers());
    this.props.dispatch(handleReceiveQuestions());
    this.props.dispatch(setViewMode('compact'));
  }

  render() {
    const { loggedin } = this.props;
    const component = loggedin ? (<QuestionList />) : (<Login />);
    return (
      <Router>
        <div className="App">
          <Navigation></Navigation>
          <div className='container'>
            <Switch>
              <Route exact path="/" render={() => component}></Route>
              <Route path="/questions/:id" component={QuestionPage} />
              <Route path="/add" component={CreateQuestion} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route component={ContentUnavailable}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ viewMode, authedUser }) {
  return {
    loading: viewMode === null,
    loggedin: authedUser !== null
  }
}


export default connect(mapStateToProps)(App);