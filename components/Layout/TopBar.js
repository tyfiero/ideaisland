import Link from "next/link";
import { useEffect, useState } from "react";

function TopBar(props) {
  const [path, setPath] = useState("/");

  useEffect(() => {
    if (props.signedIn) {
      setPath("/");
    } else {
      setPath("/login");
    }
  }, [props.signedIn]);

  return (
    <nav id="navbar ">
      <div className="flex nav-wrapper">
        <Link href={path} passHref>
          <img
            src="/bulb.svg"
            alt="logo"
            className="h-[3.7em] pl-3 pr-1 mt-1 mb-1 transition cursor-pointer w-a hover:scale-105"
          />
        </Link>

        <h4 className="z-50 pt-4 m-0 logo">ideaisland</h4>
      </div>
    </nav>
  );
}

export default TopBar;
