import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import { logoutUser } from '../actions/authedUser';
import { Label, ButtonGroup, Button, Media} from 'reactstrap'
import authedUser from './../reducers/authedUser';

class Navigation extends Component {

  onLogout=()=>{
    const {dispatch} = this.props;
    dispatch(logoutUser());
  }

  onNavigate=(path)=>{
    this.props.history.push(path);
  }

  render(){
    const {userName, userAvatar, authedUser} = this.props;
    return(
      <div className="navigation">
        {authedUser === null
          ? (<Redirect to="/"></Redirect>)
        : (<div className="toTheLeft">
            <ButtonGroup>
              <Button size="lg" onClick={()=>{this.onNavigate("/")}}>Home</Button>
              <Button size="lg" onClick={()=>{this.onNavigate("/add")}}>New Question</Button>
              <Button size="lg" onClick={()=>{this.onNavigate("/leaderboard")}}>Leaderboard</Button>
            </ButtonGroup>
            <img className='avatar' src={userAvatar} alt="Avatar" />
            <Label className='username'>{userName}</Label>
            <Button size="lg" onClick={this.onLogout}>Logout</Button>
          </div>)
        }
      </div>
    )
  }
}

function mapStateToProps({authedUser, users}){
  if(authedUser===null) return {authedUser};
  const userName = users[authedUser].name;
  const userAvatar = users[authedUser].avatarURL;
  return {
    userName,
    userAvatar
  }
}

export default withRouter(connect(mapStateToProps)(Navigation));