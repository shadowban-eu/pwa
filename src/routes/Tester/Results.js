import React from 'react';
import { useStore } from 'react-hookstore';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';

import Accordion from '../../Accordion';
import ProfileLink from './ProfileLink';
import ResultItem from './Results/ResultItem';
import ResultsLoading from './Results/ResultsLoading';
import ResultProfile from './Results/ResultProfile';

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

const Results = () => {
  const [{ screenName, loading, currentResult, fetchError }] = useStore('tester');
  const { t } = useTranslation('errors');

  const { profile } = currentResult;
  const errorMessage = fetchError ? t(fetchError.code) : null;

  return (
    <Accordion>
      {
        loading ?
          <ResultsLoading>
            Running tests for <ProfileLink screenName={screenName} />
          </ResultsLoading>
        :
          <ResultProfile profile={profile} errorMessage={errorMessage} />
      }
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
    </Accordion>
  );
};

export default Results;
