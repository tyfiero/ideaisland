// import { useNavigate } from "react-router-dom";
import Link from "next/link";

function TopBar(props) {
  //   const navigate = useNavigate();
  //   const clickHandler = (event) => {
  //     // navigate("/");
  //   console.log("Clicked Logo");
  //   };
  return (
    <nav id="navbar ">
      <div className="flex nav-wrapper">
        <Link href="/" passHref>
          <img
            src="/bulb.svg"
            alt="logo"
            className="h-16 pl-3 pr-1 mt-2 transition cursor-pointer w-a hover:scale-105"
            // onClick={() => {
            //   console.log("clicked logo");
            // }}
          />
        </Link>
        {/* <Link href="/"> */}
        {/* <Link href="/" passHref> */}
        <h4 className="z-50 pt-4 logo">ideaisland</h4>
        {/* </Link> */}
        {/* </Link> */}
      </div>
    </nav>
  );
}

export default TopBar;
