import {AUTH0_AUTHENTICATION} from "../actions/authActions";

const initialState = {

};

export default (state=initialState, action) => {
  switch (action.type) {
    case AUTH0_AUTHENTICATION:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};