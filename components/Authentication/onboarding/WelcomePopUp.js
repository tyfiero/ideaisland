import React, { useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useRouter } from 'next/router'


function WelcomePopUp(props) {
    const router = useRouter()

   
  return (
    <div
    className="flex items-center justify-center min-h-screen px-4 pb-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick w-full mt-8

  "
  >
    <div className="relative flex flex-col items-center w-full max-w-xl px-10 py-6 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl ">
    <h2 className='text-3xl'>Thank you!!</h2>
    <h2 className='text-xl '>Your account has been upgraded to the <span className='text-t-bl'>{props.plan} plan</span> </h2>
 {props.credits > 0 &&   <h2 className='text-xl !m-0'>and <span className='text-t-pm'>{props.credits} AI credits</span>  have been added. </h2>}

 {props.credits > 800 &&   <h2 className='m-0 text-xl'>Because you selected the <span className='text-t-pm'>Pro plan,</span> you are eligible for innovation consulting and a personalized idea report. Please <a className='font-bold underline text-sky-500' target="_blank" href="mailto:dylan@digitalmasonry.io" rel="noreferrer">send us an email</a> and we will get that process started for you.</h2>}

 
    <p className='text-center'>Every subscription helps our small team fund future development of ideaisland. If you have any questions, feedback, or feature suggestions, <a className='font-bold underline text-sky-500' target="_blank" href="mailto:dylan@digitalmasonry.io" rel="noreferrer">send us an email</a>  or use  <a className='font-bold underline text-sky-500' target="_blank" href="https://tally.so/r/wA9xow" rel="noreferrer">this form. </a></p>


    <button  className="w-[14em] flex items-center gap-2 justify-center px-3 py-3 text-xl transition-colors duration-700 transform bg-t-bl rounded-full shadow dark:bg-t-bl dark:text-white text-white hover:text-t-bl hover:bg-t-bd"
    onClick={() => {
        
        if (props.onboard) {
            props.goToStep(4);
          }else{
            router.push('/');
          }
        
       }}
    >Continue <FaArrowRight /></button>
    <h2 className='text-xl'>We are SO excited to have you onboard. 😊</h2>

    <div className='!m-0 rounded-lg'> <iframe src="https://giphy.com/embed/IwAZ6dvvvaTtdI8SD5" width="180" height="140" frameBorder="0" className="rounded-lg giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/theoffice-the-office-tv-michaels-birthday-IwAZ6dvvvaTtdI8SD5">via GIPHY</a></p></div>
   
    </div>
    </div>

  )
}

export default WelcomePopUp