import React from 'react';
import SVG from 'react-inlinesvg';

const ResultsLoading = ({ children }) => (
  <label className="block p-5 leading-normal result-profile">
    <SVG
      src="/icons/gears.svg"
      width={24} height={24}
      className="inline mr-4 fill-current"
    />
    <span className="inline">{children}</span>
  </label>
);

export default ResultsLoading;
