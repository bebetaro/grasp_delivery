import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';
import inputField from '../Signin/inputField';
import orderField from './orderField';
import validate from '../../utils/orderValidation';

class OrderForm extends Component {
  renderForm() {
    return _.map(orderField, ({ label, name }) => {
      const typeSelector = name === 'delivery' ? 'date' : 'text';
      if (name !== 'price') {
        return (
          <Field
            key={name}
            type={typeSelector}
            label={label}
            name={name}
            //className={selector}
            component={inputField}
          />
        );
      }
    });
  }

  render() {
    const { handleSubmit, orderSubmit } = this.props;
    return (
      <div className="row">
        <form onSubmit={handleSubmit(orderSubmit)}>
          {this.renderForm()}

          <Link to="/mypage" className="pink lighten-1 btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: 'orderForm', validate })
)(OrderForm);
