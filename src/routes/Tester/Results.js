import React from 'react';
import { Router } from '@reach/router';

import ResultDetails from './Results/ResultDetails';
import ResultsCard from './Results/ResultsCard';

const Results = () => {
  return (
    <div className="
      card
      self-center
      min-h-results
      w-full sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5
      ml-auto mr-auto
      overflow-hidden
      p-0
    ">
      <Router className="flex w-full">
        <ResultsCard default />
        <ResultDetails path="/details/:testKey" />
      </Router>
    </div>
  );
};

export default Results;
