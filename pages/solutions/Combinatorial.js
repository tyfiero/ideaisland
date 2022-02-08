import { React, useState } from "react";
import SentenceTool from "../../components/MainPage/solutionsComponents/SentenceTool";
import { useRouter } from "next/router";
import { FaDice, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/MainPage/solutionsComponents/CombinatorialComponents/Card";
import GPTtool from "../../components/MainPage/solutionsComponents/AI/GPT3";
import { randomizeAction } from "../../redux/actions";

const CombinatorialPage = (props) => {
  //THESE are for dynamic routing
  // const router = useRouter();
  // const { id } = router.query;
  const isRandomized = useSelector((state) => state.randomize);

  const dispatch = useDispatch();
  const [inputList, setInputList] = useState([]);
  const [cardNum, setCardNum] = useState(2);
  // const [card0Word, setCard0Word] = useState("");
  // const [card1Word, setCard1Word] = useState("Efficiency");
  // const [card2Word, setCard2Word] = useState("Virtual Reality");

  // let card0Word = "Innovation";
  // let card1Word = "Efficiency";
  // let card2Word = "Virtual Reality";

  // const sendDataToPage0 = (index) => {
  //   // the callback. Use a better name

  //   // if (index[1] === 0) {
  //   //   setCard0Word(index[0])
  //   // } else if (index[1] === 1) {
  //   //   setCard1Word(index[0])
  //   // } else if (index[1] === 2) {
  //   //   setCard2Word(index[0]);
  //   // }
  //   console.log(index);

  //   setCard0Word(index[0]);
  //   console.log(index);
  // };
  // const sendDataToPage1 = (index) => {
  //   setCard0Word(index[0]);
  //   console.log(index);
  // };
  // const sendDataToPage2 = (index) => {
  //   setCard0Word(index[0]);
  //   console.log(index);
  // };

  // console.log(card0Word, card1Word, card2Word);
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
    <div>
      <div className="card-container ml-14 fade-effect-quick">
        {/* div that holds all the cards, note the img prop where the url lives, as well as the array thats passed in to Card.js as a prop */}
        <h1 className="heading-top">Combinatorial Tool</h1>
        <p>A tool for sparking creativity through random words and phrases.</p>
        <div className="cards">
          <div className="buttons-div">
            <button className="add-button" onClick={onAddBtnClick}>
              <FaPlus />
            </button>
            <button className="add-button" onClick={randomizeAll}>
              <FaDice />
            </button>
          </div>
          <Card cardNum="0" key="0"  />
          <Card cardNum="1" key="1"  />
          <Card cardNum="2" key="2"  />
          {inputList}
        </div>
      </div>
      <GPTtool />

      <div className="mt-20 h-[650px]"></div>
    </div>
  );
};

export default CombinatorialPage;
