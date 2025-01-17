const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}