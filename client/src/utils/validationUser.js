import _ from 'lodash';
import registerField from '../component/Signin/registerField';

const re = new RegExp(
  '^(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
);

const validationUser = async values => {
  const errors = {}; // if errors are empty, it means there are no errors

  if (re.test(values.username)) {
    errors.username = 'Invalid email address'; //regex for username
  }

  if (re.test(values.password)) {
    //RegEx for password
    errors.password =
      'Sorry, password must contain at least eight characters, one letter and one number';
  }

  //This validate should be last or this validate doesn't work correctly
  _.each(registerField, ({ name }) => {
    //name is used for identifying each of values ex: values[username]
    if (!values[name]) {
      // if there are value of this
      errors[name] = `You must provide ${name}.`;
    }
  });

  return errors;
};

export default validationUser;
