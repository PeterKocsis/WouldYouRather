import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/authedUser';
import { Label, ButtonGroup, Button, ButtonToolbar } from 'reactstrap'
import authedUser from './../reducers/authedUser';

class Navigation extends Component {

  onLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  onNavigate = (path) => {
    this.props.history.push(path);
  }

  render() {
    const { users, loggedIn, authedUser } = this.props;
    return (
      <div className="navigation">
        <div className="toTheLeft">
          <ButtonToolbar>
            <ButtonGroup>
              <Button size="lg" onClick={() => { this.onNavigate("/") }}>Home</Button>
              <Button size="lg" onClick={() => { this.onNavigate("/add") }}>New Question</Button>
              <Button size="lg" onClick={() => { this.onNavigate("/leaderboard") }}>Leaderboard</Button>
            </ButtonGroup>
            {loggedIn &&
              (<ButtonGroup>
                <img className='avatar' src={users[authedUser].avatarURL} alt="Avatar" />
                <Label className='username'>{users[authedUser].username}</Label>
                <Button size="lg" onClick={this.onLogout}>Logout</Button>
              </ButtonGroup>)
            }
          </ButtonToolbar>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    users,
    authedUser,
    loggedIn: authedUser !== null,
  };
}

export default withRouter(connect(mapStateToProps)(Navigation));