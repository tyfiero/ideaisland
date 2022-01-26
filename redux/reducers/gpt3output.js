const gpt3OutputReducer = (state = "", action) => {
  switch (action.type) {
    case "EDITOUTPUT":
      return action.payload;

    default:
      return state;
  }
};

export default gpt3OutputReducer;
