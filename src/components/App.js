import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleReceiveQuestions } from './../actions/questions';
import {handleReceiveUsers} from './../actions/users'
import Login from './Login';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleReceiveQuestions())
    this.props.dispatch(handleReceiveUsers())
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className='container'>
          <Login/>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}


export default connect(mapStateToProps)(App);
