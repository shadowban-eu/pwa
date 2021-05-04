import React from 'react';

import SafeLink from './SafeLink';

const Footer = () => {
  const commitHref = `https://github.com/shadowban-eu/pwa/commit/${process.env.GIT_COMMIT}`;
  return (
    <div className="h-20 w-full py-8 font-normal text-center text-xs bg-shadowblue">
      Made in Germany by{' '}
      <SafeLink href="https://twitter.com/shadowban_eu">@shadowban_eu</SafeLink>
      <br />
      <SafeLink href="https://github.com/shadowban-eu">GitHub</SafeLink>{' '}
      <SafeLink href={commitHref}>
        <span className="font-hairline">
          ({process.env.GIT_BRANCH}@{process.env.GIT_COMMIT})
        </span>
      </SafeLink>
    </div>
  );
};

export default Footer;
