import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Form, Card, CardHeader, CardBody, CardTitle, FormGroup, Label,Input, Button} from 'reactstrap';
import Navigation from './Navigation';
import { handleSaveQuestion } from './../actions/questions';
import { withRouter } from 'react-router-dom';
import { handleAddQuestionToUser } from '../actions/users';
import { handleReceiveUsers } from './../actions/users';

class CreateQuestion extends Component {

  state={
    optionOne: '',
    optionTwo: '',
  }

  handleSubmit=()=>{
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
    const {username} = this.props;
    return (
      <div className="container">
        <div>
          <Navigation></Navigation>
        </div>
        <div className="questions">
        <Card>
          <CardHeader>What is your question {username}?</CardHeader>
          <CardBody>
            <CardTitle>Would You Rather?</CardTitle>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="optionOneText">First Option</Label>
                <Input type="text" name="text" id="optionOneText" value={this.state.optionOne} onChange={(e)=>this.handleOptionChange(e,1)}></Input>
              </FormGroup>
              <FormGroup>
                <Label for="optionTwoText">First Option</Label>
                <Input type="text" name="text" id="optionTwoText" value={this.state.optionTwo} onChange={(e)=>this.handleOptionChange(e,2)}></Input>
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
          </CardBody>
        </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps({authedUser, users}){
  if(authedUser===null) return{}
  const username = users[authedUser].name;
  const userAvatar = users[authedUser].avatarURL;
  return {
    username,
    userAvatar,
    authedUser,
  }
}

export default withRouter(connect(mapStateToProps)(CreateQuestion));
