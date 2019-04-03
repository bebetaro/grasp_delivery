import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';

import * as actions from '../actions';

class Header extends Component {
  componentDidMount() {
    const elem = document.querySelector('.sidenav');
    M.Sidenav.init(elem, {
      edge: 'left',
      inDuration: 250
    });
  }

  renderContent() {
    if (this.props.auth) {
      return (
        <div>
          <li>
            <Link to="/user">USER</Link>
          </li>
          <li>
            <Link to="/answer">ANSWER</Link>
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
        <Link to="/" className="brand-logo center-align">
          GraspDelivery
        </Link>
      );
    }
  }

  render() {
    return (
      <nav className="container">
        <div className="nav-wrapper blue">
          <ul id="slide-out" className="sidenav">
            {this.renderContent()}
          </ul>
          <div
            data-target="slide-out"
            className="sidenav-trigger hide-on-large-only"
          >
            <i className="material-icons">menu</i>
          </div>
          {this.renderTopLink()}
          <ul className="right hide-on-med-and-down">{this.renderContent()}</ul>
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
