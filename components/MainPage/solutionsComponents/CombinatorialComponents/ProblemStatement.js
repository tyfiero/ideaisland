import { React, useState, useEffect } from "react";

import {
    FaDice,
    FaEdit,
    FaEquals,
    FaExpandAlt,
    FaLightbulb,
    FaLongArrowAltRight,
    FaPlus,
    FaRandom,
    FaRobot,
    FaTimes,
  } from "react-icons/fa";
import { MdOutlineHideImage, MdOutlineImage } from "react-icons/md";
  import { useSelector, useDispatch } from "react-redux";
import WordButton from "./WordButton";




  
function ProblemStatement({randomizeAll}) {
    const isRandomized = useSelector((state) => state.randomize);
    const dispatch = useDispatch();
    const [selectedWords, setSelectedWords] = useState([]);
    const [editSentence, setEditSentence] = useState(false);
    const [splitTextArray, setSplitTextArray] = useState([]);
    const [splitText, setSplitText] = useState("How might we 10X brainstorming for tech companies?");
    const [update, setUpdate] = useState(false);



    useEffect(() => {
     separateText()
    }, [])
    
    const updateSelected = (data) => {
        if(data[1] === "add"){
          let array = selectedWords;
          array.push(data[0])
          setUpdate(!update);
        setSelectedWords(array)
        }else{
          let array = selectedWords;
        
          for (var i = array.length - 1; i >= 0; i--) {
            if (array[i] === data[0]) {
              // console.log(featureArray);
              array.splice(i, 1);
              // console.log(featureArray);
              setUpdate(!update)
              setSelectedWords(array);
              // setChanges(false)
            }
          }
        }
          };

const separateText = () => {
        const splitArray = splitText.split(" ")

        let formatted =  splitArray.map((data, index) => {
            return (
              <WordButton
                key={index}
                word={index}
               updateSelected={updateSelected}
               selectedWords={selectedWords}
               text={data}
               update={update}
              />
            );
          })
          setSplitTextArray(formatted)
          setUpdate(!update);
}
          
  return (
    <div className="relative flex flex-col w-full gap-2 glass-box !border-t-pm border-2"> 
        

 
   </div>

  )
}

export default ProblemStatement