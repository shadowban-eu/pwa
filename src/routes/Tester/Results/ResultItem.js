import React from 'react';
import SVG from 'react-inlinesvg';

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

const ResultItem = ({ data, result, type = 'none' }) => {
  const { key, description } = data;

  const titlePrefix = result && result.ban === false ? 'No ' : '';
  const title = type === 'error'
    ? 'We were unable to test for technical reasons.'
    : data.title;

  return (
    <div className="tab w-full overflow-hidden border-t border-gray-400">
      <input
        className="absolute opacity-0 "
        id={`result-${key}`}
        type="checkbox"
        name={`result-${key}`}
      />
      <label
        className={`block p-5 leading-normal cursor-pointer ${resultColors[type]}`}
        htmlFor={`result-${key}`}
      >
        <SVG
          className="inline mr-4 fill-current"
          src={`/icons/${svgFileNames[type]}`}
        />
        <span className="inline">{titlePrefix} {title}</span>
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
