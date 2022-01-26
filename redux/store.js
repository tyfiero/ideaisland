/* redux/store.js */
import { createStore, combineReducers } from 'redux';
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

//OTHER REDUCERS GO HERE


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

  //other reducers go here
});

export const store = createStore(
    rootReducer,
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
