import React from 'react';

export default ({email}) => (
  email.endsWith('@gmail.com') &&
    <a href="https://mail.google.com/">Go to my inbox →</a>
);
