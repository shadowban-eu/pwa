import React from 'react';
import { useTranslation } from 'react-i18next';

import BBText from '../../../BBText';

const ResultDetails = ({ testKey }) => {
  const { t } = useTranslation('tasks');
  return (
    <div className="px-8 pb-6 border-b">
      <BBText>
        {t(`${testKey}.description`)}
      </BBText>
    </div>
  );
}

export default ResultDetails;
