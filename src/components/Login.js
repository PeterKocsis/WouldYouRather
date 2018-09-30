import  React from 'react';
import { connect } from 'react-redux';
import { loginUser } from './../actions/authedUser';
import { IconContext } from 'react-icons';
import {FaUser} from 'react-icons/fa'

class Login extends React.Component {

  state={
    selectedUser : 'None'
  }

  handleChange=(event)=>{
    event.persist();
    const userId = event.target.value;
    this.setState(()=>({
      selectedUser : userId
    }))
  }

  handleSubmit =()=>{
    const {selectedUser} = this.state;
    const {dispatch} = this.props;
    dispatch(loginUser(selectedUser));
  }

  render(){
    const {userData} = this.props;
    const user = this.state.selectedUser ? userData.filter(item=>item.id===this.state.selectedUser)[0] : {};
    return (
      <div className='login'>
        <h3>Sign In</h3>
        <div>
          {this.state.selectedUser==='None'
            ? <IconContext.Provider value={{color:'black', className:'avatar'}}>
                <FaUser/>
              </IconContext.Provider>
            :
              <img
                src={user.avatar}
                className='avatar'
            />
          }
        </div>
          <select value={this.state.selectedUser} onChange={(event)=>this.handleChange(event)}>
            {userData.map(item=>(
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
          <button onClick={this.handleSubmit}>Sign In</button>
      </div>
    )
  }
}

function mapStateToProps({users}){
  let defaultUser = [];
  defaultUser.push({
    id: 'None',
    name: 'None',
    avatar: ''
  });
  let existingUsers = Object.keys(users).map(item=>{
    return {
      id : users[item].id,
      name : users[item].name,
      avatar : users[item].avatarURL
    }});

  return {
    userData: defaultUser.concat(existingUsers)
  }
}

export default connect(mapStateToProps)(Login)