import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Dashboard from './Dashboard';
import Register from './Signin/Register';
import UserPage from './UserPage';
import Landing from './Landing';
import Login from './Login';
import NewOrder from './Order/NewOrder';
import UpdateOrder from './Order/UpdateOrder';
import AnswerList from './Order/AnswerList';
import AnswerForm from './Order/AnswerForm';
import ProcessList from './Order/Process/ProcessList';
import CheckProcess from './Order/CheckProcess';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      // path is NOT totally different from API of server side
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/user" component={UserPage} />
            <Route exact path="/mypage" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/new/order" component={NewOrder} />
            <Route
              exact
              path="/update/order/:id"
              render={props => <UpdateOrder match={props.match} />}
            />
            <Route exact path="/answer" component={AnswerList} />
            <Route
              exact
              path="/answer/:id"
              render={props => <AnswerForm match={props.match} />}
            />
            <Route
              exact
              path="/process/:id"
              render={props => <ProcessList match={props.match} />}
            />
            <Route
              exact
              path="/check/:id"
              render={props => <CheckProcess id={props.match.params.id} />}
            />
          </div>
        </BrowserRouter>
      </div>
    ); // Pass props to UpdateOrder component to show only specific order
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  actions
)(App);
