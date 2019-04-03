import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import OrderForm from './OrderForm';
import OrderReview from './OrderReview';

class NewOrder extends Component {
  state = { showFormReview: false };
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <OrderReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <OrderForm orderSubmit={() => this.setState({ showFormReview: true })} />
    );
  }
  render() {
    return <div className="container">{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: 'orderForm' })(NewOrder);
