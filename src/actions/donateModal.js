export const INCREMENT_TESTED = Symbol('INCREMENT_TESTED');
export const SET_DONATE_CLICKED = Symbol('SET_DONATE_CLICKED');
export const SET_SEEN_CTA = Symbol('SET_SEEN_CTA');

export const symbols = {
  INCREMENT_TESTED,
  SET_DONATE_CLICKED,
  SET_SEEN_CTA
};

export const actions = {
  [INCREMENT_TESTED]: (state) => {
    localStorage.setItem('tested', state.tested + 1);
    return ({
      ...state,
      tested: state.tested + 1
    })
  },
  [SET_DONATE_CLICKED]: (state) => ({
    ...state,
    donateClicked: true
  }),
  [SET_SEEN_CTA]: (state) => {
    localStorage.setItem('donate-cta', true);
    return ({
      ...state,
      seenCTA: true
    });
  }
};

export default { symbols, actions };
