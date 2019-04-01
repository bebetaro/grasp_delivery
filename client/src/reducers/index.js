import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import userReducer from './userReducer';
import orderReducer from './orderReducer';
import oneOrderReducer from './oneOrderReducer';
import processReducer from './processReducer';

export default combineReducers({
  form: reduxForm,
  auth: userReducer,
  order: orderReducer,
  oneOrder: oneOrderReducer,
  process: processReducer
});
