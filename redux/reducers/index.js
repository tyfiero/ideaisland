import counterReducer from "./counter";
import listReducer from "./list";
import listChanged from "./listChangeBoolean";
import wordReducer from "./word";
import similarWordsRequested from "./similarWords";
import allLists from "./allLists";
import sWord1 from "./sWord1";
import sWord2 from "./sWord2";
import noteContent from "./noteContent";
import randomizeReducer from "./randomize";
import gpt3InputReducer from "./gpt3input";
import gpt3OutputReducer from "./gpt3output";
import gptJInputReducer from "./gptjinput";
import gptJOutputReducer from "./gptjoutput";
//OTHER REDUCERS GO HERE

import { combineReducers } from "redux";

const allReducers = combineReducers({
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

export default allReducers;
