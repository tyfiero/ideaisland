const randomizeReducer = (state = [false, "problem"], action) => {
    switch (action.type) {
      case "RANDOMIZE":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default randomizeReducer;
  