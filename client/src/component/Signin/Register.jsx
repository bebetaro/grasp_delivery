//This component should be linked to Login component after registered to give user login status and redirect
//After call to server side, request will be switched to "Already registered" or "New registerd"

import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import inputField from "./inputField";
import validate from "../../utils/validationUser";
import asyncValidate from "../../utils/asyncValidateUser";
import registerField from "./registerField";
import * as actions from "../../actions";

class Register extends Component {
  componentWillUpdate() {
    // if login is success, redirect to mypage
    //console.log(this.props.auth);
    if (this.props.auth) {
      this.props.history.push("/mypage"); //here push
    }
  }

  renderFields() {
    return _.map(registerField, ({ label, name, helpertext }) => {
      const selector = name === "password" ? "password" : "text";
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
    });
  }
  render() {
    const { handleSubmit, history, submitRegister, formValues } = this.props;
    //Using arrow function to fire function only when push submit
    return (
      <div className="row">
        <form
          className="col s6 push-s3"
          style={{ marginTop: "70px" }}
          onSubmit={handleSubmit(() =>
            submitRegister(formValues.values, history)
          )}
        >
          {this.renderFields()}
          <Link to="/" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Register
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    formValues: state.form.signupForm, //get form values from Redux-Form
    auth: state.auth // auth data from reducer about user login
  };
};

export default reduxForm({
  form: "signupForm",
  validate,
  asyncValidate,
  asyncBlurFields: ["username"]
})(
  //Using "react-redux" "react-router-dom" "redux-form" at the same time
  connect(mapStatetoProps, actions)(withRouter(Register))
);
