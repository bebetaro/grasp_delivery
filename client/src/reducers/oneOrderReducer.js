import { FETCH_ONE_ORDER } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ONE_ORDER:
      return action.payload;
    default:
      return state;
  }
};
