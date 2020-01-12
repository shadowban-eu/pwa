import { actions } from '../actions/resurrect';

export const initialState = {
  probeId: '',
  result: null,
  title: 'title.default',
  fetching: false,
  fetchError: null
};

export const reducer = (state, action) => {
  if (actions[action.type]) {
    return actions[action.type](state, action);
  }
  return initialState;
};
