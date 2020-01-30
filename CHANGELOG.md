# Changelog
All notable changes to this project will be documented in this file.

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



54dd531 Add: proper messages for ENOREPLIES and EUNKNOWN
ff6c124 Add: result details for reply deboosting
64c7281 Meta: sort out Tester API response mocks
9b2a06b Fix: missing suspended state
9308921 Fix: legacy conversion throwing on empty test results
3878c19 Fix: not using SSL for naughty backend URLs
4f0bf4f Remove: image from limitVisibility FAQ
1308663 Change: Resurrect FAQ text
ebb2dc8 Change: Streamable size
e990eea Add: Tester FAQ
5095f00 Fix: long AccordionItem contents oversizing entire document body
636d747 Refactor: extract Accordion + AccordionItem
28843c1 Add: h1-h6 BBText tags
0bb4964 Fix: too short and cramed Resurrect Controls input

cc4c53a Change: thinner font for HeaderMenu
a403f28 Change: more x-padding for ResultDetails to line up with its header's text
83a0503 Change: base font-weight to 500 (.font-medium
