import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';

class Landing extends Component {
  changeRender() {
    if (this.props.auth) {
      return <Dashboard />;
    } else {
      return (
        <div className="container">
          <h1 className="center-align">Grasp Delivery</h1>
          <div className="col s6 push-s3" style={{ marginTop: '50px' }}>
            <Link to="/login" className="waves-effect waves-light btn">
              Log in
            </Link>
            <Link to="/register" className="waves-effect waves-light btn right">
              Sign up
            </Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">{this.changeRender()}</div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
