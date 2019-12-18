import { SET_SCREEN_NAME, VALIDATE_SCREEN_NAME } from '../actions';

const twitterHandleRX = /^[A-Za-z0-9_]{1,15}$/;

export const initialState = {
  screenName: '',
  valid: true
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
    default:
      return initialState;
  }
};
