import React, {Component} from 'react';
import { connect } from 'react-redux';

class StatisticsView extends Component {
  render(){
    return(
      <p>Start View</p>
    )
  }
}



export default connect()(StatisticsView);