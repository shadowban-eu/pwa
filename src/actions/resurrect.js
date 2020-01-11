export const SET_PROBE_ID = Symbol('SET_PROBE_ID');
export const RUN_TEST = Symbol('RUN_TEST');
export const SET_RESULT = Symbol('SET_RESULT');
export const SET_FETCH_ERROR = Symbol('SET_FETCH_ERROR');

export const symbols = {
  SET_PROBE_ID,
  RUN_TEST,
  SET_RESULT,
  SET_FETCH_ERROR
};

export const actions = {
  [SET_PROBE_ID]: (state, action) => ({
    ...state,
    fetchError: null,
    probeId: action.probeId
  }),
  [RUN_TEST]: (state, action) => ({
    ...state,
    fetchError: null,
    fetching: true
  }),
  [SET_RESULT]: (state, action) => {
    const title = (action.result.terminated && 'terminated')
      || (action.result.protected && 'protected')
      || (action.result.suspended && 'suspended')
      || (action.result.deleted && 'deleted')
      || 'ok';
    return {
      ...state,
      fetching: false,
      result: action.result,
      title: `title.${title}`
    };
  },
  [SET_FETCH_ERROR]: (state, action) => ({
    ...state,
    fetching: false,
    result: null,
    fetchError: action.error
  })
};

export default { symbols, actions };
