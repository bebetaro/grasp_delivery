import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import uniqid from 'uniqid';

import * as actions from '../../actions';

class AnswerList extends Component {
  async componentDidMount() {
    await this.props.fetchAnswer();
  }

  renderAnswerList() {
    return _.map(this.props.answer, answer => {
      const id = answer._id;
      const price = typeof answer.price === 'number' ? answer.price : 'N/A';
      const design =
        answer.designUrl === '' ? (
          <td>{answer.drawNum}</td>
        ) : (
          <td>
            <a
              href={`https://s3-ap-northeast-1.amazonaws.com/graspdelivery/${
                answer.designUrl
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {answer.drawNum}
            </a>
          </td>
        );
      return (
        <tr key={uniqid()}>
          <td>
            <strong>{answer.customer}</strong>
          </td>
          {design}
          <td>{answer.delivery}</td>
          <td>{price}</td>
          <td>{answer.quantity}</td>

          <td>
            <Link to={`/answer/${id}`}>
              <button className="grey waves-effect btn-flat white-text">
                Answer
              </button>
            </Link>
          </td>

          <td>
            <Link to={`/process/${id}`}>
              <button className="grey waves-effect btn-flat white-text">
                Process
              </button>
            </Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Answer Form</h3>
        <table className="row highlight centered">
          <thead>
            <tr>
              <th>Cutomer Name</th>
              <th>Drawing Number</th>
              <th>Delivery</th>
              <th>Price(USD)</th>
              <th>Quantity</th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>{this.renderAnswerList()}</tbody>
        </table>
        <Link
          to="/mypage"
          className="pink lighten-1 btn-flat white-text waves-effect"
        >
          BACK
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    answer: state.order
  };
}

export default reduxForm({ form: 'answerForm', enableReinitialize: true })(
  connect(
    mapStateToProps,
    actions
  )(AnswerList)
);
