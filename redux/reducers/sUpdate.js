const sUpdateReducer = (state = false, action) => {
  switch (action.type) {
    case "sUPDATE":
      return action.payload;

    default:
      return state;
  }
};

export default sUpdateReducer;
