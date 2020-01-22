import React from 'react';
import SVG from 'react-inlinesvg';

const SafeLink = ({ href, children, icon, iconClassName, ...props }) => (
  <a
    href={href || 'https://shadowban.eu'}
    target="_blank"
    rel="noreferrer noopener"
    {...props}
  >
    {children}
    {
      icon
        ? <SVG
            src="/icons/external-link.svg"
            className={iconClassName || 'inline w-4 h-4 ml-1 align-top stroke-current'}
          />
        : null
    }
  </a>
);

export default SafeLink;
