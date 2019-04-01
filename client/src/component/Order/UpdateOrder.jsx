import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import UpdateForm from './UpdateForm';
import UpdateReview from './UpdateReview';

class UpdateOrder extends Component {
  state = { showUpdate: false };

  renderContent() {
    const id = this.props.match.params.id; // Get specific id information
    if (this.state.showUpdate) {
      return (
        <UpdateReview
          onCancel={() => {
            this.setState({ showUpdate: false });
          }}
        />
      );
    }
    return (
      <UpdateForm
        updateSubmit={() => {
          this.setState({ showUpdate: true });
        }}
        order={this.props.order}
        id={id}
      />
    ); // pass id information here
  }
  render() {
    //console.log(this.props.match.params.id); // Get "id" from orderList then it should be passed to next component to show specific order
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: 'updateForm' })(UpdateOrder);
