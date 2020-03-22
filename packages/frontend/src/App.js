import React from 'react';
import { Router } from '@reach/router';

import HeaderMenu from './HeaderMenu';
import Tester from './routes/Tester';
import Resurrect from './routes/Resurrect';
import Footer from './Footer';

import I18N from './i18n';

I18N();

function App() {
  return (
    <div className="flex flex-col h-screen">
      <HeaderMenu />
      <Router className="flex-1">
        <Tester path="/" default/>
        <Tester path="/:screenName" />
        <Resurrect path="/resurrect/" />
        <Resurrect path="/resurrect/:probeId" />
      </Router>
      <Footer className="h-20" />
    </div>
  );
}

export default App;
