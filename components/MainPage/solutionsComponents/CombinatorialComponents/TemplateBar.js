import {React, useState, useEffect} from 'react'
import { FaCaretDown, FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa'
import { Cascader } from "antd";
import "antd/dist/antd.css";


function TemplateBar() {
const [template, setTemplate] = useState("How might we improve ______ with ____ to improve user satisfaction?")
const [menuOpen, setMenuOpen] = useState(false)






function onCascadeChange(value, label) {
    console.log(value);
    console.log(label);

    if(value.length >2){
        setTemplate(label[2].label)

        
    }else{
    setTemplate(label[1].label)
        
    }
    
  }

  // Just show the latest item.
  function displayRender(label) {
    return label[label.length - 1];
  }
  return (
    <div className='w-[80%] bg-white/60 ring-2 ring-slate-400 rounded-full flex items-center cursor-pointer md:hover:ring-4 transition select-none	py-2 relative' onClick={() => setMenuOpen(!menuOpen)}>

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
              value: "fortune5",
              label: "How might we improve SAAS with encryption to protect privacy?",
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