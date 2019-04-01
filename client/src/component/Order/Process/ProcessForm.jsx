import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import inputField from '../../Signin/inputField';
import * as actions from '../../../actions';

class ProcessForm extends Component {
  state = { file: null };

  render() {
    //
    const { reset, submitProcess, formValue, handleSubmit, id } = this.props;
    return (
      <form>
        <Field
          name="process"
          type="text"
          label="Process Name"
          component={inputField}
        />
        <Field
          name="worker"
          type="text"
          label="Worker Name"
          component={inputField}
        />
        <label htmlFor="image">ProcessImage</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={e => {
            this.setState({ file: e.target.files[0] });
          }}
        />
        <div style={{ marginTop: '20px' }}>
          <button onClick={reset}>Clear</button>
          <button
            type="submit"
            onClick={handleSubmit(() =>
              submitProcess(formValue, this.state.file, id)
            )}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('processForm');

const mapStateToProps = state => {
  return { formValue: selector(state, 'process', 'worker') };
};

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: 'processForm' })(ProcessForm));
