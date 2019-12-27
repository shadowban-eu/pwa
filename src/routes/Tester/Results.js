import React from 'react';
import { useStore } from 'react-hookstore';

import ProfileLink from './ProfileLink';
import ResultItem from './Results/ResultItem';
import ResultsLoading from './Results/ResultsLoading';
import ResultProfile from './Results/ResultProfile';

const tests = [{
  key: 'searchSuggestion',
  title: 'Search Suggestion Ban',
  description: 'Foo'
}, {
  key: 'search',
  title: 'Search Ban',
  description: 'Bar'
}, {
  key: 'ghost',
  title: 'Ghost Ban',
  description: 'Baz'
}, {
  key: 'replyDeboosting',
  title: 'Reply Deboosting',
  description: 'RooFoo'
}];

const Results = () => {
  const [{ screenName, loading, currentResult }] = useStore('tester');
  const { profile } = currentResult;

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
            />
          );
        })
      }
    </div>
  );
};

export default Results;
