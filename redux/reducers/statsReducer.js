const statsReducer = (state = null, action) => {
    switch (action.type) {
      case "STATS_UPDATE":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default statsReducer;
  