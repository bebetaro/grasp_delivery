//This function is for identifying whether user is already registered or not
import axios from 'axios';

const asyncValidationUser = async values => {
  const response = await axios.post('/api/user_search', values);
  if (response.data) {
    const asyncResult = { username: 'This email is already registered' }; //Define first to avoid warning
    throw asyncResult;
    //throw { username: "This email is already registered" };
  }
};

export default asyncValidationUser;
