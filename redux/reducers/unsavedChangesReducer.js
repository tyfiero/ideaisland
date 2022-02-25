const unsavedChangesReducer = (state = false, action) => {
    switch (action.type) {
      case "UNSAVED_CHANGES":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default unsavedChangesReducer;
  