import React from 'react';

const SafeLink = ({ href, children }) => (
  <a
    href={href || 'https://shadowban.eu'}
    target="_blank"
    rel="noreferrer noopener"
  >
    {children}
  </a>
);

export default SafeLink;
