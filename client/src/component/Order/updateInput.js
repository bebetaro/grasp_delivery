import React from 'react';

export default ({
  input,
  name,
  type,
  className,
  meta: { error, touched, asyncValidating }
}) => {
  return (
    // input-filed have to wrap just input and label
    <div>
      <h6 className="col s4">Changed Value:</h6>
      <div
        className="input-field inline col s6 pull-s1"
        style={{
          marginTop: '0px',
          marginBottom: '0px',
          paddingBottom: '0px'
        }}
      >
        <input {...input} type={type} id={name} />
        <div className="red-text" style={{ marginBottom: '20px' }}>
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    </div>
  );
};
