import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Card, CardBody, CardText, Row, Col, CardHeader, Badge} from 'reactstrap';

class UserProfile extends Component {
  render(){
    const {name, avatar, userData} = this.props;
    return (
      <div className="question">
        <Card>
          <CardBody>
            <Row>
              <Col sm="3">
                <img
                  className="authorAvatar"
                  src={avatar}
                  alt="Author avatar"
                />
              </Col>
              <Col sm="6">
                <legend>{name}</legend>
                <Row>
                  <Col sm="9">
                    <CardText>Answered Questions</CardText>
                  </Col>
                  <Col sm="3">
                    <CardText>{userData.voteNumber}</CardText>
                  </Col>
                </Row>
                <Row>
                  <Col sm ="12">
                    <hr/>
                  </Col>
                </Row>
                <Row>
                  <Col sm="9">
                    <CardText>Created Questions</CardText>
                  </Col>
                  <Col sm="3">
                    <CardText>{userData.questionNumber}</CardText>
                  </Col>
                </Row>
              </Col>
              <Col sm="3">
                <Card className="text-center">
                  <CardHeader><span>Score</span></CardHeader>
                  <CardBody>
                    <h1><Badge color="success" pill>{userData.finalScore}</Badge></h1>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({users, authedUser}, {userData}) {
  const name = users[userData.userId].name;
  const avatar = users[userData.userId].avatarURL;
  return {
    name,
    avatar,
    userData
  }
}

export default connect(mapStateToProps)(UserProfile);