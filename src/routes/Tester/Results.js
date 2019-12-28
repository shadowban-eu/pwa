import React from 'react';
import { Router } from '@reach/router';

import ResultDetails from './Results/ResultDetails';
import ResultsCard from './Results/ResultsCard';

const Results = () => {
  return (
    <Router>
      <ResultsCard default />
      <ResultDetails path="/details/:testKey" />
    </Router>
  );
};

export default Results;
