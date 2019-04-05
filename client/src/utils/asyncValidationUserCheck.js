//This function is for identifying whether user is already registered or not
import axios from 'axios';

const asyncValidationUser = async values => {
  const response = await axios.post('/api/user_check', values);
  //console.log(response.data);
  if (response.data.answer === 'NotFound') {
    const ayncerror = { username: 'This email is not registered' }; //Define first to avoid warning
    throw ayncerror;
    //throw { username: "This email is already registered" };
  } else if (response.data.answer === 'Wrong') {
    const asyncerror = { password: 'This password is wrong' };
    throw asyncerror;
  }
};

export default asyncValidationUser;
