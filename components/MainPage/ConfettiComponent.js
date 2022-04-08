import {React, useEffect, useState} from 'react'
import Confetti from 'react-confetti'

 const ConfettiComponent = (props) => {

    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)


useEffect(() => {
    setWidth(window.innerWidth * 0.9)
setHeight(window.innerHeight)
}, [])



    return (
    <Confetti
      width={width}
      height={height}
    />
  )
}

export default ConfettiComponent;