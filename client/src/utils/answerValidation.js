import { SubmissionError } from 'redux-form';

const answerValidation = values => {
  // Judge whether given value is number or not
  if (isNaN(Number(values.price))) {
    throw new SubmissionError({
      price: 'Please provide number for Price',
      _error: 'Please provide number for Price'
    });
  }
};

export default answerValidation;
