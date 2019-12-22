import React from 'react';
import { Router } from '@reach/router';

import Tester from './routes/Tester';
import Footer from './Footer';

function App() {
  return (
    <div>
      <Router>
        <Tester path="/" default/>
        <Tester path="/:screenName" />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
