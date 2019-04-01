import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import _ from 'lodash';

import * as actions from '../../actions';
import orderField from './orderField';

class UpdateReview extends Component {
  renderReview() {
    return _.map(orderField, ({ name, label }) => {
      if (name !== 'price') {
        const { formValue } = this.props;
        //console.log(name);
        return (
          <div key={name}>
            <label htmlFor={name} className="left-align">
              {label}
            </label>
            <h5 style={{ borderBottom: 'solid 1px #424242' }}>
              {formValue[name]}
            </h5>
          </div>
        );
      }
    });
  }
  render() {
    return (
      <div className="container">
        <h4 className="center-align">Please confirm your entries</h4>
        <div>{this.renderReview()}</div>

        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={this.props.onCancel}
        >
          Back
        </button>
        <button
          onClick={() =>
            this.props.updateOrder(this.props.formValue, this.props.history)
          }
          className="green btn-flat right white-text"
        >
          Submit
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    delivery,
    drawNum,
    quantity,
    reciever,
    _id
  } = state.form.updateForm.values;
  return {
    formValue: { _id, delivery, drawNum, quantity, reciever }
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: 'updateForm' }),
  withRouter
)(UpdateReview);
