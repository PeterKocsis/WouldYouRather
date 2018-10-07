import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleReceiveQuestions } from './../actions/questions';
import {handleReceiveUsers} from './../actions/users'
import Login from './Login';
import QuestionList from './QuestionList';
import {handleSetViewMode} from './../actions/viewMode';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import QuestionPage from './QuestionPage';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleReceiveQuestions())
    this.props.dispatch(handleReceiveUsers())
    this.props.dispatch(handleSetViewMode('compact'))
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
          </header>
          <div className='container'>
            <Route exact path="/" render={()=>(
              this.props.loading
                ? (<Login/>)
                : (<QuestionList/>)
            )}>
            </Route>
            <Route path="/questions/:id" component={QuestionPage}/>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}


export default connect(mapStateToProps)(App);
