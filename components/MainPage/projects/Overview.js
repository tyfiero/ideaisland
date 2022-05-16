import React from 'react'

function Overview(props) {
  return (


    <div className="flex flex-col items-center">
    <h2 className='text-2xl text-t-bd dark:text-blues-100'>{props.title}</h2>
    <p>{props.description}</p>
    </div>
  )
}

export default Overview