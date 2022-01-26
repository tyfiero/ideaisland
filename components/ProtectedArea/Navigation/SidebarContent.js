import {
  ChatAlt2Icon,
  CollectionIcon,
  LightningBoltIcon,
  TerminalIcon,
  // UserCircleIcon,
  // UserGroupIcon,
  LogoutIcon,
  CreditCardIcon,
} from "@heroicons/react/outline";

import Link from "next/link";

import useStore from "../../StateManagement";
import { auth } from "../../firebase-init";

import { useRouter } from "next/router";
import Logo from "./Logo";
import FirebaseLogo from "./FirebaseLogo";
import classNames from "../../classnames";

const navigation = [
  {
    name: "Getting started",
    href: "/getting-started",
    icon: LightningBoltIcon,
  },
  {
    name: "Tech stack",
    href: "/techstack",
    icon: TerminalIcon,
  },
  { name: "Firebase", href: "/firebase", icon: FirebaseLogo },
  {
    name: "State Management",
    href: "/state-management",
    icon: CollectionIcon,
  },
  {
    name: "Payments",
    href: "/payments",
    icon: CreditCardIcon,
  },
];
const adminNavigation = [
  {
    name: "Chat messages",
    href: "/admin/chat",
    icon: ChatAlt2Icon,
  },
  // {
  //   name: "Users",
  //   href: "/admin/users",
  //   icon: UserGroupIcon,
  // },
  // { name: "Team", href: "/admin/team", icon: UserCircleIcon, current: false },
];

function SidebarContent() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-lightning-500">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 border-b pb-3">
          <Logo />
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <Link href={item.href} key={item.name}>
              <a
                className={classNames(
                  item.href === router.pathname
                    ? "bg-lightning-700 text-white"
                    : "text-white hover:bg-lightning-600 hover:bg-opacity-75",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-6 w-6 text-lightning-300"
                  aria-hidden="true"
                />
                {item.name}
              </a>
            </Link>
          ))}
        </nav>
        {/* Navigation Links for logged in admins */}
        {user?.claims?.admin && (
          <nav className="mt-5 flex-1 px-2 space-y-1 border-t border-white">
            <div className="text-white px-2 py-2 font-bold">
              <span>Admin pages</span>
            </div>

            {adminNavigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <a
                  className={classNames(
                    item.href === router.pathname
                      ? "bg-lightning-700 text-white"
                      : "text-white hover:bg-lightning-600 hover:bg-opacity-75",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-lightning-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
        )}
      </div>
      {/* Bottom section of Sidebar with the user profile link and sign out button */}
      <div className="flex-shrink-0 flex border-t border-white p-4 justify-between items-center w-full">
        <Link href="/profile">
          <a className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div className="mr-3">
                <p className="text-sm font-medium text-white truncate w-44 group-hover:underline">
                  {user?.email || "Anonymous"}
                </p>
                <p className="text-xs font-medium text-lightning-200 group-hover:text-white group-hover:underline">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </Link>
        <button
          onClick={async () => {
            const { signOut } = await import("firebase/auth");
            await signOut(auth);
          }}
          aria-label="Sign out"
          className="focus:outline-none mr-2"
        >
          <LogoutIcon className="h-9 w-9 rounded-full  text-gray-600 bg-white hover:bg-gray-100 p-2 " />
        </button>
      </div>
    </div>
  );
}

export default SidebarContent;
