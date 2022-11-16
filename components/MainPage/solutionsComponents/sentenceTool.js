import  { useState, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sWord1Action, sWord2Action } from "../../../redux/actions";


var selectedSentence = "commaOf";
var index = 1;

function SentenceTool(props) {
  //redux
  const dispatch = useDispatch();

  const allWordLists = useSelector((state) => state.allListsContent);
  const sWord1Value = useSelector((state) => state.sWord1);
  const sWord2Value = useSelector((state) => state.sWord2);

  //Sentence selector

  var sentences = ["commaOf", "hadABaby", "proofOf"];

  const changeSentence = () => {
    if (index > sentences.length - 1) {
      index = 0;
    }
    selectedSentence = sentences[index];
    index++;
    wordClickHandler1();
    wordClickHandler2();
  };

  //clickHandler
  const wordClickHandler1 = () => {
    var sentenceWord1List;

    if (selectedSentence === "commaOf") {
      sentenceWord1List = allWordLists.companies;
    } else if (selectedSentence === "hadABaby") {
      sentenceWord1List = allWordLists.companies;
    } else if (selectedSentence === "proofOf") {
      sentenceWord1List = allWordLists.idZone;
    } else {
      sentenceWord1List = allWordLists.industry;
    }
    let randomNumber = Math.floor(Math.random() * sentenceWord1List.length);
    let randomizedInput = sentenceWord1List[randomNumber];

    dispatch(sWord1Action(randomizedInput));
  };

  const wordClickHandler2 = () => {
    var sentenceWord2List;
    if (selectedSentence === "commaOf") {
      sentenceWord2List = allWordLists.industry;
    } else if (selectedSentence === "hadABaby") {
      sentenceWord2List = allWordLists.companies;
    } else {
      sentenceWord2List = allWordLists.industry;
    }
    let randomNumber2 = Math.floor(Math.random() * sentenceWord2List.length);
    let randomizedInput2 = sentenceWord2List[randomNumber2];
    // console.log(randomizedInput2);

    dispatch(sWord2Action(randomizedInput2));
  };

  var commaOf = (
    <div className="sentence-wrapper ">
      <h1>The&nbsp;</h1>
      <h1 onClick={wordClickHandler1} className="sentence_word">
        {sWord1Value}
      </h1>
      <h1>,&nbsp;of&nbsp;</h1>
      <h1 onClick={wordClickHandler2} className="sentence_word2">
        {sWord2Value}
      </h1>
      <h1>.</h1>
    </div>
  );

  var hadABaby = (
    <div className="sentence-wrapper">
      <h1>It&apos;s like if&nbsp;</h1>
      <h1 onClick={wordClickHandler1} className="sentence_word">
        {sWord1Value}
      </h1>
      <h1>&nbsp;and&nbsp;</h1>
      <h1 onClick={wordClickHandler2} className="sentence_word2">
        {sWord2Value}
      </h1>
      <h1>&nbsp;had a baby.</h1>
    </div>
  );

  var proofOf = (
    <div className="sentence-wrapper">
      <h1>Proof of&nbsp;</h1>
      <h1 onClick={wordClickHandler1} className="sentence_word">
        {sWord1Value}
      </h1>
      <h1>.</h1>
    </div>
  );

  return (
    <div className="fade-effect-quick normal-box-soft min-w-[60%] ">
        <button
        className="card__btn"
        onClick={() => {
          wordClickHandler1();
          wordClickHandler2();
        }}
      >
        &nbsp; &nbsp; &nbsp;🎲&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
      {selectedSentence === "commaOf" ? commaOf : null}
      {selectedSentence === "hadABaby" ? hadABaby : null}
      {selectedSentence === "proofOf" ? proofOf : null}

    
      <button className="card__btn" onClick={changeSentence}>
        Change Sentence
      </button>
    </div>
  );
}

export default SentenceTool;
