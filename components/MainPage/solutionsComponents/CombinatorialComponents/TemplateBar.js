
import {React, useState, useEffect} from 'react'
import { FaCaretDown, FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa'
import { Cascader } from "antd";
import "antd/dist/antd.css";
import { useSelector, useDispatch } from "react-redux";
import { sArrayAction } from "../../../../redux/actions";


function TemplateBar() {
const [template, setTemplate] = useState("How might we improve ______ with ____ to improve user satisfaction?")
const [menuOpen, setMenuOpen] = useState(false)

const dispatch = useDispatch();
const sArray = useSelector((state) => state.sArray);





function onCascadeChange(value, label) {
    console.log(value);
    console.log(label);

    if(value.length >2){
        setTemplate(label[2].label)
        dispatch(sArrayAction(value[2]));

        
    }else{
    setTemplate(label[1].label)
        
    }
    
  }

  // Just show the latest item.
  function displayRender(label) {
    return label[label.length - 1];
  }
  return (
    <div className='w-[80%] bg-white/60 ring-2 ring-slate-400 rounded-full flex items-center cursor-pointer md:hover:ring-4 transition select-none  py-2 relative' onClick={() => setMenuOpen(!menuOpen)}>

<Cascader
            // style={{ borderRadius: "59px" }}
            options={options}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onCascadeChange}
            style={{ zIndex: 8, }}
            // placeholder="Select Template"
            placement="bottomLeft"
            size="large"
          >
                    <a href="#" className='w-full h-full'>
<div className='w-full h-full'>
{!menuOpen ? <FaChevronCircleDown className='absolute ml-2 text-xl cursor-pointer text-slate-500' /> : <FaChevronCircleUp className='absolute ml-2 text-xl cursor-pointer text-slate-500' />}

<p className='ml-10 '>{template}</p>
</div>
</a>
    
</Cascader>
    
    
    
    
    </div>
  )
}

export default TemplateBar;


const options = [
    {
      value: "popular",
      label: "⭐️ Popular",
      children: [
        {
          value: "emoji",
          label: "Web3",
        },
        {
          value: "companies",
          label: "Incremental Improvement",
          children: [
            {
              value: [
                { id: 0, type: "Intro", list: "How", text: "How would Elon Musk" },
                { id: 1, type: "Verb", list: "Modifier", text: "change" },
                { id: 2, type: "Noun", list: "Software", text: "social media" },
                {
                  id: 3,
                  type: "Desired Outcome",
                  list: "Reduce",
                  text: "to fight spam?",
                },
              ],
              label: "How would Elon Musk change social media to fight spam?",
            },
            {
              value: [
                { id: 0, type: "Intro", list: "How", text: "How might we" },
                { id: 1, type: "Verb", list: "Modifier", text: "improve" },
                { id: 2, type: "Noun", list: "Software", text: "tech" },
                { id: 3, type: "Verb", list: "Action", text: "brainstorming" },
                {
                  id: 4,
                  type: "Desired Outcome",
                  list: "People",
                  text: "for entrepreneurs?",
                },
              ],
              label: "How might we improve tech brainstorming for entrepreneurs?",
            },
          ],
        },
        {
          value: "blockchain",
          label: "Disruption ?'s",
          children: [
            {
              value: "nft",
              label: "🖼 NFT",
            },
            {
              value: "consensus",
              label: "How might we improve SAAS with encryption to protect privacy?",
            },
          ],
        },
      ],
    },
    {
      value: "Incremental Improvement",
      label: "Incremental Improvement",
      children: [
        {
          value: "all",
          label: "All Industries",
          children: [
            {
              value: "all",
              label: "💼 All Industries",
            },
           
          ],
        },
      ],
    },
  ];
