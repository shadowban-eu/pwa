import React from 'react';
import { useStore } from 'react-hookstore';
import { useTranslation } from 'react-i18next';

const Title = () => {
  const [{ title, fetching }] = useStore('resurrect');
  const { t } = useTranslation('resurrect');

  return (
    <h2 className="
      w-full
      mt-10 mb-6
      font-lobster
      leading-title
      text-smtitle sm:text-smtitle md:text-title
      text-twitterblue
    ">
      This tweet is <span className="text-accent-purple">
      {
        fetching
          ? t('title.fetching')
          : t(title)
      }
      </span>
    </h2>
  );
};

export default Title;

