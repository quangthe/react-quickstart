import {SIMPLE_ACTION, SIMPLE_ASYNC_ACTION} from "../actions/appActions";

const initialState = {
  key1: "value1",
  key2: "value2"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIMPLE_ACTION:
      return {
        ...state,
        key1: action.payload
      };
    case SIMPLE_ASYNC_ACTION.SUCCESS:
      return {
        ...state,
        key2: action.payload
      };
    default:
      return state;
  }
};
