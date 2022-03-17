const userUidReducer = (state = null, action) => {
  switch (action.type) {
    case "UID_Redux":
      return action.payload;

    default:
      return state;
  }
};

export default userUidReducer;
