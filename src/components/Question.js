import  React, {Component} from 'react';
import { connect } from 'react-redux';
import OptionsView from './QuestionViews/OptionsView';
import StatisticsView from './QuestionViews/StatisticsView';
import CompactView from './QuestionViews/CompactView';
import { Redirect, withRouter } from 'react-router-dom';
import {Col, Card, CardBody, CardHeader, Row} from 'reactstrap';

class Question extends Component{
  render(){
    const {question, authorAvatar, authorName, viewMode, loggedIn} = this.props;
    return(
      <div>
        {loggedIn
        ? (
          <Card className='question'>
            <CardHeader tag = "h5">{viewMode.viewMode === "statistics" ? `Asked by ${authorName}` : `${authorName} asks:`}</CardHeader>
            <CardBody>
              <Row>
                <Col sm="3">
                  <img
                    className="authorAvatar"
                    src={authorAvatar}
                    alt={"Author avatar"}/>
                </Col>
                <Col sm ="9">
                  {viewMode.viewMode === 'compact'
                    ? (<CompactView question={question}/>)
                    : viewMode.viewMode==='options'
                      ? (<OptionsView question={question}/>)
                      : (<StatisticsView question={question}/>)}
                </Col>
              </Row>
            </CardBody>
          </Card>)
          : <Redirect to="/"/>}
      </div>
    )
  }
}

function mapStateToProps({users, questions, viewMode, authedUser}, {id}){
  const loggedIn = authedUser===null ? false : true;
  if(!loggedIn) {
    return {
      loggedIn,
      authorName: '',
    };
  }
  const question = questions[id];
  const authorAvatar = users[question.author].avatarURL;
  const authorName = users[question.author].name;
  return {
    question,
    authorAvatar,
    authorName,
    viewMode,
    authedUser,
    loggedIn
  };
}

export default withRouter(connect(mapStateToProps)(Question));