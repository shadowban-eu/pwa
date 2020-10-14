import { twitterHandleRX, convertLegacyAPIResponse } from '../utils';

export const SET_SCREEN_NAME = Symbol('SET_SCREEN_NAME');
export const VALIDATE_SCREEN_NAME = Symbol('VALIDATE_SCREEN_NAME');
export const RUN_TEST = Symbol('RUN_TEST');
export const SET_CURRENT_RESULTS = Symbol('SET_CURRENT_RESULTS');
export const RESET_CURRENT_RESULTS = Symbol('RESET_CURRENT_RESULTS');
export const SET_FETCH_ERROR = Symbol('SET_FETCH_ERROR');

export const symbols = {
  SET_SCREEN_NAME,
  VALIDATE_SCREEN_NAME,
  RUN_TEST,
  SET_CURRENT_RESULTS,
  RESET_CURRENT_RESULTS,
  SET_FETCH_ERROR
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
    loading: true,
    fetchError: null
  }),
  [SET_CURRENT_RESULTS]: (state, action) => {
    return ({
      ...state,
      loading: false,
      currentResult: convertLegacyAPIResponse(action.result)
    });
  },
  [RESET_CURRENT_RESULTS]: (state, action, initialState) => ({
    ...state,
    loading: false,
    currentResult: initialState.currentResult,
    fetchError: null
  }),
  [SET_FETCH_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    fetchError: action.fetchError
  })
};

export default { symbols, actions };
