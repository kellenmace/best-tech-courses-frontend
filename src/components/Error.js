import React from 'react';
import Emoji from "./Emoji";

export default props => {
  const { message } = props;

  return (
    <div>
      <p>
        <Emoji symbol="🚫" label="no" /> {message} <Emoji symbol="☹️" label="frowning face" />
      </p>
      <a href={window.location.href}>Reload</a>
    </div>
  );
};
