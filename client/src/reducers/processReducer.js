import { FETCH_PROCESS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PROCESS:
      return action.payload;
    default:
      return state;
  }
}
