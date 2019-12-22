import React from 'react';
import SVG from 'react-inlinesvg';

const resultColors = {
  ban: 'text-accent-error',
  ok: 'text-accent-success',
  error: 'text-accent-warn',
  none: ''
};
const svgFileNames = {
  ban: 'error.svg',
  ok: 'check.svg',
  error: 'help.svg',
  none: 'help.svg'
};


const ResultItem = ({ data, result, type = 'none' }) => {
  const { id, description } = data;

  const titlePrefix = result && result.ban === false ? 'No ' : '';
  const title = type === 'error'
    ? 'We were unable to test for technical reasons.'
    : data.title;

  return (
    <div className="tab w-full overflow-hidden">
       <input className="absolute opacity-0 " id={`result-${id}`} type="checkbox" name={`result-${id}`} />
       <label className={`block p-5 leading-normal cursor-pointer ${resultColors[type]}`} htmlFor={`result-${id}`}>
        <SVG className="inline mr-4 fill-current" src={`/icons/${svgFileNames[type]}`} />
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
