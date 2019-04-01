import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import OrderList from '../component/Order/OrderList';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <OrderList />
        <div className="fixed-action-btn">
          <Link to="/new/order" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
