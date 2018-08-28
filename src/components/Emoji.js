import React from 'react';

export default props => {
  const { symbol, label } = props;

  return (
    <span
      className="emoji"
      role="img"
      aria-label={label || ''}
      aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
    </span>
  );
};
