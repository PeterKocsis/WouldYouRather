import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Redirect } from 'react-router-dom';

class QuestionPage extends Component {
  render() {
    const { id, redirect, from } = this.props;
    return (
      <div className="container">
        <div className="questions">
          {redirect
            ? <Redirect  to={{pathname:"/NoContent", state:from}}/>
            : <Question id={id} />}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions }, props) {
  const { id } = props.match.params;
  const requestedUrl = props.location.pathname;
  const redirect = (!questions[id]) ? true : false;
  return {
    id,
    redirect,
    from: requestedUrl,
  };
}

export default connect(mapStateToProps)(QuestionPage);