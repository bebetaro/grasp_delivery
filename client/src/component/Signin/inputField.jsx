//This component is for getting input from customers
import React from 'react';

export default ({
  input,
  name,
  type,
  label,
  className,

  meta: { error, touched, asyncValidating }
}) => {
  return (
    // input-filed have to wrap just input and label
    <div className={asyncValidating ? 'async-validating' : ''}>
      <div className="input-field row s6">
        <input
          {...input}
          type={type}
          id={name}
          className={className}
          style={{ marginTop: '10px' }}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
};
