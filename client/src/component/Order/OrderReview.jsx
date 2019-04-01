import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import orderField from './orderField';
import * as actions from '../../actions';

class OrderReview extends Component {
  state = { file: null };

  reviewOrder = _.map(orderField, ({ name, label }) => {
    if (name !== 'price') {
      return (
        <div key={name}>
          <label htmlFor={name} className="left-align">
            {label}
          </label>
          <h5 style={{ borderBottom: 'solid 1px #424242' }}>
            {this.props.formValues[name]}
          </h5>
        </div>
      );
    }
  });
  render() {
    const { formValues, submitOrder, history, onCancel } = this.props;
    return (
      <div className="container">
        <h4 className="center-align">Please confirm your entries</h4>
        <div style={{ marginBottom: '20px' }}>{this.reviewOrder}</div>
        <label htmlFor="design">Please add design file</label>
        <input
          type="file"
          name="design"
          accept="*"
          onChange={e => {
            this.setState({ file: e.target.files[0] });
          }}
        />
        <div style={{ marginTop: '20px' }}>
          <button
            className="yellow darken-3 white-text btn-flat"
            onClick={onCancel}
          >
            Back
          </button>
          <button
            onClick={() => submitOrder(formValues, history, this.state.file)}
            className="green btn-flat right white-text"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { formValues: state.form.orderForm.values };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(OrderReview));
