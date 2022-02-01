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
      <div className="flex items-center nav-wrapper">
        <Link href="/">
          <img
            src="/bulb.png"
            alt="logo"
            className="h-20 pt-2 pl-3 pr-1 transition cursor-pointer w-a hover:scale-105"
            // onClick={() => {
            //   console.log("clicked logo");
            // }}
          />
        </Link>
        <p className="pt-4 logo">ideaisland</p>
      </div>
    </nav>
  );
}

export default TopBar;
