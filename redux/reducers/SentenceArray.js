const sentenceArrayReducer = (
  state = "How might we improve brainstorming for entrepreneurs?",
  action
) => {
  switch (action.type) {
    case "S_ARRAY_UPDATE":
      return action.payload;

    default:
      return state;
  }
};

export default sentenceArrayReducer;
