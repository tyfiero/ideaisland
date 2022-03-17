const userDisplayName = (state = null, action) => {
  switch (action.type) {
    case "DISPLAY_NAME_REDUX":
      return action.payload;

    default:
      return state;
  }
};

export default userDisplayName;
