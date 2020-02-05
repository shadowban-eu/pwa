export const INCREMENT_TESTED = Symbol('INCREMENT_TESTED');
export const SET_DONATE_CLICKED = Symbol('SET_DONATE_CLICKED');

export const symbols = {
  INCREMENT_TESTED,
  SET_DONATE_CLICKED
};

export const actions = {
  [INCREMENT_TESTED]: (state, action) => ({
    ...state,
    tested: state.tested + 1
  }),
  [SET_DONATE_CLICKED]: (state) => ({
    ...state,
    donateClicked: true
  })
};

export default { symbols, actions };
