import { tweetUrlOrIdRX } from '../utils';

export const SET_PROBE_ID = Symbol('SET_PROBE_ID');
export const VALIDATE_PROBE_ID = Symbol('VALIDATE_PROBE_ID');
export const RUN_TEST = Symbol('RUN_TEST');
export const SET_RESULT = Symbol('SET_RESULT');
export const RESET_RESULT = Symbol('RESET_RESULT');
export const SET_FETCH_ERROR = Symbol('SET_FETCH_ERROR');

export const symbols = {
  SET_PROBE_ID,
  VALIDATE_PROBE_ID,
  RUN_TEST,
  SET_RESULT,
  RESET_RESULT,
  SET_FETCH_ERROR
};

export const actions = {
  [SET_PROBE_ID]: (state, action) => ({
    ...state,
    fetchError: null,
    probeId: action.probeId
  }),
  [VALIDATE_PROBE_ID]: (state, action) => ({
    ...state,
    valid: action.probeId === '' || tweetUrlOrIdRX.test(action.probeId)
  }),
  [RUN_TEST]: (state, action) => ({
    ...state,
    fetchError: null,
    fetching: true,
    result: null,
    title: 'title.fetching'
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
      fetchError: null,
      result: action.result,
      title: `title.${title}`
    };
  },
  [RESET_RESULT]: (state, action, initialState) => ({
    ...initialState,
    probeId: state.probeId
  }),
  [SET_FETCH_ERROR]: (state, action) => ({
    ...state,
    fetching: false,
    result: null,
    title: 'title.default',
    fetchError: action.fetchError
  })
};

export default { symbols, actions };
