import {
  AcademicCapIcon,
  AnnotationIcon,
  BeakerIcon,
  CodeIcon,
  ServerIcon,
  ShieldCheckIcon,
  ThumbUpIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@heroicons/react/solid";

const callouts = [
  {
    name: "Streamlined developer experience",
    description:
      "There are a hundred of choices to make to create a modern web app. We have chosen a powerful but easy to use tech stack. You will be able to start from a solid foundation rather than plugging in all the basic elements yourself. Save hours if not days of your time.",

    icon: CodeIcon,
  },
  {
    name: "Authentication Pages and Logic",
    description:
      "You should never implement authentication yourself. Take the security of your users serious and use existing solutions like Firebase Authentication from Google. \nWe pre-build the authentication (email + password) flow for you, including the sign-up, login, password reset pages and also the redirect to protected pages in your app.",
    icon: UsersIcon,
  },
  {
    name: "Chat widget",
    description:
      "The SaaS starter includes a chat widget for your users to contact you. Start an interactive chat discussion and notify the users via in-app chat messages and notifications. No need for expensive third-party providers to interact with your users.",
    icon: AnnotationIcon,
  },
  {
    name: "Serverless",
    description:
      "You don't have to worry about configuring servers, paying for unused capacity and scaling. With the focus on serverless architecture, all chosen technologies will scale from one to millions of users without hiring a single backend expert.",
    icon: ServerIcon,
  },
  {
    name: "Security",
    description:
      "Make use of the best authentication and security practices. Rely on experts at Google to secure the infrastructure and build on the shoulder of giants. Examples of security rules and unit tests of them are included.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Analytics",
    description:
      "Measure the performance of your React app in terms of page visits, session duration, event collection and much more with Google Analytics 4. Embedded in a GDPR-compliant way using a custom cookie banner.",
    icon: TrendingUpIcon,
  },
  {
    name: "Tests",
    description:
      "End-to-end test using Playwright with many examples based on this starter and security rules tests for Firestore with Mocha.",
    icon: BeakerIcon,
  },
  {
    name: "Documentation",
    description:
      "We try to make the use of this starter as seamless as possible. All the used technologies are documented and by following our step-by-step guide you will be set-up within minutes.",
    icon: AcademicCapIcon,
  },
  {
    name: "Lifetime access and updates",
    description:
      "Start for free with the React app starter. Consider upgrading to the SaaS starter for your next SaaS business idea. No subscription! Buy once and save yourself a lot of coding time now and enjoy all future updates as well! Use it for as many commercial as well as non-commercial apps as you like.",
    icon: ThumbUpIcon,
  },
];

export default function Features() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-6 lg:py-12 lg:max-w-5xl">
          <div className="mt-6 space-y-12">
            {callouts.map((callout) => (
              <div key={callout.name} className={`flex-row flex sm:px-10 mr-2`}>
                <div className="mr-6 ml-2">
                  <callout.icon className="text-blues-500 w-14 h-14 rounded-full bg-blues-200 p-3" />
                </div>

                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {callout.name}
                  </p>
                  <h3 className="mt-3 text-base text-gray-700 text-justify">
                    <span className="whitespace-pre-wrap">
                      {callout.description}
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
