import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from './../actions/authedUser';
import { Button, Card, CardBody, CardHeader, CardTitle, CardSubtitle } from 'reactstrap';
import Select from 'react-select';

class Login extends React.Component {

  state = {
    selectedUser: null
  }

  handleChange = (selectedOption) => {
    console.log(selectedOption);
    this.setState(() => ({
      selectedUser: selectedOption
    }));
  }

  handleSubmit = () => {
    const { selectedUser } = this.state;
    const { dispatch } = this.props;
    if (selectedUser !== null) {
      dispatch(loginUser(selectedUser.value));
    }
  }

  render() {
    const { userData } = this.props;
    const { selectedUser } = this.state;
    const options = userData.map(item => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    const imgSource = selectedUser === null ? "https://avatarfiles.alphacoders.com/125/125043.jpg" : userData.filter(item => item.id === selectedUser.value)[0].avatar;
    return (
      <div className='container'>
        <Card className="question">
          <CardHeader style={{ textAlign: "center" }}>
            <CardTitle tag="h4">Welcome to the Would You Rather App!</CardTitle>
            <CardSubtitle tag="h5">Please sign in to continue</CardSubtitle>
          </CardHeader>
          <CardBody style={{ margin: "auto" }}>
            <img
              className="loginAvatar"
              width="200px"
              src={imgSource}
              alt="User Avatar"
              style={{ borderRadius: "20px" }}>
            </img>
          </CardBody>
          <Select
            placeholder="Select User"
            onChange={this.handleChange}
            value={this.state.selectedUser}
            options={options} />
          <Button size="lg" onClick={this.handleSubmit}>Sign In</Button>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  let existingUsers = Object.keys(users).map(item => {
    return {
      id: users[item].id,
      name: users[item].name,
      avatar: users[item].avatarURL
    }
  });

  return {
    userData: existingUsers
  }
}

export default connect(mapStateToProps)(Login)