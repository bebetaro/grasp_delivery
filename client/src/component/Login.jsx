import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import inputField from './Signin/inputField';
import registerField from './Signin/registerField';

import asyncValidate from '../utils/asyncValidationUserCheck';
import * as actions from '../actions';

class Login extends Component {
  componentWillUpdate() {
    // if login is success, redirect to mypage
    //console.log(this.props.auth);
    if (this.props.auth) {
      this.props.history.push('/mypage'); //here push
    }
  }

  renderFields() {
    return _.map(registerField, ({ label, name, helpertext }) => {
      if (name === 'username' || name === 'password') {
        const selector = name === 'password' ? 'password' : 'text';
        return (
          <Field
            key={name}
            component={inputField}
            type={selector}
            name={name}
            helpertext={helpertext}
            label={label}
          />
        );
      }
    });
  }

  render() {
    const { handleSubmit, formValues, submitSignin } = this.props; // pass using function or something from props
    return (
      <div className="container">
        <div className="row">
          <form
            className="col s6 push-s3"
            style={{ marginTop: '70px' }}
            onSubmit={handleSubmit(() => submitSignin(formValues.values))}
          >
            {this.renderFields()}
            <Link to="/" className="col s4 red btn-flat white-text">
              Cancel
            </Link>
            <button
              type="submit"
              className="col s4 teal btn-flat right white-text"
            >
              Login
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {}; // if errors are empty, it means there are no errors
  _.each(registerField, ({ name }) => {
    //name is used for identifying each of values ex: values[username]
    if (!values[name]) {
      // if there are value of this
      errors[name] = `You must provide ${name}.`;
    }
  });

  return errors;
};

const mapStatetoProps = state => {
  return {
    formValues: state.form.signinForm,
    auth: state.auth // map auth state to props here
  }; //get form values from Redux-Form
};

export default reduxForm({
  form: 'signinForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['username', 'password']
})(
  connect(
    mapStatetoProps,
    actions
  )(withRouter(Login)) // using "redux-form" and "react-redux" and "react-router-dom" here
);
