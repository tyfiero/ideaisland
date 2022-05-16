import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowRight } from 'react-icons/fa';

function Hub() {
  return (
    <div className="implementation-page fade-effect-quick">
      <h1 className="text-3xl text-t-bd dark:text-blues-100">Project Hub</h1>

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-wrap items-center w-[90%]  px-5 pb-5 rounded-2xl">
          <div className="flex w-full">
          </div>

          <div></div>

          <div className="relative flex flex-wrap items-center justify-center w-full gap-3 px-5 pt-5 pb-5 border-8 border-t-bl rounded-2xl bg-clear-bl2">

            <ProjectCard
              route="/projects/test-project"
              color={"bg-t-bl"}
              bColor="md:hover:ring-t-bl"
              textColor=" text-t-bd"
              title="Bookmark Donut"
              description="A chrome extension for bookmarks."
              imgSrc="https://images.unsplash.com/photo-1585653621032-a5fec164ee92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
 {/* <ProjectCard
              route="/next-steps/mrr-calculator"
              color={"bg-t-bl"}
              bColor="md:hover:ring-t-bl"
              textColor=" text-t-bd"
              title="Bookmark Donut"
              description="A chrome extension for bookmarks."
              imgSrc="https://images.unsplash.com/photo-1585653621032-a5fec164ee92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            /> */}

       
     
        </div>

        
      </div>
    </div>
    </div>
  )
}

export default Hub



const ProjectCard = ({
  color,
  bColor,
  imgSrc,
  title,
  description,
  textColor,
  route,
}) => {
  const router = useRouter();

  return (
    <div
      className={
        "flex flex-col items-center justify-center w-[15em] h-[20em] p-1 bg-white/80 dark:bg-slate-800 rounded-xl md:hover:scale-105 transition duration-500 md:hover:ring-8  ring-clear-bd3 mx-2 " +
        bColor
      }
    >
      <div className="w-full h-[10em] bg-white/40  ">
        <img
          src={imgSrc}
          alt="logo"
          className="object-cover  h-[10em] w-full rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between items-center h-[15em] px-5 py-2">
        <h3 className={"m-0 text-2xl dark:text-blue-100" + textColor}>{title}</h3>

        <p className="text-sm text-left">{description}</p>
        <button
          onClick={() => {
            router.push(route);
          }}
          className={
            " flex gap-1 items-center rounded-full justify-center p-1 border-2  md:hover:scale-105 md:active:scale-95 whitespace-nowrap transition cursor-pointer h-[3em] w-[90%] " +
            color +
            " " +
            bColor
          }
        >
          <p className="m-0">Launch</p> <FaArrowRight className={textColor} />
        </button>
      </div>
    </div>
  )
    };