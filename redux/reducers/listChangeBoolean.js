const listChanged = (state = false, action) => {
  switch (action.type) {
    case "LISTCHANGE":
      return action.payload;

    default:
      return state;
  }
};

export default listChanged;
