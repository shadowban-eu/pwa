import React from 'react';
import { useTranslation } from 'react-i18next';

import BBText from '../../BBText';

const FAQ = () => {
  const { t } = useTranslation('resurrect');

  return (
    <div className="
      flex flex-col
      card
      justify-center
      w-full sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5
      ml-auto mr-auto
    ">
      <div className="text-faq-q">
        <BBText>{ t('timelineTermination.q') }</BBText>
      </div>
      <div className="text-faq-a">
        <BBText>{ t('timelineTermination.a', { PUBLIC_URL: process.env.PUBLIC_URL }) }</BBText>
      </div>
    </div>
  );
};

export default FAQ;
