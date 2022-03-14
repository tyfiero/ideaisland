import React from 'react'
import Loader from '../Layout/Loader';

// import { useEffect, useState } from 'react'
function ImageCard(props) {
    const {photographer, src} = props.image;




  return (
    <div className='w-[10em] h-[6em] rounded-xl flex items-center flex-col truncate'>
        {/* <Loader loading={props.loading} /> */}
        <div className='rounded-xl w-[10em] h-[5em] overflow-hidden cursor-pointer md:hover:scale-105 '
        onClick={()=>{
            // console.log(src.original)
            props.sendURL(src.original)
        }}>
        <img
    className='rounded-xl '
        // ref={this.imageRef}
        alt={photographer}
        src={src?.medium}
    />
        </div>
   
    <p className='text-[11px]  text-slate-400'>by: {photographer}</p>
</div>
  )
}

export default ImageCard