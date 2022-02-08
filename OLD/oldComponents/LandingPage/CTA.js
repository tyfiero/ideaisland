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
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8 ">
        <div className="grid items-center p-10 shadow md:grid-cols-2 rounded-xl bg-blues-100 gap-x-20">
          <div className="">
            <h3 className="font-bold tracking-wide text-gray-900 uppercase text-md">
              What&apos;s included
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex space-x-3">
                  <CheckIcon
                    className="flex-shrink-0 w-5 h-5 text-green-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-lg mx-auto mt-8 space-y-8 sm:mt-0">
            <div>
              <LightningBoltIcon
                style={{ color: "#ffecd2", stroke: "#dd914a" }}
                className="w-auto h-16 mx-auto transform scale-y-110 rotate-12"
              />
              <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-center text-gray-900 ">
                <span className="block text-blues-600 ">Ultimate</span>
                <span className="block xl:inline">React.js starter</span>{" "}
              </h3>
              <div className="flex justify-center mt-4">
                <span className="flex w-64 p-1 border border-green-600 rounded-full bg-emerald-50">
                  <BadgeCheckIcon
                    className="flex-shrink-0 w-5 h-5 ml-3 mr-2 text-green-600"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-700">
                    14-day money back guarantee
                  </span>
                </span>
              </div>
              <div className="mt-8">
                <div className="relative shadow rounded-xl group">
                  <a
                    href={
                      "https://apphafen.gumroad.com/l/reactappstarter?price=19&wanted=true"
                    }
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-xl bg-blues-600 group-hover:bg-blues-700 md:py-4 md:text-lg md:px-10"
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
