/* redux/store.js */
import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';



import counterReducer from "./reducers/counter";
import listReducer from "./reducers/list";
import listChanged from "./reducers/listChangeBoolean";
import wordReducer from "./reducers/word";
import similarWordsRequested from "./reducers/similarWords";
import allLists from "./reducers/allLists";
import sWord1 from "./reducers/sWord1";
import sWord2 from "./reducers/sWord2";
import noteContent from "./reducers/noteContent";
import randomizeReducer from "./reducers/randomize";
import gpt3InputReducer from "./reducers/gpt3input";
import gpt3OutputReducer from "./reducers/gpt3output";
import gptJInputReducer from "./reducers/gptjinput";
import gptJOutputReducer from "./reducers/gptjoutput";
import loggedInReducer from "./reducers/isLoggedIn";
import darkModeReducer from "./reducers/darkModeReducer";
import soundReducer from "./reducers/soundSetting";
import userNameReducer from "./reducers/userNameReducer";
import currentDocReducer from "./reducers/currentDoc";
import editModeReducer from "./reducers/editModeReducer";
import unsavedChangesReducer from "./reducers/unsavedChangesReducer";
import statsReducer from "./reducers/statsReducer";
import userUidReducer from "./reducers/userUidReducer";
import userPhotoReducer from "./reducers/userPhotoReducer";
import userDisplayName from "./reducers/userDisplayName";
//OTHER REDUCERS GO HERE

let devTools;
const isClient = typeof window !== "undefined";

if (
  isClient &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
) {
  devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}





const rootReducer = combineReducers({
  counter: counterReducer,
  list: listReducer,
  listChanged: listChanged,
  word: wordReducer,
  similarwordsrequested: similarWordsRequested,
  allListsContent: allLists,
  sWord1: sWord1,
  sWord2: sWord2,
  notes: noteContent,
  randomize: randomizeReducer,
  gpt3Input: gpt3InputReducer,
  gpt3Output: gpt3OutputReducer,
  gptJInput: gptJInputReducer,
  gptJOutput: gptJOutputReducer,
  loggedIn: loggedInReducer,
  darkMode: darkModeReducer,
  soundSetting: soundReducer,
  userName: userNameReducer,
  currentDoc: currentDocReducer,
  editMode: editModeReducer,
  unsavedChanges: unsavedChangesReducer,
  stats: statsReducer,
  userUid: userUidReducer,
  userPhoto: userPhotoReducer,
  userDisplayName: userDisplayName
  //other reducers go here
});
// console.log(rootReducer);


const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
 };

 const pReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(pReducer, devTools);
export const persistor = persistStore(store);















// let devTools;
// const isClient = typeof window !== "undefined";

// if (
//   isClient &&
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION__()
// ) {
//   devTools =
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__();
// }

// const rootReducer = combineReducers({
//   counter: counterReducer,
//   list: listReducer,
//   listChanged: listChanged,
//   word: wordReducer,
//   similarwordsrequested: similarWordsRequested,
//   allListsContent: allLists,
//   sWord1: sWord1,
//   sWord2: sWord2,
//   notes: noteContent,
//   randomize: randomizeReducer,
//   gpt3Input: gpt3InputReducer,
//   gpt3Output: gpt3OutputReducer,
//   gptJInput: gptJInputReducer,
//   gptJOutput: gptJOutputReducer,
//   loggedIn: loggedInReducer,
//   darkMode: darkModeReducer,
//   userData: userDataReducer,
//   soundSetting: soundReducer,
//   userName: userNameReducer,
//   currentDoc: currentDocReducer,
//   editMode: editModeReducer,
//   unsavedChanges: unsavedChangesReducer,
//   stats: statsReducer,
//   //other reducers go here
// });
// // console.log(rootReducer);

// export const store = createStore(rootReducer, devTools);
