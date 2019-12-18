#!/usr/bin/env node
// npm run build:tailwind && react-scripts start

const { spawn } = require('child_process');
const options = { stdio: 'inherit' };

spawn(
  'nodemon',
  [
    '--watch', 'src/styles/index.css',
    '--exec', 'npm run build:tailwind'
  ],
  options
);

spawn(
  'react-scripts',
  ['start'],
  options
);
