import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class OrderList extends Component {
  async componentDidMount() {
    await this.props.fetchOrder();
  }

  renderOrders() {
    return _.map(this.props.orders, order => {
      const key = uniqid();
      return (
        <tr key={key}>
          <td>
            <Link to={`/check/${order._id}`}>{order.drawNum}</Link>
          </td>
          <td>{order.delivery}</td>
          <td>{order.price}</td>
          <td>{order.quantity}</td>
          <td>{order.process}</td>
          <td>
            <Link to={`/update/order/${order._id}`}>
              <button className="grey waves-effect btn-flat white-text">
                Edit
              </button>
            </Link>
          </td>
          <td>
            <button
              className="grey waves-effect btn-flat white-text"
              onClick={() => this.props.deleteOrder(order._id, order.designUrl)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Order List</h3>
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Drawing Number</th>
              <th>Delivery</th>
              <th>Price(USD)</th>
              <th>Quantity</th>
              <th>Current Process</th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>{this.renderOrders()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { orders: state.order };
}

export default connect(
  mapStateToProps,
  actions
)(OrderList);
