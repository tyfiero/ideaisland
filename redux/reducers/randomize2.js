const randomize2Reducer = (state = false, action) => {
    switch (action.type) {
      case "RANDOMIZE2":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default randomize2Reducer;
  