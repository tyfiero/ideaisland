const sFormReducer = (state = { features: [], idea: null }, action) => {
  switch (action.type) {
    case "sForm_UPDATE":
      return action.payload;

    default:
      return state;
  }
};

export default sFormReducer;
