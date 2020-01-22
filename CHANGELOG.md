# Changelog
All notable changes to this project will be documented in this file.

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

