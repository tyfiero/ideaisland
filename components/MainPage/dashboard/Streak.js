import { useStreak } from "use-streak";
import React from 'react'

function Streak() {
        const today = new Date();
        const streakData = useStreak(localStorage, today);
  

  return(        
  
  <div className="flex items-center gap-1">
 <h2 className="text-[40px] text-blues-600">{streakData.currentCount}</h2>
 {(streakData.currentCount > 1 ? <span className="text-xl text-blues-600"> days</span> : <span className="text-xl"> day</span>)}
      
  </div>
  )
 
}

export default Streak