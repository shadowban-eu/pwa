import React from 'react';
import { useStore } from 'react-hookstore';
import { useTranslation } from 'react-i18next';

import SafeLink from '../../SafeLink';

const Title = () => {
  const [{ result, title, fetching, fetchError }] = useStore('resurrect');
  const { t } = useTranslation('resurrect');

  let subjectTweetLink;
  let subjectAuthorLink;
  if (result && !fetchError) {
    const { parentId } = result.tweets.testedWith;
    const { parentAuthorScreenName } = result.tweets.testedWith;
    subjectTweetLink = `https://twitter.com/${parentAuthorScreenName}/status/${parentId}`;

    if (result.protected || result.suspended) {
      subjectAuthorLink = `https://twitter.com/${parentAuthorScreenName}`;
    }
  }

  return (
    <h2 className="
      h-20
      w-full
      mt-10 mb-6
      font-lobster
      text-center
      leading-title
      text-smtitle sm:text-smtitle md:text-title
      text-twitterblue
    ">
      {
        subjectTweetLink
          ? <SafeLink href={subjectTweetLink} icon>This tweet</SafeLink>
          : 'This tweet'
      }
      { ' is ' }
      <br className="xl:hidden" />
      <span className="text-accent-purple">
      {
        fetching
          ? t('title.fetching')
          : subjectAuthorLink
            ? <SafeLink
                href={subjectAuthorLink}
                className="text-accent-purple"
                icon
                >
                {t(title)}
              </SafeLink>
            : t(title)
      }
      </span>
    </h2>
  );
};

export default Title;

