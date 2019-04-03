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

  renderSideNav() {
    <ul id="slide-out" classname="sidenav">
      {this.renderContent()}
    </ul>;
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
      <nav className="container">
        <div className="row">
          <div className="nav-wrapper blue">
            <a
              href="#"
              data-target="slide-out"
              class="sidenav-trigger show-on-small"
            >
              <i class="material-icons">menu</i>
            </a>
            {this.renderSideNav()}
            {this.renderTopLink()}
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderContent()}
            </ul>
          </div>
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
