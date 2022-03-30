import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wordAction } from "../../../../redux/actions";
import { similarRequest } from "../../../../redux/actions";

//WordsCard.js global variables
var similarWordsItem;
var similarWordsWord;
function WordsCard(props) {
  //Redux shit
  const wordRedux = useSelector((state) => state.word);
  const dispatch = useDispatch();
  const similarWordsRedux = useSelector((state) => state.boolean);

  //Logic
  const axios = require("axios");

  //similar words state management
  const [isRelatedWord, setIsRelatedWord] = React.useState([
    "Invention",
    "Design",
    "Conception",
    "Excogitation",
    "Innovate",
  ]);
  const [showRelatedWord, setShowRelatedWord] = useState(true);
  const [similarWordsWord, setSimilarWordsWord] = useState(true);
  var datamuseConfig = {
    method: "get",
    url: `https://api.datamuse.com/words?ml=${props.word}`,
    headers: {},
  };


  useEffect(() => {
    axios(datamuseConfig)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        let similarWordsItemOne = response.data[(1, 2)];

        // let [word1, word2, word3, word4, word5] = [
        //   response.data[0].word,
        //   response.data[1].word,
        //   response.data[2].word,
        //   response.data[3].word,
        //   response.data[4].word,
        // ];

        let testArray = [
          response.data[0].word,
          response.data[1].word,
          response.data[2].word,
          response.data[3].word,
          response.data[4].word,
        ];

        // console.log(response.data[0].word);
        // console.log(response.data[1].word);
        // console.log(response.data[2].word);

        // console.log(similarWordsItemOne);
        setSimilarWordsWord(similarWordsItemOne.word)
        setIsRelatedWord(testArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.word]);// eslint-disable-line react-hooks/exhaustive-deps
  
  // This will only run when one of those variables change

  let simWordMessage = <p className="simWordMessage">Similar Words:</p>;
  // let simWords = <p className="simWordMessage2">Show Similar Words</p>;
  let simWords = <p className="simWordMessage2">≈</p>;

  return (
    <div>
      <div
        className="sim-words"
        // onClick={() => {
        //   dispatch(similarRequest(true));
        //   setShowRelatedWord(!showRelatedWord);
        // }}
      >
        {showRelatedWord ? simWordMessage : simWords}
        {/* <p>Words with Similar Meanings:</p> */}
        {showRelatedWord ? (
          <div className="Words_Card">
            <h4 className="related-word">{isRelatedWord[0]}</h4>
            <h4 className="related-word">{isRelatedWord[1]}</h4>
            <h4 className="related-word">{isRelatedWord[2]}</h4>
            <h4 className="related-word">{isRelatedWord[3]}</h4>
            <h4 className="related-word">{isRelatedWord[4]}</h4>
          </div>
        ) : null}
      </div>
      {/* <button
        className="card__btn"
        onClick={() => dispatch(similarRequest(true))}
        onClick={() => setShowRelatedWord(!showRelatedWord)}
      >
        Similar Words
      </button> */}
    </div>
  );
}

export default WordsCard;
