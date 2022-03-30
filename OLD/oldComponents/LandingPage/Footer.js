import Link from "next/link";
import { LightningBoltIcon } from "@heroicons/react/solid";

function Footer() {
  return (
    <div className="flex flex-col justify-between w-full h-40 p-4 mt-10 bg-gray-800">
      <div className="grid items-center w-full grid-cols-2">
        <div className="flex flex-row items-center h-16 p-4 mx-auto align-middle">
          <Link href="/">
            <a aria-label="Home">
              <LightningBoltIcon className="w-auto h-8 transform scale-y-110 rotate-12 stroke-blues-500 text-blues-200" />
            </a>
          </Link>

          <span className="ml-2 font-extrabold tracking-tight text-gray-900 ">
            <span className="block text-blues-600 ">Ultimate</span>
            <span className="block text-gray-300">React.js starter</span>
          </span>
        </div>
        <div className="mx-auto">
          <ul>
            <li className="mt-2">
              <Link href="/legal">
                <a className="text-base leading-6 text-gray-300 hover:text-gray-400">
                  Legal Notice
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link href="/privacy">
                <a className="text-base leading-6 text-gray-300 hover:text-gray-400">
                  Privacy
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400">© Copyright AppHafen 2022</div>
    </div>
  );
}

export default Footer;
