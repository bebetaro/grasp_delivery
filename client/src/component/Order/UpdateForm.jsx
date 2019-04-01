import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import updateInput from './updateInput';
import orderField from './orderField';
import validate from '../../utils/orderValidation';
import * as actions from '../../actions';

class UpdateForm extends Component {
  componentDidMount() {
    this.props.fetchOneOrder({ id: this.props.id });

    //console.log(this.props.updateForm);
  }
  renderContents() {
    return _.map(orderField, ({ name, label }) => {
      if (name !== 'price') {
        const typeSelector = name === 'delivery' ? 'date' : 'text';
        return (
          <div key={label}>
            <div className="row">
              <div className="col s12">
                <label htmlFor={name}>{label}</label>
                <Field
                  type={typeSelector}
                  name={name}
                  component={updateInput}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        );
      }
    });
  }

  render() {
    const { handleSubmit, updateSubmit } = this.props;
    return (
      <div className="container">
        <form onSubmit={handleSubmit(updateSubmit)}>
          {this.renderContents()}
          <Link to="/mypage" className="pink lighten-1 btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Continue
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialValues: state.oneOrder,
    updateForm: state.form.updateForm
  };
};

export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({
    validate,
    form: 'updateForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
  })(UpdateForm)
);
