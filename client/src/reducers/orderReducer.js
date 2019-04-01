import { FETCH_ORDER, FETCH_ANSWER } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ORDER:
      // action.payload is not fit for tables in react
      // so destructuring here and modify for tables
      // map order list info to each order info
      const value = action.payload.map(order => {
        // take each param from one order info
        const {
          _id,
          drawNum,
          delivery,
          price,
          quantity,
          process,
          reciever,
          designUrl
        } = order;
        // If there are no process info, just show N/A
        // If there are process info, show last process:this is stack
        const lastProcess =
          process.length > 0 ? process[process.length - 1].process : 'N/A';
        const design =
          designUrl === undefined || designUrl === null ? '' : designUrl;

        return {
          reciever,
          _id,
          drawNum,
          delivery,
          price,
          quantity,
          designUrl: design,
          process: lastProcess
        };
      });
      return value;
    case FETCH_ANSWER:
      const values = action.payload.map(order => {
        const {
          _id,
          drawNum,
          delivery,
          price,
          quantity,
          process,
          customer,
          designUrl
        } = order;
        const lastProcess =
          process.length > 0 ? process[process.length - 1].process : 'N/A';
        const design =
          designUrl === undefined || designUrl === null ? '' : designUrl;
        return {
          customer,
          _id,
          drawNum,
          delivery,
          price,
          quantity,
          designUrl: design,
          process: lastProcess
        };
      });

      return values;

    default:
      return state;
  }
};
