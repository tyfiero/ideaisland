// import { useNavigate } from "react-router-dom";
import Link from "next/link";

function TopBar(props) {
  //   const navigate = useNavigate();
  //   const clickHandler = (event) => {
  //     // navigate("/");
  //   console.log("Clicked Logo");
  //   };
  return (
    <nav id="navbar">
      <div className="flex nav-wrapper">
        <Link href="/">
          <img
            src="/bulb.png"
            alt="logo"
            className="h-16 pl-3 pr-1 mt-2 transition cursor-pointer w-a hover:scale-105"
            // onClick={() => {
            //   console.log("clicked logo");
            // }}
          />
        </Link>
        {/* <Link href="/"> */}

        <p className="pt-4 logo">ideaisland</p>
        {/* </Link> */}
      </div>
    </nav>
  );
}

export default TopBar;
