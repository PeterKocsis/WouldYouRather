import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Form, Card, CardHeader, CardBody, CardTitle, FormGroup, Label,Input, Button, Row, Col} from 'reactstrap';
import Navigation from './Navigation';
import { handleSaveQuestion } from './../actions/questions';
import { withRouter } from 'react-router-dom';
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
    const {userAvatar} = this.props;
    return (
      <div className="container">
        <div>
          <Navigation></Navigation>
        </div>
        <div className="question">
        <Card>
          <CardHeader tag="h3">Make your own poll.</CardHeader>
          <CardBody>
            <Row>
              <Col sm="3">
                <img className="authorAvatar" src={userAvatar}/>
              </Col>
              <Col sm="9">
                <CardTitle tag="h4">Would You Rather?</CardTitle>
                <Form onSubmit={this.handleSubmit}>
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
