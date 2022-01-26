const sWord1 = (state = "AirBNB", action) => {
  switch (action.type) {
    case "CHANGEDWORD1":
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

export default sWord1;
