import { actions } from '../actions/tester';

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
  if (actions[action.type]) {
    return actions[action.type](state, action, initialState);
  }
  return initialState;
};
