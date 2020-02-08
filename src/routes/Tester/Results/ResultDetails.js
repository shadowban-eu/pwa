import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-hookstore';

import BBText from '../../../BBText';

const ResultDetails = ({ testKey, resultType }) => {
  const { t } = useTranslation('tasks');
  const [{ currentResult }] = useStore('tester');

  let details;
  if (currentResult.profile && currentResult.tests) {
    const { screen_name: screenName } = currentResult.profile;
    details = currentResult.tests[testKey];

    if (details.stage === 0) {
      details.stage = 'Show more replies';
    } else if (details.stage === 1) {
      details.stage = 'Show more replies and once more to reveal offensive tweets';
    }

    details.screenName = screenName;
  }

  let detailsText;
  if (details && resultType !== 'none') {
    if (resultType !== 'error') {
      detailsText = details.ban
        ? t(`${testKey}.details.ban`, details)
        : t(`${testKey}.details.noBan`, details)
    } else if (details.error !== 'EUNKNOWN') {
      detailsText = t(`${testKey}.details.${details.error}`, details);
    }
  }

  return (
    <div className="px-16 pb-6 border-b">
      {
        detailsText
          ? <p className="bg-gray-300 border border-gray-600 mb-4 p-2">
              <BBText>
                {detailsText}
              </BBText>
            </p>
          : null
      }
      <BBText>
        {t(`${testKey}.description`)}
      </BBText>
    </div>
  );
};

export default ResultDetails;
