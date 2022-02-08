import { LightningBoltIcon } from "@heroicons/react/solid";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <a className="flex items-center w-full text-white">
        <LightningBoltIcon className="h-8 w-8 mr-3 transform rotate-12 scale-y-110 stroke-blues-500 text-blues-200" />
        <span className="font-extrabold text-xl leading-5">
          React.js App Starter
        </span>
      </a>
    </Link>
  );
}

export default Logo;
