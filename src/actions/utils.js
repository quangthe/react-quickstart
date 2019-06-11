/**
 * Creates standard action types for redux-thunk.
 *
 * @param type
 * @returns {{REQUEST: string, SUCCESS: string, ERROR: string}}
 */
export const asyncActionType = type => {
  return {
    REQUEST: `${type}_REQUEST`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`
  };
};

/**
 * Creates boilerplate code for async action.
 *
 * @param asyncActionType
 * @returns {{request: (function()), success: (function(*=)), error: (function(*=))}}
 */
export const asyncAction = asyncActionType => {
  return {
    request: () => {
      return {
        type: asyncActionType.REQUEST
      };
    },

    success: payload => {
      return {
        type: asyncActionType.SUCCESS,
        payload: payload
      };
    },

    error: error => {
      return {
        type: asyncActionType.ERROR,
        error: error
      };
    }
  };
};
