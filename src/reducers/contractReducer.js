import {
  UPDATE_STORE,
} from "../actions/contractActions";

let initalState = {
  isSmallerThanMD: false,
};

export const contractReducer = (state = initalState, action) => {
  switch (action.type) {
    case UPDATE_STORE:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};
