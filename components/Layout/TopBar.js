// import { useNavigate } from "react-router-dom";
import Link from "next/link";
import { useEffect, useState } from "react";

function TopBar(props) {
  const [path, setPath] = useState("/");
  //   const navigate = useNavigate();
  //   const clickHandler = (event) => {
  //     // navigate("/");
  //   console.log("Clicked Logo");
  //   };

  useEffect(() => {

    if(props.signedIn){
      setPath("/");
    }else{
      setPath("/login");
    }
  },[props.signedIn]);

  return (
    <nav id="navbar ">
      <div className="flex nav-wrapper">
        <Link href={path} passHref>
          <img
            src="/bulb.svg"
            alt="logo"
            className="h-[3.7em] pl-3 pr-1 mt-2 transition cursor-pointer w-a hover:scale-105"
            // onClick={() => {
            //   console.log("clicked logo");
            // }}
          />
        </Link>
        {/* <Link href="/"> */}
        {/* <Link href="/" passHref> */}
        <h4 className="z-50 pt-4 m-0 logo">ideaisland</h4>
        {/* </Link> */}
        {/* </Link> */}
      </div>
    </nav>
  );
}

export default TopBar;
