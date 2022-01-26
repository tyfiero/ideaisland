const wordReducer = (state = "Innovation", action) => {
  switch (action.type) {
    case "CHANGE":
      var actionPayload = action.payload;

      if (actionPayload === undefined) {
        return state;
      } else {
        return action.payload;
      }

    default:
      return state;
  }
};

export default wordReducer;
