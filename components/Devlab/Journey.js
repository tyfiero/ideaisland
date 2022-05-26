import React from "react";
import DevLab from "../../pages/devlab/play";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";

function Journey({ img, link, title, description, bColor, textColor, color }) {
  const router = useRouter();

  return (
    <div
      className={
        "flex flex-col items-center justify-center w-[15em] max-h-[30em] p-1 bg-white/80 dark:bg-slate-800 rounded-xl md:hover:scale-105 transition duration-500 md:hover:ring-8   mx-2 " +
        bColor
      }
    >
      <div className="w-full h-[10em] bg-white/40  ">
        <img
          src={img}
          alt="logo"
          className="object-cover  h-[10em] w-full rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between items-center h-[15em] px-5 py-2">
        <h3 className={"m-0 text-2xl  " + textColor}>{title}</h3>

        <p className="text-sm text-left">{description}</p>
        <button
          onClick={() => {
            router.push(link);
          }}
          className={
            " flex gap-1 items-center rounded-full justify-center p-1 ring-2  md:hover:scale-105 md:active:scale-95 whitespace-nowrap transition cursor-pointer h-[3em] w-[90%] " +
            " " +
            color +
            " " +
            bColor
          }
        >
          <p className="m-0">Launch</p> <FaArrowRight className={textColor} />
        </button>
      </div>
    </div>
  );
}

export default Journey;
