import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Form, Card, CardHeader, CardBody, CardTitle, FormGroup, Label,Input, Button, Row, Col} from 'reactstrap';
import { handleSaveQuestion } from './../actions/questions';
import { withRouter, Redirect } from 'react-router-dom';
import { handleReceiveUsers } from './../actions/users';

class CreateQuestion extends Component {

  state={
    optionOne: '',
    optionTwo: '',
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    const {dispatch, authedUser} = this.props;
    const question = {
      optionOneText: this.state.optionOne,
      optionTwoText: this.state.optionTwo,
      author: authedUser,
    }

    dispatch(handleSaveQuestion(question));
    dispatch(handleReceiveUsers());
    this.props.history.push("/");
  }

  handleOptionChange=(e, optionNumber)=>{
    e.persist();
    switch(optionNumber){
      case 1:
        this.setState(()=>({
          optionOne : e.target.value,
        }));
        break;
      case 2:
        this.setState(()=>({
          optionTwo : e.target.value,
        }));
        break;
      default:
        break;
    }
  }

  render(){
    const {userAvatar, loggedIn} = this.props;
    return (
      <div className="container">
        <div className="question">
        {loggedIn
          ? (<Card>
              <CardHeader tag="h5">Make your own poll.</CardHeader>
              <CardBody>
                <Row>
                  <Col sm="3">
                    <img
                      className="authorAvatar"
                      src={userAvatar}
                      alt="Author avatar"/>
                  </Col>
                  <Col sm="9">
                    <CardTitle tag="h6">Would You Rather?</CardTitle>
                    <Form onSubmit={(e)=>this.handleSubmit(e)}>
                      <FormGroup>
                        <Label for="optionOneText">First Option</Label>
                        <Input type="text" name="text" id="optionOneText" value={this.state.optionOne} onChange={(e)=>this.handleOptionChange(e,1)}></Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="optionTwoText">Second Option</Label>
                        <Input type="text" name="text" id="optionTwoText" value={this.state.optionTwo} onChange={(e)=>this.handleOptionChange(e,2)}></Input>
                      </FormGroup>
                    <Button type="submit">Submit</Button>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>)
          : <Redirect to="/"/>
        }

        </div>
      </div>
    );
  }
}

function mapStateToProps({authedUser, users}){
  const loggedIn = authedUser===null ? false : true;
  if(!loggedIn){
    return {
      loggedIn,
    };
  }
  const username = users[authedUser].name;
  const userAvatar = users[authedUser].avatarURL;
  return {
    username,
    userAvatar,
    authedUser,
    loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(CreateQuestion));
