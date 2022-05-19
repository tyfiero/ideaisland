/* redux/store.js */
import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
  Store,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from '@redux-devtools/extension';
import { createLogger } from 'redux-logger'
import hardSet from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import storage from "./storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

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
import logOutReducer from "./reducers/logOutReducer";
import pFormReducer from "./reducers/pFormReducer";
import sFormReducer from "./reducers/sFormReducer";
import sUpdateReducer from "./reducers/sUpdate";
import sentenceArrayReducer from "./reducers/SentenceArray";
import randomize2Reducer from "./reducers/randomize2";
//OTHER REDUCERS GO HERE

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

const appReducer = combineReducers({
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
  randomize2: randomize2Reducer,
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
  userUID: userUidReducer,
  userPhoto: userPhotoReducer,
  userDisplayName: userDisplayName,
  logOut: logOutReducer,
  pForm: pFormReducer,
  sForm: sFormReducer,
  sUpdate: sUpdateReducer,
  sArray: sentenceArrayReducer,
  //other reducers go here
});
// console.log(rootReducer);

// const rootReducer = (state, action) => {
//   if (action.type === "LOGOUT") {
//     // for all keys defined in your persistConfig(s)
//     storage.removeItem("persist:root");
//     // storage.removeItem('persist:otherKey')

//     return appReducer(undefined, action);
//   }
//   return appReducer(state, action);
// };

// const persistConfig = {
//   key: "root",
//   storage: storage,
//   stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
//   debug: true,
// };

// const pReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(pReducer, devTools);
// // export const persistor = persistStore(store);
// export const persistor = persistStore(store);

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("@redux-devtools/extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// create your reducer

// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     }
//     if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
//     return nextState
//   } else {
//     return appReducer(state, action)
//   }
// }

// const initStore = () => {
//   return createStore(reducer, bindMiddleware([thunkMiddleware]))
// }

const makeStore = ({ isServer }) => {
  // const logger = createLogger({
  //   // ...options
  //   logErrors: true,
  //   duration: true,
  // });
  if (typeof window === 'undefined') {
    // console.log('IS SERVER')
    //If it's on server side, create a store
    // return createStore(appReducer, bindMiddleware([thunkMiddleware,logger]);
    return createStore(appReducer, bindMiddleware([thunkMiddleware]));

  } else {
    //If it's on client side, create a store which will persist

    const { persistStore, persistReducer } = require("redux-persist");

    const persistConfig = {
      key: "root",
      storage: storage,
      // stateReconciler: autoMergeLevel2, 
      stateReconciler: hardSet,
      debug: false,
    };

    const persistedReducer = persistReducer(persistConfig, appReducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      // bindMiddleware([thunkMiddleware, logger])
      bindMiddleware([thunkMiddleware])

    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    // console.log(store.getState())
    return store;
  }
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });

// console.log(store.getState()
// )

// console.log(store)
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
