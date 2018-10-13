import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/authedUser';
import { ButtonGroup, Button, ButtonToolbar, Badge } from 'reactstrap'

class Navigation extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   activeButton: "Home"
    // }
  }

  onLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  onNavigate = (path) => {
    // this.setState({
    //   activeButton: this.onNavigationChange(path)
    // });
    this.props.history.push(path);
  }

  onNavigationChange = (nav) => {
    switch (nav) {
      case "/":
        return "Home";
      case "/add":
        return "CreateQuestion";
      case "/leaderboard":
        return "Leaderboard";
      default:
        return "Home";
    }
  }

  render() {
    const { users, loggedIn, authedUser } = this.props;
    return (
      <div className="navigation">
          <ButtonToolbar className="toolbar">
              <ButtonGroup>
                <Button
                  size="lg"
                  //className={this.state.activeButton === "Home" ? "active" : ""}
                  onClick={() => { this.onNavigate("/") }}>
                  Home
                </Button>
                <Button
                  size="lg"
                  //className={this.state.activeButton === "CreateQuestion" ? "active" : ""}
                  onClick={() => { this.onNavigate("/add") }}>
                  New Question
                </Button>
                <Button
                  size="lg"
                  //className={this.state.activeButton === "Leaderboard" ? "active" : ""}
                  onClick={() => { this.onNavigate("/leaderboard") }}>
                  Leaderboard
                </Button>
              </ButtonGroup>
            {loggedIn &&
              (<ButtonGroup style={{marginLeft:"auto"}}>
                  <Button size="lg" outline color="secondary">
                    <img
                      className='avatar'
                      src={users[authedUser].avatarURL}
                      alt="Avatar" />
                      <span>{users[authedUser].name}</span>
                  </Button>
                  <Button size="lg" onClick={this.onLogout}>Logout</Button>
              </ButtonGroup>)
            }
          </ButtonToolbar>
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