import React, { Component } from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import * as actions from '../../../actions';

class ShowProcess extends Component {
  componentDidMount() {
    const id = { id: this.props.id };
    this.props.fetchProcess(id);
  }

  renderProcess() {
    //console.log(this.props.processes);
    return this.props.processes.map(process => {
      const IDs = { id: this.props.id, _id: process._id };

      return (
        <div key={uniqid()}>
          <li className="card col s4">
            <div className="card-image">
              <img
                src={`https://s3-ap-northeast-1.amazonaws.com/graspdelivery/${
                  process.imageUrl
                }`}
                alt="Not uploaded yet"
              />
              <div
                style={{ marginBottom: '0px', paddingBottom: '0px' }}
                className="card-content"
              >{`Process: ${process.process}`}</div>
              <button
                className="btn-floating halfway-fab waves-effect waves-light red"
                onClick={() => {
                  this.props.deleteProcess(IDs, process.imageUrl);
                }}
              >
                <i className="material-icons">close</i>
              </button>
              <div
                style={{ marginTop: '0px', paddingTop: '0px' }}
                className="card-content"
              >{`Worker: ${process.worker}`}</div>
            </div>
          </li>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="divider" />
        <h5 className="center-align">Finished Process</h5>
        <ul className="col s12">{this.renderProcess()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { processes: state.process };
};

export default connect(
  mapStateToProps,
  actions
)(ShowProcess);
