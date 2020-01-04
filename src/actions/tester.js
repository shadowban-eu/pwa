import { twitterHandleRX } from '../utils';

export const SET_SCREEN_NAME = Symbol('SET_SCREEN_NAME');
export const VALIDATE_SCREEN_NAME = Symbol('VALIDATE_SCREEN_NAME');
export const RUN_TEST = Symbol('RUN_TEST');
export const SET_CURRENT_RESULTS = Symbol('SET_CURRENT_RESULTS');

export const symbols = {
  SET_SCREEN_NAME,
  VALIDATE_SCREEN_NAME,
  RUN_TEST,
  SET_CURRENT_RESULTS
};

export const actions = {
  [SET_SCREEN_NAME]: (state, action) => ({
    ...state,
    screenName: action.screenName
  }),
  [VALIDATE_SCREEN_NAME]: (state, action) => ({
    ...state,
    valid: action.screenName === '' || twitterHandleRX.test(action.screenName)
  }),
  [RUN_TEST]: (state, action) => ({
    ...state,
    loading: true
  }),
  [SET_CURRENT_RESULTS]: (state, action) => ({
    ...state,
    loading: false,
    currentResult: action.result
  })
};

export default { symbols, actions };