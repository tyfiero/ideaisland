const editModeReducer = (state = "display", action) => {
    switch (action.type) {
      case "EDIT_MODE":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default editModeReducer;
  