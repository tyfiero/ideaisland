const userNameReducer = (state = null, action) => {
    switch (action.type) {
      case "USERNAME":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default userNameReducer;
  