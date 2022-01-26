const gptJInputReducer = (state = "", action) => {
  switch (action.type) {
    case "EDITJINPUT":
      return action.payload;

    default:
      return state;
  }
};

export default gptJInputReducer;
