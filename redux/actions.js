export const logIn = (boolean) => {
  return {
    type: "LOGIN",
    payload: boolean,
  };
};
export const userDataRedux = (data) => {
  return {
    type: "USEREXISTS",
    payload: data,
  };
};

export const userNameAction = (data) => {
  return {
    type: "USERNAME_REDUX",
    payload: data,
  };
};
export const editModeAction = (data) => {
  return {
    type: "EDIT_MODE",
    payload: data,
  };
};
export const unsavedChangesAction = (data) => {
  return {
    type: "UNSAVED_CHANGES",
    payload: data,
  };
};
export const currentDocAction = (data) => {
  return {
    type: "SLUG",
    payload: data,
  };
};
export const darkMode = (boolean) => {
  return {
    type: "TOGGLE",
    payload: boolean,
  };
};

export const increment = (number) => {
  return {
    type: "INCREMENT",
    payload: number,
  };
};
export const soundSetting = (boolean) => {
  return {
    type: "CHANGE",
    payload: boolean,
  };
};
export const listNum = (listNum) => {
  return {
    type: "EDIT",
    payload: listNum,
  };
};

export const listChanged = (isChanged) => {
  return {
    type: "LISTCHANGE",
    payload: isChanged,
  };
};

export const wordAction = (text) => {
  return {
    type: "CHANGE",
    payload: text,
  };
};

export const similarRequest = (boolean) => {
  return {
    type: "TOGGLE",
    payload: boolean,
  };
};

export const allLists = (update) => {
  return {
    type: "UPDATE",
    payload: update,
  };
};

export const sWord1Action = (text) => {
  return {
    type: "CHANGEDWORD1",
    payload: text,
  };
};

export const sWord2Action = (text) => {
  return {
    type: "CHANGEDWORD2",
    payload: text,
  };
};

export const noteAction = (text) => {
  return {
    type: "NOTECHANGED",
    payload: text,
  };
};

export const randomizeAction = (text) => {
  return {
    type: "RANDOMIZE",
    payload: text,
  };
};

export const gpt3InputAction = (text) => {
  return {
    type: "EDITINPUT",
    payload: text,
  };
};

export const gptJInputAction = (text) => {
  return {
    type: "EDITJINPUT",
    payload: text,
  };
};

export const gpt3OutputAction = (text) => {
  return {
    type: "EDITOUTPUT",
    payload: text,
  };
};

export const gptJOutputAction = (text) => {
  return {
    type: "EDITJOUTPUT",
    payload: text,
  };
};
