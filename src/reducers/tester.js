import {
  SET_SCREEN_NAME,
  VALIDATE_SCREEN_NAME,
  RUN_TEST,
  SET_CURRENT_RESULTS
} from '../actions';

const twitterHandleRX = /^[A-Za-z0-9_]{1,15}$/;

export const initialState = {
  screenName: '',
  valid: true,
  loading: false,
  currentResult: {
    profile: null,
    tests: null
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_SCREEN_NAME:
      return {
        ...state,
        screenName: action.screenName
      };
    case VALIDATE_SCREEN_NAME:
      return {
        ...state,
        valid: action.screenName === '' || twitterHandleRX.test(action.screenName)
      };
    case RUN_TEST:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_RESULTS:
      return {
        ...state,
        loading: false,
        currentResult: action.result
      };
    default:
      return initialState;
  }
};
