import React from 'react';
import SVG from 'react-inlinesvg';
import { useStore } from 'react-hookstore';

import ResultItem from './ResultItem';

const tests = [{
  id: 'searchSuggestion',
  title: 'Search Suggestion Ban',
  description: 'Foo'
}, {
  id: 'search',
  title: 'Search Ban',
  description: 'Bar'
}, {
  id: 'ghost',
  title: 'Ghost Ban',
  description: 'Baz'
}, {
  id: 'replyDeboosting',
  title: 'Reply Deboosting',
  description: 'RooFoo'
}];

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
}

const ProfileLink = ({ screenName }) =>
  <a href={`https://twitter.com/${screenName}`}>{screenName}</a>;

const Results = () => {
  const [{ screenName, loading, currentResult }] = useStore('tester');
  const { profile } = currentResult;

  let profileTitle;
  let profileLink;
  let profileOk = true;
  let resultColor;
  let svgFileName = 'gears.svg';

  if (!profile) {
    profileTitle = 'Test Results';
  } else if (loading) {
    profileTitle = `Running test for ${screenName}`;
  } else if (!profile.exists) {
    profileTitle = 'does not exist';
    profileLink = <ProfileLink screenName={profile.screen_name} />;
    profileOk = false;
    svgFileName = 'help.svg';
    resultColor = 'text-accent-warn';
  } else if (profile.protected) {
    profileTitle = 'is protected';
    profileLink = <ProfileLink screenName={profile.screen_name} />;
    profileOk = false;
    svgFileName = 'help.svg';
    resultColor = 'text-accent-warn';
  } else if (!profile.has_tweets) {
    profileTitle = 'has no tweets';
    profileLink = <ProfileLink screenName={profile.screen_name} />;
    profileOk = false;
    svgFileName = 'help.svg';
    resultColor = 'text-accent-warn';
  } else {
    profileTitle = 'exists';
    profileLink = <ProfileLink screenName={profile.screen_name} />;
    svgFileName = 'check.svg';
    resultColor = 'text-accent-success';
  }

  return (
    <div className="
      card
      flex flex-col
      self-center
      sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5
      ml-auto mr-auto
      p-0
    ">
    <div className="tab w-full overflow-hidden">
      <label className={`block p-5 leading-normal ${resultColor}`}>
        <SVG
          src={`/icons/${svgFileName}`}
          width={24} height={24}
          className={`inline mr-4 fill-current ${loading || profile ? '' : 'invisible'}`}
        />
        <span className="inline">{profileLink} {profileTitle}</span>
      </label>
    </div>
      {
        tests.map(test => {
          const result = currentResult.tests ? currentResult.tests[test.id] : null;
          const type = determineResultType(result);
          return (
            <ResultItem data={test} key={test.id} result={result} type={type} />
          );
        })
      }
    </div>
  );
};

export default Results;
