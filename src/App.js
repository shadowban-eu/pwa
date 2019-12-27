import React from 'react';
import { Router } from '@reach/router';

import Tester from './routes/Tester';
import Footer from './Footer';

import I18N from './i18n';

I18N();

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
