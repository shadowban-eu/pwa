import React from 'react';
import { useTranslation } from 'react-i18next';
import SVG from 'react-inlinesvg';

import ResultDetails from './ResultDetails';
import AccordionItem from '../../../AccordionItem';

const resultColors = {
  ban: 'text-accent-error',
  ok: 'text-accent-success',
  error: 'text-accent-warn',
  none: ''
};
const svgFileNames = {
  ban: 'ban.svg',
  ok: 'check.svg',
  error: 'error.svg',
  none: 'help.svg'
};

const determineResultType = (result) => {
  if (!result) {
    return 'none';
  }
  if (result.ban === true) {
    return 'ban';
  }
  if (result.ban === false) {
    return 'ok';
  }
  return 'error';
};

const ResultItem = ({ test, result }) => {
  const { key } = test;
  const { t } = useTranslation(['tasks', 'errors']);
  const type = determineResultType(result)
  const idName = `result-${key}`;
  const title = type === 'error'
    ? t(`errors:${result.error}`, { screenName: result.screenName }) || t('errors:EUNKNOWN')
    : t(`${key}.message`);

  return (
    <AccordionItem id={idName}>
      <div className={resultColors[type]}>
        <SVG
          className="inline mr-4 fill-current"
          src={`/icons/${svgFileNames[type]}`}
        />
        <span className="inline">{type === 'ok' && 'No '}{title}</span>
      </div>
      <ResultDetails testKey={key} resultType={type} />
    </AccordionItem>
  );
};

export default ResultItem;
