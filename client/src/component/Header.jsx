import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  renderContent() {
    if (this.props.auth) {
      return (
        <div>
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/answer">Answer</Link>
          </li>

          <li>
            <a href="/api/logout">Log out</a>
          </li>
        </div>
      );
    }
  }

  renderTopLink() {
    if (this.props.auth) {
      return (
        <Link to="/mypage" className="brand-logo">
          GraspDelivery
        </Link>
      );
    } else {
      return (
        <Link to="/" className="brand-logo">
          GraspDelivery
        </Link>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper blue">
          {this.renderTopLink()}
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  actions
)(Header);
