const randomizeReducer = (state = false, action) => {
    switch (action.type) {
      case "RANDOMIZE":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default randomizeReducer;
  