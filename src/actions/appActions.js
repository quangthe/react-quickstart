import {asyncAction, asyncActionType} from "./utils";

const asyncRequestWithDelay = timeoutInMs => new Promise(resolve => {
  setTimeout(() => {
    resolve("Demo async");
  }, timeoutInMs);
});

export const SIMPLE_ACTION = "SIMPLE_ACTION";
export const simpleAction = (arg) => {
  return {
    type: SIMPLE_ACTION,
    payload: arg
  };
};

export const SIMPLE_ASYNC_ACTION = asyncActionType("SIMPLE_ASYNC_ACTION");
const _simpleAsyncAction =  asyncAction(SIMPLE_ASYNC_ACTION);
export const simpleAsyncAction = (arg) => {
  return (dispatch, getState) => {
    dispatch(_simpleAsyncAction.request());

    asyncRequestWithDelay(3000).then(response => {
      dispatch(_simpleAsyncAction.success(response));
    });
  };
};


