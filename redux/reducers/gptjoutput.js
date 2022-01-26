const gptJOutputReducer = (state = "", action) => {
  switch (action.type) {
    case "EDITJOUTPUT":
      return action.payload;

    default:
      return state;
  }
};

export default gptJOutputReducer;
