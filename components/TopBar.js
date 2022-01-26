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
        <Link href="/dashboard">
          <img
            src="/ii.png"
            alt="logo"
            className="h-28 w-a cursor-pointer hover:scale-105"
            onClick={() => {
              console.log("clicked logo");
            }}
          />
        </Link>
      </div>
    </nav>
  );
}

export default TopBar;
