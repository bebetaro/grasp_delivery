import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, initialize } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../../actions';

import orderField from './orderField';
import validate from '../../utils/answerValidation';

class AnswerForm extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchOneOrder({ id });
    this.props.dispatch(initialize('answerForm', this.props.order));
  } //Above to initialize reduxform by action creator

  renderOrderInfo() {
    return _.map(orderField, ({ name, label }) => {
      const typeSelector = name === 'delivery' ? 'date' : 'text';
      const selector = name === 'drawNum' || name === 'quantity' ? true : false;
      if (name !== 'reciever') {
        return (
          <div key={label}>
            <div className="row">
              <div className="col s12">
                <label htmlFor={name}>{label}</label>
                <Field
                  disabled={selector}
                  type={typeSelector}
                  label={label}
                  name={name}
                  component="input"
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
    const _id = this.props.match.params.id;
    const {
      formValue,
      history,
      submitAnswer,
      handleSubmit,
      error
    } = this.props;
    const values = { ...formValue, _id };
    return (
      <div className="container">
        <form onSubmit={handleSubmit(validate)}>
          {this.renderOrderInfo()}

          <div className="red-text" style={{ marginBottom: '20px' }}>
            {{ error } && <strong>{error}</strong>}
          </div>
          <Link to="/answer" className="pink lighten-1 btn-flat white-text">
            Back
          </Link>
          <button
            type="submit"
            className="teal btn-flat right white-text"
            onClick={() => {
              submitAnswer(values, history);
            }}
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

/*


*/
const selector = formValueSelector('answerForm');

const mapStateToProps = state => {
  return {
    //initialValues: state.order,
    order: state.oneOrder,
    formValue: selector(state, 'delivery', 'price')
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({
    form: 'answerForm',
    enableReinitialize: true,
    updateUnregisteredFields: true,
    keepDirtyOnReinitialize: true
  })
)(AnswerForm);
