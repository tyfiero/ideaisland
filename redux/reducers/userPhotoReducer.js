const userPhotoReducer = (state = null, action) => {
  switch (action.type) {
    case "PHOTO_REDUX":
      if(action.payload){
        return action.payload;

      }else{
        return null;
      }

    default:
      return state;
  }
};

export default userPhotoReducer;
