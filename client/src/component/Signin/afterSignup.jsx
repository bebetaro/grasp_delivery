import React from 'react';
import { withRouter } from 'react-router-dom';

const afterSignup = ({ history }) => {
  return (
    <div>
      <h3>Thank you for signing up</h3>
      <h3>This page will be redirected to your page</h3>
      {setTimeout(() => history.push('/mypage'), 5000)}
    </div>
  ); // After setTimeout put arrow function because have to wait 5seconds
};

export default withRouter(afterSignup);
