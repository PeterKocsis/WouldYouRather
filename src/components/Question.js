import  React, {Component} from 'react';
import { connect } from 'react-redux';
import OptionsView from './QuestionViews/OptionsView';
import StatisticsView from './QuestionViews/StatisticsView';
import CompactView from './QuestionViews/CompactView';
import {Redirect} from 'react-router-dom';
import {Col, Card, CardBody, CardTitle, CardText, CardImg, CardHeader, Row} from 'reactstrap';

class Question extends Component{
  render(){
    const {question, authorAvatar, authorName, viewMode, authedUser} = this.props;
    const titleText = viewMode.viewMode === "statistics" ? `Asked by ${authorName}` : `${authorName} asks:`;
    return(
      <div>
        {authedUser
        ? (
          <Card className='question'>
            <CardHeader tag = "h3">{titleText}</CardHeader>
            <CardBody>
              <Row>
                <Col sm="3">
                  <img className="authorAvatar" src={authorAvatar}/>
                </Col>
                <Col sm ="9">
                  {viewMode.viewMode === 'compact'
                    ? (<CompactView question={question}/>)
                    : viewMode.viewMode==='options'
                      ? (<OptionsView question={question}/>)
                      : (<StatisticsView qustion={question}/>)}
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
  if(!authedUser) return {};
  const question = questions[id];
  const authorAvatar = users[question.author].avatarURL;
  const authorName = users[question.author].name;
  return {
    question,
    authorAvatar,
    authorName,
    viewMode,
    authedUser,
  }
}

export default connect(mapStateToProps)(Question);