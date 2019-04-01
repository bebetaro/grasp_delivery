import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ProcessForm from './ProcessForm';
import ShowProcess from './Showprocess';

class ProcessList extends Component {
  render() {
    const id = this.props.match.params.id;
    return (
      <div className="container">
        <div className="row">
          <Link to="/answer" className="pink lighten-1 btn-flat white-text">
            <i className="material-icons">arrow_back</i>
            Back
          </Link>
          <ProcessForm id={id} />
          <ShowProcess id={id} />
        </div>
      </div>
    );
  }
}

export default ProcessList;
