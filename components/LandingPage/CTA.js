import { CheckIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon, LightningBoltIcon } from "@heroicons/react/solid";

const includedFeatures = [
  "React full-stack website set-up for development and production.",
  "This landing page and the protected pages after sign in.",
  "Authentication workflows and pages.",
  "TailwindCSS for rapid and seamless UI and UX development.",
  "Real-time database with Firestore and tested security rules.",
  "Chat widget to directly chat and contact your users.",
  "Payments with Stripe.",
  "Transactional emails with Postmark and email templates.",
  "REST API backend and serverless Cloud Functions set-up.",
  "GDPR-compliant cookie banner and Google Analytics integration.",
  "Easy to use and powerful state management.",
  "End-to-end tests with Playwright.",
  "Uses Next.js for development and production-ready static HTML export.",
  "Lifetime access and updates.",
  "Use for an unlimited number of personal or commercial projects.",
];

function CTA() {
  return (
    <div className="py-8 bg-blues-200" id="pricing">
      <div className="max-w-5xl  px-4 sm:px-6 lg:px-8 mx-auto ">
        <div className="grid md:grid-cols-2 p-10 rounded-xl bg-blues-100 shadow gap-x-20 items-center">
          <div className="">
            <h3 className="text-md font-bold text-gray-900 tracking-wide uppercase">
              What&apos;s included
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex space-x-3">
                  <CheckIcon
                    className="flex-shrink-0 h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-lg mx-auto w-full space-y-8 mt-8 sm:mt-0">
            <div>
              <LightningBoltIcon
                style={{ color: "#ffecd2", stroke: "#dd914a" }}
                className="mx-auto h-16 w-auto transform rotate-12 scale-y-110"
              />
              <h3 className="text-3xl mt-5 text-center tracking-tight font-extrabold text-gray-900 ">
                <span className="block text-blues-600 ">Ultimate</span>
                <span className="block xl:inline">React.js starter</span>{" "}
              </h3>
              <div className="mt-4 justify-center flex">
                <span className="flex border w-64 p-1 rounded-full border-green-600 bg-emerald-50">
                  <BadgeCheckIcon
                    className="flex-shrink-0 h-5 w-5 text-green-600 ml-3 mr-2"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-700">
                    14-day money back guarantee
                  </span>
                </span>
              </div>
              <div className="mt-8">
                <div className="rounded-xl shadow group relative">
                  <a
                    href={
                      "https://apphafen.gumroad.com/l/reactappstarter?price=19&wanted=true"
                    }
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blues-600 group-hover:bg-blues-700 md:py-4 md:text-lg md:px-10"
                  >
                    Buy this starter now for $19
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTA;
