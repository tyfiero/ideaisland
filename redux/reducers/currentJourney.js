const currentJourney = (state = { results: [] }, action) => {
  switch (action.type) {
    case "JOURNEY":
      return action.payload;

    default:
      return state;
  }
};

export default currentJourney;
