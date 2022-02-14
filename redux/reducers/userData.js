const userDataReducer = (state = null, action) => {
    switch (action.type) {
      case "USEREXISTS":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default userDataReducer;
  