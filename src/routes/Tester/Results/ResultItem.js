import React from 'react';
import SVG from 'react-inlinesvg';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['tasks']);
  const type = determineResultType(result)
  const idName = `result-${key}`;

  const title = type === 'error'
    ? 'We were unable to test for technical reasons.'
    : t(`${key}.message`);

  const description = t(`${key}.description`);

  return (
    <div className="tab w-full overflow-hidden border-t border-gray-400">
      <input
        className="absolute opacity-0 "
        id={idName}
        type="checkbox"
        name={idName}
      />
      <label
        className={`block p-5 leading-normal cursor-pointer ${resultColors[type]}`}
        htmlFor={idName}
      >
        <SVG
          className="inline mr-4 fill-current"
          src={`/icons/${svgFileNames[type]}`}
        />
        <span className="inline">{result && result.ban === false && 'No '}{title}</span>
      </label>
      {
        description &&
          <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
            <p className="p-5">{description}</p>
          </div>
      }
    </div>
  );
};

export default ResultItem;
