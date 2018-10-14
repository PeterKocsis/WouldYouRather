import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionPage extends Component {
  render() {
    const { id } = this.props;
    return (
      <div className="container">
        <div className="questions">
          <Question id={id} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions }, props) {
  const { id } = props.match.params;
  return {
    id
  }
}

export default connect(mapStateToProps)(QuestionPage);