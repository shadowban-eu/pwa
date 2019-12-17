import { SET_SCREEN_NAME } from '../actions';

export const initialState = '';

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_SCREEN_NAME:
      return action.screenName;
    default:
      return initialState;
  }
};
