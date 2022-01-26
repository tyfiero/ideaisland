import Link from "next/link";
import { LightningBoltIcon } from "@heroicons/react/solid";

function Footer() {
  return (
    <div className="bg-gray-800 w-full h-40 flex flex-col justify-between p-4 mt-10">
      <div className="grid grid-cols-2 w-full items-center">
        <div className="mx-auto p-4 flex-row flex align-middle  h-16 items-center">
          <Link href="/">
            <a aria-label="Home">
              <LightningBoltIcon className="h-8 w-auto transform rotate-12 scale-y-110 stroke-lightning-500 text-lightning-200" />
            </a>
          </Link>

          <span className=" tracking-tight font-extrabold text-gray-900 ml-2">
            <span className="block text-lightning-600 ">Ultimate</span>
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
      <div className="text-gray-400 text-center">© Copyright AppHafen 2022</div>
    </div>
  );
}

export default Footer;
