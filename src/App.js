import React from 'react';
import { Router } from '@reach/router';

import Tester from './routes/Tester';

function App() {
  return (
    <Router>
      <Tester path="/" default/>
      <Tester path="/:screenName" />
    </Router>
  );
}

export default App;
