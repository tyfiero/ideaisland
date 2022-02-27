const userNameReducer = (state = null, action) => {
    switch (action.type) {
      case "USERNAME_REDUX":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default userNameReducer;
  