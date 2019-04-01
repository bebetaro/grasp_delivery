import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../actions';
import registerField from './Signin/registerField';

class UserPage extends Component {
  async componentDidMount() {
    await this.props.getUserInfo();
  }

  renderUserInfo() {
    return _.map(registerField, ({ name, label }) => {
      if (label !== 'Password') {
        return (
          <div key={label}>
            <span>{label}: </span>
            <h5 style={{ textDecorationLine: 'underline' }}>
              {this.props.user[name]}
            </h5>
          </div>
        );
      }
    });
  }

  render() {
    return <div className="container">{this.renderUserInfo()}</div>;
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(UserPage);
