import React from 'react'
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import Objective from '../../components/MainPage/projects/Objective';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Overview from '../../components/MainPage/projects/Overview';
import KeyResult from '../../components/MainPage/projects/KeyResult';

function TestProject() {
    const [progress, setProgress] = React.useState(50);
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
 <Tabs className="md:w-[97%] md:h-[98%]"
    selectedTabClassName="!bg-clear-bl4 !w-[10em]  !border-t-bl !text-white !text-lg">
    <TabList className="flex gap-1">
      <Tab className="bg-clear-pl3 !w-[10em] rounded-t-lg px-3 py-1 text-t-pd border-4 border-b-0 border-clear-pl3 dark:text-pinks-50 text-base transition duration-500">
   
 
      

      <h2 className='font-bold nun'>Overview</h2>
     

          
      </Tab>
      <Tab className="bg-clear-pl3 !w-[10em] rounded-t-lg px-3 py-1 text-t-pd border-4 border-b-0 border-clear-pl3 dark:text-pinks-50 text-base transition duration-500"> 
      <h2 className='font-bold nun'>Progress</h2>
      </Tab>
    </TabList>

    <TabPanel>
      <div className="flex flex-col items-center w-full h-full gap-5 rounded-tl-none glass-box fade-effect-quick min-h-[10em]">

<Overview title={"Project title"} description={"Project description that explains what the project is."}/>

        </div>
    </TabPanel>
    <TabPanel>
    <div className="flex flex-col items-center justify-center w-full h-full gap-5 rounded-tl-none glass-box fade-effect-quick">

<Objective progress={40} text={"Objective 1"}>

<KeyResult progress={20} text={"Key Result 1"}/>  
<hr className='w-[86%] border-clear-bl4'/>

<KeyResult progress={70} text={"Key Result 2"}/>   
<hr className='w-[86%] border-clear-bl4'/> 
<KeyResult progress={10} text={"Key Result 3"}/>    
</Objective>

<Objective progress={60} text={"Objective 2"} >

<KeyResult progress={90} text={"Key Result 1"}/>    
<hr className='w-[86%] border-clear-bl4'/>

<KeyResult progress={30} text={"Key Result 2"}/>  
<hr className='w-[86%] border-clear-bl4'/>  
<KeyResult progress={60} text={"Key Result 3"}/>    
</Objective>
        </div>
    </TabPanel>
  </Tabs>
       
    
    
    </div>
  )
}

export default TestProject