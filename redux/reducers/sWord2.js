const sWord2 = (state = "Healthcare", action) => {
  switch (action.type) {
    case "CHANGEDWORD2":
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

export default sWord2;
