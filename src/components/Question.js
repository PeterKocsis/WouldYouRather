import  React, {Component} from 'react';
import { connect } from 'react-redux';
import OptionsView from './QuestionViews/OptionsView';
import StatisticsView from './QuestionViews/StatisticsView';
import CompactView from './QuestionViews/CompactView';

class Question extends Component{
  render(){
    const {question, authorAvatar, authorName, viewMode} = this.props;
    return(
      <div>
        <img
          src={authorAvatar}
          className='avatar'
        />
        {viewMode.viewMode === 'compact'
          ? (<div>
              <h3>{authorName} asks:</h3>
              <CompactView question={question}/>
            </div>)
          : viewMode.viewMode==='options'
            ? (<div>
                <h3>{authorName} asks:</h3>
                <OptionsView question={question}/>
              </div>)
            : (<div>
                <h3>Asked by {authorName}</h3>
                <StatisticsView qustion={question}/>
              </div>)}
      </div>
    )
  }
}

function mapStateToProps({users, questions, viewMode}, {id}){
  const question = questions[id];
  const authorAvatar = users[question.author].avatarURL;
  const authorName = users[question.author].name;
  return {
    question,
    authorAvatar,
    authorName,
    viewMode
  }
}

export default connect(mapStateToProps)(Question);