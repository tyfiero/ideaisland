const userNameReducer = (state = null, action) => {
    switch (action.type) {
      case "USERNAME_REDUX":
        if(action.payload){
          return action.payload;

        }else{
          return null;
        }
  
      default:
        return state;
    }
  };
  
  export default userNameReducer;
  