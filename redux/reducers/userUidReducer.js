const userUidReducer = (state = null, action) => {
  switch (action.type) {
    case "UID_Redux":
      if(action.payload){
        return action.payload;

      }else{
        return null;
      }

    default:
      return state;
  }
};

export default userUidReducer;
