import React from 'react';
import SVG from 'react-inlinesvg';

import ProfileLink from '../ProfileLink';

const ResultProfile = ({ profile, errorMessage }) => {
  let profileTitle;
  let resultColor;
  let svgFileName = 'gears.svg';

  if (errorMessage) {
    profileTitle = errorMessage;
    svgFileName = 'error.svg';
    resultColor = 'text-accent-warn';
  } else if (!profile) {
    profileTitle = 'Test Results';
  } else if (!profile.exists) {
    profileTitle = ' does not exist';
    svgFileName = 'error.svg';
    resultColor = 'text-accent-warn';
  } else if (profile.protected) {
    profileTitle = ' is protected';
    svgFileName = 'error.svg';
    resultColor = 'text-accent-warn';
  } else if (!profile.has_tweets) {
    profileTitle = ' has no tweets';
    svgFileName = 'error.svg';
    resultColor = 'text-accent-warn';
  } else {
    profileTitle = ' exists';
    svgFileName = 'check.svg';
    resultColor = 'text-accent-success';
  }

  return (
    <label className={`block p-5 leading-normal result-profile ${resultColor}`}>
      <SVG
        src={`/icons/${svgFileName}`}
        width={24} height={24}
        className={`inline mr-4 fill-current ${profile ? '' : 'invisible'}`}
      />
      <span className="inline">
        {
          profile && (<ProfileLink screenName={profile.screen_name} /> )
        }
        {profileTitle}
      </span>
    </label>
  );
};

export default ResultProfile;
