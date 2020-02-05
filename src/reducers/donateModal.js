import { actions } from '../actions/donateModal';

export const initialState = {
  donateClicked: false,
  tested: localStorage.getItem('tested') || 0,
  donateCta: localStorage.getItem('donate-cta') || false
};

export const reducer = (state, action) => {
  if (actions[action.type]) {
    return actions[action.type](state, action, initialState);
  }
  return initialState;
};
