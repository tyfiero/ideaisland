import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { LightningBoltIcon } from "@heroicons/react/solid";
import Link from "next/link";
import collectAnalyticsEvent from "../Analytics/collectAnalyticsEvent";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
];

function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Popover>
            <div className="relative pt-6 pl-4 sm:pl-6 lg:pl-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 lg:justify-between"
                aria-label="Global"
              >
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="#" aria-label="Home">
                      <LightningBoltIcon className="h-8 w-auto sm:h-10 transform rotate-12 scale-y-110  stroke-lightning-500 text-lightning-200" />
                    </a>
                    <div className="mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightning-500">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="font-medium text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="hidden md:block md:mx-10 md:space-x-6">
                  <Link href="/login">
                    <a
                      onClick={() =>
                        collectAnalyticsEvent({
                          eventName: "login",
                        })
                      }
                      className="font-medium text-lightning-600 hover:text-lightning-500 bg-lightning-100 py-2 px-3 rounded-full"
                    >
                      Log in
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a
                      onClick={() =>
                        collectAnalyticsEvent({
                          eventName: "signup",
                        })
                      }
                      className="font-medium text-lightning-600 hover:text-lightning-500 bg-lightning-100 py-2 px-3 rounded-full"
                    >
                      Sign up
                    </a>
                  </Link>
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <LightningBoltIcon className="h-8 w-auto sm:h-10 transform rotate-12 scale-y-110 stroke-lightning-500 text-lightning-200" />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lightning-500">
                        <span className="sr-only">Close main menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <Link href="/login">
                    <a
                      onClick={() =>
                        collectAnalyticsEvent({
                          eventName: "login",
                        })
                      }
                      className="block w-full px-5 py-3 text-center font-medium text-lightning-600 bg-lightning-100 hover:bg-lightning-200"
                    >
                      Log in
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a
                      onClick={() =>
                        collectAnalyticsEvent({
                          eventName: "signup",
                        })
                      }
                      className="block w-full mt-2 px-5 py-3 text-center font-medium text-lightning-600 bg-lightning-100 hover:bg-lightning-200"
                    >
                      Sign up
                    </a>
                  </Link>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-lightning-600 ">Ultimate</span>
                <span className="block xl:inline">React.js App starter</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Next.js, React, Firebase, Authentication (Firebase), Tailwind
                CSS and State Management all hooked up and ready for your next
                project.
              </p>
              <p className="mt-3 text-base text-lightning-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Ultimate ReactJS Starter is for you if you’re looking for a
                complete starter kit to help you build your next full-stack
                React app. You get a solid foundation of modern best practices
                and most recent technologies.
              </p>
              <div className="mb-2 sm:mb-0 mt-7 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-xl shadow group relative">
                  <Link href={"#pricing"}>
                    <a
                      onClick={() =>
                        collectAnalyticsEvent({
                          eventName: "main_cta_hero",
                        })
                      }
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-lightning-600 group-hover:bg-lightning-700 md:py-4 md:text-lg md:px-10"
                    >
                      Build with lightning speed. Start creating right away!
                    </a>
                  </Link>
                </div>
              </div>
              <div className="p-2 sm:p-0 sm:mt-3 text-gray-500 max-w-md mx-auto lg:mx-0">
                <Link href="/signup">
                  <a
                    className=""
                    onClick={() =>
                      collectAnalyticsEvent({
                        eventName: "alternative_cta_hero",
                      })
                    }
                  >
                    Check out the how to get started with this starter and{" "}
                    <span className="underline whitespace-pre">
                      explore the protected pages
                    </span>
                    .
                  </a>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          srcSet="johannes-plenio-E-Zuyev2XWo-unsplash-1024w.jpg 1024w,
                  johannes-plenio-E-Zuyev2XWo-unsplash-1600w.jpg 1600w,
                  johannes-plenio-E-Zuyev2XWo-unsplash-2640w.jpg 2640w"
          sizes="100vw"
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="johannes-plenio-E-Zuyev2XWo-unsplash-2640w.jpg"
          alt="Lightning"
        />
      </div>
    </div>
  );
}

export default Hero;
