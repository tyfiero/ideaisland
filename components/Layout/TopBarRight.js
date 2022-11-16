// import { FaBook, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { React, useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../lib/context";
import { logIn } from "../../redux/actions";
import { useUserData } from "../../lib/hooks";
import TopBarDropDown from "./TopBarDropDown";
import useVisible from "../../lib/useVisible";

export default function TopBarRight({ user }) {
  const userData = useUserData();
  const [imgSrc, setimgSrc] = useState("/profilefallback.png");
  const [type, setType] = useState(0);

  const { ref, isVisible, setIsVisible } = useVisible(false);
  const userPhotoRedux = useSelector((state) => state.userPhoto);


  const loggedIn = useSelector((state) => state.loggedIn);


  //Now that the image thing is fixed, can I remove userRedux from the dependency array here? How can this UE be cleaned up?
  //UPDATE, it might be best to leave it, in case userphotoredux isnt defined, and so that it updates correctly on change.
  useEffect(() => {
    if (userPhotoRedux !== null) {
      try {
        setimgSrc(userPhotoRedux);
        setType(1);
      } catch {
        setimgSrc("/profilefallback.png");
        setType(0);
      }
    } else {
      setimgSrc("/profilefallback.png");
      setType(0);
    }
  }, [userPhotoRedux]);


  let login = (
    <div className="hidden loginbutton md:block md:space-x-6 fade-effect">
      <Link href="/login">
        <a className="px-3 py-2 font-medium rounded-full text-blues-600 hover:text-blues-500 bg-blues-100">
          Sign in
        </a>
      </Link>
    </div>
  );
  // console.log("out" + isVisible);

  let profilePic = (
    <div
      className="rounded-full ring-2 md:w-[55px] md:h-[55px] sm:w-[45px] sm:h-[45px] overflow-hidden ring-slate-300 cursor-pointer md:top-1 absolute  md:right-4  md:hover:scale-105 transition sm:right-20 sm:top-3"
      onClick={() => {
      
        setIsVisible(!isVisible);
      }}
      >
      <div className="w-full h-full bg-white dark:bg-slate-600 -z-100">
      <img
        src={imgSrc}
        referrerPolicy="no-referrer"
        className={(!type && "profile-pic") + " fade-effect z-10"}
        alt=""
      />
</div>

    
    </div>
  );

  return (
    <div className="relative">
      {loggedIn ? profilePic : login}
      <div ref={ref}>{isVisible && <TopBarDropDown setIsVisible={setIsVisible}/>}</div>
    </div>
  );
}
