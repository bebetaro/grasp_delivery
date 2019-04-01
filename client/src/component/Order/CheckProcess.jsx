import React, { Component } from 'react';
import { connect } from 'react-redux';

import Showprocess from './Process/Showprocess';
import * as actions from '../../actions';

class CheckProcess extends Component {
  async componentDidMount() {
    await this.props.fetchOneOrder({ id: this.props.id });
  }

  render() {
    const id = this.props.id;
    const { delivery, reciever } =
      this.props.order === null ? '' : this.props.order;
    return (
      <React.Fragment>
        <h3>Estimated Delivery: {delivery}</h3>
        <h3>Supplier name: {reciever}</h3>
        <Showprocess id={id} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { order: state.oneOrder };
};

export default connect(
  mapStateToProps,
  actions
)(CheckProcess);
