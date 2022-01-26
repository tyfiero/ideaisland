const noteContent = (state = "", action) => {
  switch (action.type) {
    case "NOTECHANGED":
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

export default noteContent;
