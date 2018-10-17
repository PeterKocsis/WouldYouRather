import React from 'react';
import { withRouter } from 'react-router-dom';

const ContentUnavailable = withRouter(({location})=>
    (<div className="question">
      <h1>404</h1>
      <h2>{`The requested page ${location.state ? location.state : ""} is not available.`}</h2>
    </div>));

export default ContentUnavailable;
