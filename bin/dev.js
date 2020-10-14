#!/usr/bin/env node
// npm run build:tailwind && react-scripts start

const { spawn } = require('child_process');
const options = { stdio: 'inherit' };

spawn(
  'nodemon',
  [
    '--watch', 'src/styles/index.css',
    '--watch', 'tailwind.config.js',
    '--exec', 'npm run build:tailwind'
  ],
  options
);

spawn(
  'node',
  ['scripts/start.js'],
  options
);
