const gpt3InputReducer = (state = "", action) => {
  switch (action.type) {
    case "EDITINPUT":
      return action.payload;

    default:
      return state;
  }
};

export default gpt3InputReducer;
