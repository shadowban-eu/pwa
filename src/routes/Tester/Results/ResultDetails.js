import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-hookstore';

import BBText from '../../../BBText';

const ResultDetails = ({ testKey }) => {
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

  return (
    <div className="px-16 pb-6 border-b">
      {
        details && details.ban
          ? <BBText>
              { t(`${testKey}.details`, details) }
            </BBText>
          : null
      }
      <BBText>
        {t(`${testKey}.description`)}
      </BBText>
    </div>
  );
}

export default ResultDetails;
