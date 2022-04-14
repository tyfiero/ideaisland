const sentenceArrayReducer = (
  state = [
      { id: 0, type: "Intro", list: "How", text: "How might we" },
      { id: 1, type: "Verb", list: "Modifier", text: "improve" },
      { id: 2, type: "Noun", list: "Software", text: "tech" },
      { id: 3, type: "Verb", list: "Action", text: "brainstorming" },
      {
        id: 4,
        type: "Desired Outcome",
        list: "People",
        text: "for entrepreneurs?",
      },
    ],
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
