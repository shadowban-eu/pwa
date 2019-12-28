import React from 'react';
import { useStore } from 'react-hookstore';
import { navigate } from '@reach/router';

import ProfileLink from '../ProfileLink';
import ResultItem from './ResultItem';
import ResultsLoading from './ResultsLoading';
import ResultProfile from './ResultProfile';

const tests = [{
  key: 'searchSuggestion',
  title: 'Search Suggestion Ban'
}, {
  key: 'search',
  title: 'Search Ban'
}, {
  key: 'ghost',
  title: 'Ghost Ban'
}, {
  key: 'replyDeboosting',
  title: 'Reply Deboosting'
}];

const ResultCard = ({ navigateToDetails }) => {
  const [{ screenName, loading, currentResult }] = useStore('tester');
  const { profile } = currentResult;

  return (
    <div className="
      flex flex-col
      w-full
    ">
      <div className="tab w-full overflow-hidden">
        {
          loading ?
            <ResultsLoading>
              Running tests for <ProfileLink screenName={screenName} />
            </ResultsLoading>
          :
            <ResultProfile profile={profile}>

            </ResultProfile>
        }
      </div>
      {
        tests.map(test => {
          const result = currentResult.tests ? currentResult.tests[test.key] : null;
          return (
            <ResultItem
              test={test}
              result={result}
              key={test.key}
              showDetails={() => navigate(`/details/${test.key}`)}
            />
          );
        })
      }
    </div>
  );
};

export default ResultCard;
