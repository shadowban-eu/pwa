# Changelog

All notable changes to this project will be documented in this file.

## [0.4.2] - 2020-03-22

### Bugs

- Fixed: Header not showing on Safari mobile [16022d7]

## [0.4.1] - 2020-02-12

### Bugs

- Fixed: EUNKNOWN result displaying and API response conversion [20a0d53..8fcbdc5]

### Features

- Changed: DonateModal animation and layout [0705d95, 042f2b8, 2a56aac..6daa760]
- Added: GPay donation option [4af9bcd]

### Meta/Development

- Changed: Serving API mocks from webpack-dev-server, instead of http-server [003de2a]

  This allows for testing on Android devices when using the also added `./bin/adb-reverse.sh` script.

  1. Set `REACT_APP_TEST_URL=http://localhost:3000/.api` and `REACT_APP_RESURRECT_URL=http://localhost:3000/.api/resurrect` in your .env.development.local file
  2. Run `yarn start` or `npm start` to start the webpack-dev-server.

  Available data is still in the `/.api` folder, but with the extension `.json`!

## [0.4.0] - 2020-02-07

### Bugs

- Fixed: missing detail message for ENOREPLIES [e889670]

### Features

- Added: Accepting Crypto donations [0c84c65]

## [0.3.1] - 2020-02-05

### Bugs

- Fixed: missing @ wherever screenNames appear in translations [34ef229]
- Fixed: cross-origin fetching of manifest.json missing cookie[f71f9a8]
- Fixed: 'undefined' result when Reply Deboost test fails due to Ghost Ban [8bb1c8a]

## [0.3.0] - 2020-01-30

### Features

- Added: Additional details for results, e.g. "found this answer to that tweet" [e1196f9,b23823a,9a9f1d9,b79bceb]
- Changed: Replaced image in limitVisibility FAQ with blockquote text[4f0bf4f]
- Changed: text sizes and fixed general layout quirks [cc4c53a,a403f28,83a0503]

## [0.2.0] - 2020-01-14

### Features

- Added: error message for resurrect test when backend not available [874d788]
- Added: legacy to pwa response format conversion [dd5280b]
- Added: screenName/probeId showing in document title

### Bugs

- Fixed: UI not resetting on new testruns [201bbf3]
- Fixed: HeaderMenuLink not active on /screenName|probeId paths [8bfb6f5]
- Fixed: running test with same screenName/probeId not working [53ce233,4c263d8]

## [0.1.0] - 2020-01-14

### Features

- Added: Error message when no tweet with probeId exists

### Bugs

- Fixed: probeId input regex choking on ?s= parameter
- Fixed: Title stuck on fetching state when request errors out
