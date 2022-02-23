const currentDocReducer = (state = null, action) => {
    switch (action.type) {
      case "SLUG":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default currentDocReducer;
  