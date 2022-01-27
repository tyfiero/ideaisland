
import {React, useState} from "react";
import SentenceTool from "../../components/MainPage/solutionsComponents/sentenceTool";
import { useRouter } from "next/router";
import { FaDice, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
const CombinatorialPage = () => {
  //THESE are for dynamic routing
  // const router = useRouter();
  // const { id } = router.query;
  const isRandomized = useSelector((state) => state.randomize);

  const dispatch = useDispatch();
  const [inputList, setInputList] = useState([]);
  const [cardNum, setCardNum] = useState(2);

  const randomizeAll = (event) => {
    dispatch(randomizeAction(true));
  };

  const onAddBtnClick = (event) => {
    // let nextCard = cardNum++;

    let cardInc = cardNum + 1;
    setCardNum(cardInc);

    setInputList(inputList.concat(<Card card={cardNum} key={cardNum} />));
  };
  return (
    <div className="card-container">
    {/* div that holds all the cards, note the img prop where the url lives, as well as the array thats passed in to Card.js as a prop */}
    <h1 className="heading-top">Combinatorial Tool</h1>
    <p>A tool for sparking creativity through random words and phrases.</p>
    <div className="cards">
      {/* <Card card="0" key="0" />
      <Card card="1" key="1" />
      <Card card="2" key="2" /> */}
      {inputList}
      <div className="buttons-div">
        <button className="add-button" onClick={onAddBtnClick}>
          <FaPlus />
        </button>
        <button className="add-button" onClick={randomizeAll}>
          <FaDice />
        </button>
      </div>
    </div>
  </div>
  );
};

export default CombinatorialPage;
