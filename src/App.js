import React from 'react';
import { Router } from '@reach/router';

import Tester from './routes/Tester';

function App() {
  return (
    <div className="flex h-screen w-screen bg-shadowblue">
      <Router>
        <Tester path="/" default/>
        <Tester path="/:screenName" />
      </Router>
    </div>
  );
}

export default App;
