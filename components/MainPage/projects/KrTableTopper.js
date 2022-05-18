import React from 'react'

function KrTableTopper() {
  return (
    <div
    className={
      "flex flex-col w-[99%]  items-start px-4  "
    }
  >
    <div
      className={"flex  w-full justify-between items-center "}
     
    >
      <div className="flex justify-center px-2 basis-2/6">
          <p className='text-sm'>Title</p>
      </div>
      <div className="flex justify-center px-2 basis-1/6 ">
        {/* <p>{props.date}</p> */}
        <p className='text-sm'>Status</p>
      </div>
      <div className="flex justify-center px-2 basis-1/6 ">
        <p className='text-sm'>Due Date</p>
        
      </div>
      <div className="flex justify-center px-2 basis-2/6 ">
        <p className='text-sm'>Current / Target</p>
       
      </div>
      <div className="flex items-center justify-center gap-2 BOX4 basis-2/6">
       <p className='text-sm'>Progress</p>

      </div>
      </div>
      </div>
  )
}

export default KrTableTopper