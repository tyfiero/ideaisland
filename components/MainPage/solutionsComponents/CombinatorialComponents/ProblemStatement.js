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
        
  
        <div className="flex flex-col items-center w-full gap-0 mt-10 text-left">


  
      






       
  
{editSentence && <> <p className="mt-2 mb-24 text-sm text-t-pm">Input sentence:</p>
<input type="text" 
className="rounded-xl w-[90%] text-4xl nun"
value={splitText}
onChange={((e)=>{
  let updatedText = e.target.value;
  setSplitText(updatedText)
})}

/></>
  }
<div className="flex items-start justify-center w-full py-4 pt-8 glass-box bg-white/70 "> 

<div className="flex flex-wrap items-start justify-center w-full gap-4 py-4 pt-12 mt-4 mb-8 glass-box bg-pink-50/70 "> 

<div className="absolute right-0 flex justify-between gap-2 px-1 transition duration-500 border-b-2 border-l-2 -top-0 opacity-70 rounded-bl-md border-t-pl rounded-tr-md group-hover:opacity-100 bg-clear-pl2">
      <button
    
        className="flex items-center justify-center w-10 gap-4 p-2 px-2 m-1 text-white cursor-pointer rounded-3xl bg-t-pd drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
        onClick={randomizeAll}
      >
        <FaDice className="text-xl" />
       
      </button>
      
      <button
        className="w-[5em] h-[2em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-pinks-100 via-t-pl  to-t-pd !shadow-2xl gap-2"
        onClick={() => {
         if(editSentence){
             separateText();
             setEditSentence(false)
     
           }else{
               setEditSentence(true)
     
     
           }

        }}
      >
        <p className="text-t-pd">{editSentence ? "Done" : "Edit"}</p>
        <FaEdit className="text-t-pd"/>

        {/* <BsArrowRight
          style={{ fontSize: "32px" }}
          className="pl-2 text-t-pd"
        /> */}
      </button>
    </div>
   <p className="absolute top-0 text-lg left-2 text-t-pm">Problem Statement</p>
 {!editSentence &&    (splitTextArray)}

</div>
 
</div>
</div>

 
   </div>

  )
}

export default ProblemStatement