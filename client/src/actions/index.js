import axios from 'axios';
import _ from 'lodash';
import {
  FETCH_USER,
  FETCH_ORDER,
  FETCH_ONE_ORDER,
  FETCH_PROCESS,
  FETCH_ANSWER
} from './types';

// Get user info from database
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/get/user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitRegister = values => async dispatch => {
  const res = await axios.post('/api/register', values); // register user data here
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSignin = values => async dispatch => {
  //console.log(values);
  const res = await axios.post('/api/login', values); // post login info here
  dispatch({ type: FETCH_USER, payload: res.data }); //payload is gonna be user info and pass it to auth by mapStateToProps
};

export const getCompanyList = () => async () => {
  const res = await axios.get('/api/company_list');
  console.log(res.data);
};

export const submitOrder = (values, history, file) => async () => {
  //values.delivery = values.delivery.toString(); // Change from Date type to String type to store
  values = _.map(values, value => {
    return value.toString().replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
  });
  values = {
    drawNum: values[0],
    delivery: values[1],
    quantity: values[2],
    reciever: values[3]
  };
  //else send file info as object and get back URL data

  if (file === null || file === undefined) {
    await axios.post('/api/new/order', {
      ...values,
      designUrl: null
    });
  } else {
    const urlConfig = await axios.get('/api/upload/design', {
      params: {
        name: file.name,
        type: file.type
      }
    });
    // send file data to url of AWS: this is presigned url
    //console.log(urlConfig.data);
    await axios.put(urlConfig.data.url, file, {
      headers: { 'Content-Type': file.type }
    });
    //Add URL of image to process info and post
    await axios.post('/api/new/order', {
      ...values,
      designUrl: urlConfig.data.key
    });
  }

  //await axios.post('/api/new/order', values);
  history.push('/mypage'); // No need to dispatch
};

export const fetchOrder = () => async dispatch => {
  const res = await axios.get('/api/orderList'); // fetch order info here
  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const fetchOneOrder = values => async dispatch => {
  // Using FETCH_ONE_ORDER to take just one order info
  const res = await axios.put('/api/order', values);
  dispatch({ type: FETCH_ONE_ORDER, payload: res.data });
};

export const submitProcess = (value, file, _id) => async dispatch => {
  const values = { ...value, _id }; // bind process info and id
  if (file === null) {
    // if there are no file info, not send file
    const res = await axios.post('/api/process', values);
    console.log(res.data);
    dispatch({ type: FETCH_PROCESS, payload: res.data });
  } else {
    //else send file info as object and get back URL data
    const urlConfig = await axios.get('/api/upload/image', {
      params: {
        name: file.name,
        type: file.type
      }
    });
    // send file data to url of AWS: this is presigned url
    await axios.put(urlConfig.data.url, file, {
      headers: { 'Content-Type': file.type }
    });
    //Add URL of image to process info and post
    const res = await axios.post('/api/process', {
      ...values,
      imageUrl: urlConfig.data.key
    });
    dispatch({ type: FETCH_PROCESS, payload: res.data });
  }
};

export const deleteOrder = (id, url) => async dispatch => {
  // Take id and search an order which should be deleted
  const URL = url === undefined || url === null ? '' : url;
  const values = { id, designUrl: URL };
  const res = await axios.put('/api/delete/order/', values);
  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const updateOrder = (values, history) => async dispatch => {
  // update order can edit order info with new values
  values = _.map(values, value => {
    return value.toString().replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
  });
  //console.log(values);
  values = {
    _id: values[0],
    drawNum: values[2],
    delivery: values[1],
    quantity: values[3],
    reciever: values[4]
  };
  //console.log(values);
  const res = await axios.post('/api/update/order', values);
  history.push('/mypage');
  // This needs dispatch because this is update
  dispatch({ type: FETCH_ORDER, payload: res.data });
};

export const fetchAnswer = () => async dispatch => {
  //Get orderlist first and next get customer name
  const res = await axios.get('/api/answerList');
  //This is using answer form but basically using order info
  dispatch({ type: FETCH_ANSWER, payload: res.data });
};

export const submitAnswer = (values, history) => async dispatch => {
  // bind answer info and id
  if (!isNaN(Number(values.price))) {
    values.price = values.price.toString().replace(/[０-９]/g, s => {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
    values.delivery = values.delivery
      .toString()
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      });
    const res = await axios.post('/api/response/order', values);
    history.push('/answer');
    dispatch({ type: FETCH_ORDER, payload: res.data });
  }
};

export const deleteProcess = (IDs, imageUrl) => async dispatch => {
  // bind process ID and order ID to search for process in specific order
  // and bind imageURL to delete
  const data = { ...IDs, imageUrl };
  const res = await axios.post('/api/delete/process', data);
  dispatch({ type: FETCH_PROCESS, payload: res.data });
};

export const fetchProcess = id => async dispatch => {
  // just fetch process info
  const res = await axios.post('/api/get/process', id);
  dispatch({ type: FETCH_PROCESS, payload: res.data });
};

export const getUserInfo = () => async dispatch => {
  const res = await axios.get('/api/get/user_info');
  dispatch({ type: FETCH_USER, payload: res.data });
};
