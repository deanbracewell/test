export const UPDATE_STORE = "UPDATE_STORE";

export const updateStore = (payload) => {
  return {
    type: UPDATE_STORE,
    payload: payload,
  };
};
