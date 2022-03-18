const logOutReducer = (state = false, action) => {
    switch (action.type) {
      case "LOGOUT":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default logOutReducer;
  