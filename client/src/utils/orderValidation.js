import _ from 'lodash';
import orderField from '../component/Order/orderField';

const orderValidations = values => {
  //console.log(values);
  const errors = {}; // if errors are empty, it means there are no errors
  if (isNaN(Number(values.quantity))) {
    errors.quantity = 'Please provide number for Quantity';
  }

  //This validate should be last or this validate doesn't work correctly
  _.each(orderField, ({ name, label }) => {
    //name is used for identifying each of values ex: values[username]
    if (!values[name] && values[name] !== 'price') {
      // if there are value of this
      errors[name] = `You must provide ${label}.`;
    }
  });

  return errors;
};

export default orderValidations;
