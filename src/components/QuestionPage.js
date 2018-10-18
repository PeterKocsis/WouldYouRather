import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Redirect } from 'react-router-dom';

const QuestionPage = (props) => {
  const { id, redirect, requestedUrl, redirectUrl } = props;
  return (
    <div className="container">
      <div className="questions">
        {redirect
          ? <Redirect to={{ pathname: redirectUrl, state: requestedUrl }} />
          : <Question id={id} />}
      </div>
    </div>
  )
}

function mapStateToProps({ questions, authedUser }, props) {
  const { id } = props.match.params;
  const requestedUrl = props.location.pathname;
  let contentUnavailable = false;
  let redirectUrl = "/";
  if(authedUser){
    contentUnavailable = (!questions[id]) ? true : false;
    if(contentUnavailable) {
      redirectUrl = `${requestedUrl}/"NoContent"`;
    }
  }
  const redirect = authedUser===null || contentUnavailable;
  return {
    id,
    redirect,
    requestedUrl,
    redirectUrl,
  };
}

export default connect(mapStateToProps)(QuestionPage);