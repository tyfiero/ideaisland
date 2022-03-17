const userPhotoReducer = (state = null, action) => {
  switch (action.type) {
    case "PHOTO_REDUX":
      return action.payload;

    default:
      return state;
  }
};

export default userPhotoReducer;
