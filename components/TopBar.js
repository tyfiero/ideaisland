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
      <div className="nav-wrapper">
        <Link href="/">
          <img
            src="/ii.png"
            alt="logo"
            className="w-20 h-a pl-3 pt-2 cursor-pointer hover:scale-105"
            // onClick={() => {
            //   console.log("clicked logo");
            // }}
          />
        </Link>
      </div>
    </nav>
  );
}

export default TopBar;
