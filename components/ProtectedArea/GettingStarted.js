import { Disclosure } from "@headlessui/react";
import {
  ChevronRightIcon,
  MinusSmIcon,
  PlusSmIcon,
} from "@heroicons/react/solid";
import NavigationContainer from "./Navigation/NavigationContainer";
import Link from "next/link";
import MainLayout from "./MainLayout";
import PageHeader from "./PageHeader";
import PageDescriptionParagraph from "./PageDescriptionParagraph";

const stepsBasicSetup = [
  {
    name: "Download and extract this starter",
    subSteps: [
      {
        subStep: (
          <span>
            Buy the starter{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href={
                "https://apphafen.gumroad.com/l/ultimatereactappstarter?variant=Saas%20Starter"
              }
            >
              here.
            </a>
          </span>
        ),
      },
      { subStep: "Extract the .zip file to any directory." },
    ],
  },
  {
    name: "Create a Firebase project and enable the Authentication, Hosting as well as FireStore APIs",
    subSteps: [
      {
        subStep: (
          <span>
            Go to the Firebase website{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://console.firebase.google.com/"
            >
              and follow the instructions.
            </a>
          </span>
        ),
      },
      {
        subStep: (
          <span>
            Click on the tabs{" "}
            <span className="italic"> Firestore Database </span> and{" "}
            <span className="italic">Hosting</span> and enable them.
          </span>
        ),
      },
      {
        subStep: (
          <span>
            Click on the tab <span className="italic"> Authentication </span>{" "}
            and under <span className="italic">Sign-in method</span> enable the
            email/password provider.
          </span>
        ),
      },
      {
        subStep: (
          <span>
            If you want to use the chat widget from the SaaS starter, you have
            to enable the Anonymous provider, under{" "}
            <span className="italic">Sign-in method</span>
          </span>
        ),
      },
    ],
  },
  {
    name: <span>Install the Firebase CLI (Command Line Interface)</span>,
    subSteps: [
      {
        subStep: (
          <span>
            Go to the step-by-step instructions{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://firebase.google.com/docs/cli?authuser=0#install_the_firebase_cli"
            >
              here and follow the instructions.
            </a>
          </span>
        ),
      },
      {
        subStep: (
          <span>
            Log into Firebase by running{" "}
            <strong className="font-bold"> {"firebase login"} </strong>
          </span>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        Run{" "}
        <strong className="font-bold"> {"firebase use <project_id>"} </strong>{" "}
        using your Firebase project id.
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <span>
            You can find the &lt;project_id&gt; by going to{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://console.firebase.google.com/project/_/settings/general/?authuser=0"
            >
              the projects settings.
            </a>{" "}
            The project_id is displayed in the top pane. Don&apos;t include the{" "}
            {"<>"} characters in the command.
          </span>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        Run <strong className="font-bold"> npm install </strong> to install the
        packages
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <span>
            If you don&apos;t have Node.js installed yet, you can follow the
            steps{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://nodejs.org/en/"
            >
              here.
            </a>
          </span>
        ),
      },
      {
        subStep: (
          <span>
            Make sure that you are in the main project folder before you run{" "}
            <strong className="font-bold"> npm install </strong>
          </span>
        ),
      },
    ],
  },
  {
    name: "Create a web app in the Firebase Console and copy and paste your web app keys in the file /components/firebase-config.js",
    subSteps: [
      {
        subStep: (
          <span>
            Follow{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://firebase.google.com/docs/web/setup?authuser=0#register-app"
            >
              these
            </a>{" "}
            instructions to register your web app within the created project.{" "}
          </span>
        ),
      },
      {
        subStep: (
          <span>
            At the last step, you are presented with a config object. Copy this
            Firebase config object in the file{" "}
            <strong className="font-bold">
              {" "}
              /components/firebase-config.js{" "}
            </strong>
          </span>
        ),
      },
      {
        subStep: (
          <span>
            <strong className="font-bold">
              API keys for Firebase services are not secret.
            </strong>{" "}
            Firebase uses API keys only to identify your app&apos;s Firebase
            project to Firebase services, and not to control access to database
            or Cloud Storage data, which is done using Firebase Security Rules.
            For this reason, you do not need to treat API keys for Firebase
            services as secrets, and you can safely embed them in client code.
            You can learn more{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://firebase.google.com/docs/projects/api-keys"
            >
              here.
            </a>
          </span>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        Start hacking by running{" "}
        <strong className="font-bold"> npm run dev</strong>
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <span>
            This command will spin up a development server and you can reach the
            website at{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="http://localhost:3000"
            >
              localhost:3000
            </a>
          </span>
        ),
      },
      {
        subStep: (
          <span>
            To run with the Firebase emulators locally, you can run{" "}
            <strong className="font-bold"> npm run dev:emulator</strong> and
            change the environment variable{" "}
            <span className="italic">NEXT_PUBLIC_USE_FIREBASE_EMULATORS</span>{" "}
            in the file <span className="italic">.env.local</span> to{" "}
            <strong>true.</strong>
          </span>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        Deploy your website by running{" "}
        <strong className="font-bold"> npm run deploy:withoutFunctions</strong>
      </span>
    ),
    subSteps: [
      {
        subStep:
          "This command compiles your code into a production-ready bundle and deploys it to Firebase Hosting.",
      },
      {
        subStep:
          "In seconds, you can serve your creation to millions of users by using the global CDN of Firebase.",
      },
      {
        subStep: (
          <span>
            Learn to connect your own domain name{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://firebase.google.com/docs/hosting/custom-domain"
            >
              here.
            </a>
          </span>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        <span className="italic">Optional:</span> Test the Firebase security
        rules by running{" "}
        <strong className="font-bold"> npm run test:firestore:rules</strong>
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <span>
            Install the testing packages in the folder /test by running
          </span>
        ),
      },
      { subStep: <span className="">Run the following commands:</span> },
      { subStep: <span className="font-bold">cd test/</span> },
      { subStep: <span className="font-bold">npm i</span> },
      { subStep: <span className="font-bold">cd ..</span> },
      {
        subStep: (
          <span className="font-bold">npm run test:firestore:rules</span>
        ),
      },
    ],
  },
];
const stepsCloudFunctions = [
  {
    name: "Enable the Cloud Functions API in the Firebase Console",
    subSteps: [
      {
        subStep: (
          <span>
            In order to use Cloud Functions, your project must be on the{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href={"https://firebase.google.com/pricing?authuser=0"}
            >
              Blaze pricing plan.
            </a>
            Follow the instruction in the link to upgrade.
          </span>
        ),
      },
      {
        subStep: (
          <span>
            {" "}
            Initialize the Cloud Functions API in your Firebase project via the
            Firebase Console:
            <strong className="mx-1">
              {
                "https://console.firebase.google.com/project/<Your_Project_ID>/functions"
              }
            </strong>
          </span>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        Install all packages in the <span className="italic">/functions</span>{" "}
        folder
      </span>
    ),
    subSteps: [
      { subStep: <span className="">Run the following commands:</span> },
      { subStep: <span className="font-bold">cd functions/</span> },
      { subStep: <span className="font-bold">npm i</span> },
      { subStep: <span className="font-bold">cd ..</span> },
    ],
  },
  {
    name: "Configure your environment keys",
    subSteps: [
      {
        subStep: (
          <span>
            In the file <span className="italic">functions.env.json</span>, you
            will find environment variables that will be used by Cloud Function.
          </span>
        ),
      },
      {
        subStep: (
          <span>
            These variables are available for example as{" "}
            <span className="italic">config.EMAIL.EMAIL_SENDER_ADDRESS</span> in
            the Functions code.
          </span>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        Run <strong className="font-bold"> {"npm run deploy"} </strong> in the{" "}
        <span className="italic">/functions</span> folder to only deploy the
        functions. Alternatively, you could run
        <strong className="font-bold">
          {" "}
          {"npm run deploy:withFunctions"}{" "}
        </strong>{" "}
        from the main folder to deploy all Firebase functionality at once
        (Hosting, Firestore, Function, Storage)
      </span>
    ),
  },
];
const stepsAdminUser = [
  {
    name: (
      <Link href={"#cloudFunctions"}>
        <a>
          Make sure you followed the steps in{" "}
          <span className="underline italic">Cloud Functions set-up</span>
        </a>
      </Link>
    ),
  },
  {
    name: (
      <span>
        Sign-up a normal account in the React starter app with username and
        password.
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <span>
            Go to the{" "}
            <Link href={"/signup"}>
              <a className="underline">sign-up page.</a>
            </Link>
          </span>
        ),
      },
    ],
  },
  {
    name: "In the Firebase Console, go to the Authentication tab and copy the UID of your created user",
    subSteps: [
      {
        subStep: (
          <p>
            <span>
              The Authentication tab can be found in the Firebase Console:
            </span>

            <strong className="mx-1">
              {
                "https://console.firebase.google.com/project/<Your_Project_ID>/authentication/users"
              }
            </strong>
          </p>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        On the Firestore tab in the Firebase Console, create a new collection
        <span className="italic mx-1">customClaims</span>
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <p>
            <span>The Firestore tab can be found in the Firebase Console:</span>

            <strong className="mx-1">
              {
                "https://console.firebase.google.com/project/<Your_Project_ID>/firestore"
              }
            </strong>
          </p>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        Add a new document with the created users&apos;{" "}
        <strong> UID as the document id </strong> and one entry:
        <strong> field: admin, type: boolean and value: true</strong>
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <p>
            <span>
              This will start a Cloud function with the name{" "}
              <span className="italic">onCustomClaimChange</span> which will set
              the custom claims for your user account.
            </span>
          </p>
        ),
      },
    ],
  },
  {
    name: "Sign out and then sign in back again with your user in the app and you will be able to see the admin pages.",
  },
];
const stepsPostmark = [
  {
    name: (
      <Link href={"#cloudFunctions"}>
        <a>
          Make sure you followed the steps in{" "}
          <span className="underline italic">Cloud Functions set-up</span>
        </a>
      </Link>
    ),
  },
  {
    name: (
      <span>
        Create a{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          href={"https://postmarkapp.com/"}
        >
          Postmark account
        </a>{" "}
        (free for 100 mails per months)
      </span>
    ),
  },
  {
    name: (
      <span>
        Update the environment keys in the{" "}
        <span className="italic">/functions</span> folder
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <span>
            In the file <span className="italic">functions.env.json</span>, you
            will find environment variables that will be used by Cloud Function.
          </span>
        ),
      },
      {
        subStep: (
          <span>
            The relevant keys for the Postmark set-up are in the EMAIL object.
          </span>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        Install the Postmark CLI via <strong>npm i postmark-cli -g</strong>
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <span>
            Learn more about the Postmark CLI{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href={"https://github.com/wildbit/postmark-cli"}
            >
              here.
            </a>
          </span>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        Run{" "}
        <strong className="font-bold"> {"npm run pull:EmailTemplates"} </strong>{" "}
        in the <span className="italic">/functions</span> folder to push the
        pre-configured Email templates to the Postmark server
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <span>
            The command will ask you for the Postmark server key in order to
            download the templates from your created email server in Postmark.
          </span>
        ),
      },
      {
        subStep:
          "Currently, we provide emails for welcoming a user, password reset, email verification and admin chat notifications.",
      },
    ],
  },
  {
    name: (
      <span>
        Change the environment variable
        <span className="italic">
          {" "}
          NEXT_PUBLIC_SEND_CUSTOM_AUTH_EMAILS in the file{" "}
          <span className="italic"> .env.local </span>
        </span>{" "}
        to <span className="italic">true</span>.
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <span>
            This will make use of Cloud functions to send custom emails to your
            users.
          </span>
        ),
      },
    ],
  },
];
const stepsPayment = [
  {
    name: (
      <Link href={"#cloudFunctions"}>
        <a>
          Make sure you followed the steps in{" "}
          <span className="underline italic">Cloud Functions set-up.</span>
        </a>
      </Link>
    ),
  },
  {
    name: (
      <span>
        Create a{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          href={"https://stripe.com"}
        >
          Stripe.com
        </a>{" "}
        account to process payments and subscriptions.
      </span>
    ),
  },
  {
    name: (
      <span>
        Run the command{" "}
        <strong>firebase ext:install stripe/firestore-stripe-payments </strong>{" "}
        in the <span className="italic">/functions</span> folder to install the
        Payment extension and follow the instruction in the command line.
      </span>
    ),
  },

  {
    name: (
      <span>
        Explore the extension and change any setting in the Firebase console at{" "}
        <strong className="mx-1">
          {
            "https://console.firebase.google.com/project/<Your_Project_ID>/extensions"
          }
        </strong>
      </span>
    ),
  },
  {
    name: (
      <span>
        In the Stripe extension settings on the Firebase Console at{" "}
        <strong className="mx-1">
          {
            "https://console.firebase.google.com/project/<Your_Project_ID>/extensions"
          }
        </strong>
        follow the instructions to set-up stripe webhooks.
      </span>
    ),
    subSteps: [
      {
        subStep: (
          <span>
            Copy the URL for the displayed Cloud Function from the Firebase
            Console and create the Webhook endpoint in the{" "}
            <Link href="https://dashboard.stripe.com">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Stripe Dashboard.
              </a>
            </Link>
          </span>
        ),
      },
      {
        subStep: (
          <span>
            Add the created Stripe Endpoint signing secret to the Stripe
            extension settings via the Firebase console at at{" "}
            <strong className="mx-1">
              {
                "https://console.firebase.google.com/project/<Your_Project_ID>/extensions"
              }
            </strong>
          </span>
        ),
      },
    ],
  },
  {
    name: (
      <span>
        Create your product and pricing information in the{" "}
        <Link href="https://dashboard.stripe.com">
          <a target="_blank" rel="noopener noreferrer" className="underline">
            Stripe Dashboard.
          </a>
        </Link>
      </span>
    ),
  },
  {
    name: (
      <span>
        Exchange the price id in the environment file{" "}
        <span className="italic">.env.local</span> with the key{" "}
        <span className="italic">NEXT_PUBLIC_STRIPE_PRICE</span> to your created
        price.
      </span>
    ),
  },
  {
    name: (
      <span>
        Check out the example in the{" "}
        <Link href={`/payments`}>
          <a className="underline">Payments page</a>
        </Link>{" "}
        and start collecting subscription payments.
      </span>
    ),
  },
  {
    name: (
      <span>
        The user can manage their subscription in the{" "}
        <Link href={`/profile`}>
          <a className="underline">Profile page.</a>
        </Link>
      </span>
    ),
  },
];
const stepsAnalytics = [
  {
    name: (
      <span>
        Activate Analytics in the Firebase Console and get your Google Analytics
        ID which has the format <span className="italic">G-XXXXXX</span>.
      </span>
    ),
  },
  {
    name: (
      <span>
        Insert your Google Analytics ID (G-XXXXXX) in the environment file{" "}
        <span className="italic">.env.local</span> with the key{" "}
        <span className="italic">
          NEXT_PUBLIC_GOOGLE_ANALYTICS_GID=G-XXXXXX
        </span>
        .
      </span>
    ),
  },
  {
    name: (
      <span>
        The component <span className="italic">Analytics.js</span> will load the
        Google Analytics script in a GDPR-compliant way. It respects the consent
        given by the user through the cookie banner.
      </span>
    ),
  },
  {
    name: (
      <span>
        You can track custom events by calling the function{" "}
        <span className="italic"> collectAnalyticsEvent</span> from the file{" "}
        <span className="italic">
          {" "}
          components/Analytics/collectAnalyticsEvent
        </span>
        .
      </span>
    ),
  },
];
const stepsE2E = [
  {
    name: (
      <span>
        Run <span className="italic">npm run dev:emulator</span> to start the
        local server with the Firebase emulators so that the end-to-end tests
        don&apos;t affect the production environment. Also make sure that the
        environment variable{" "}
        <span className="italic">NEXT_PUBLIC_USE_FIREBASE_EMULATORS</span> is
        set to <span className="italic">true</span>.
      </span>
    ),
  },
  {
    name: (
      <span>
        Run <span className="italic">npm run test:e2e</span> to run all
        end-to-end test with Playwright.
      </span>
    ),
  },
  {
    name: (
      <span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          href={"https://playwright.dev/"}
        >
          Playwright
        </a>{" "}
        comes with a test code generator which lets you generate test code
        interactively by clicking through the website. Start it with{" "}
        <span className="italic">npm run test:e2e:codegen</span>
      </span>
    ),
  },
];
const gettingStartedSteps = [
  { header: "Basic set-up", steps: stepsBasicSetup, id: "basic" },
  {
    header: "Cloud Function set-up",
    advancedFunctionality: true,
    steps: stepsCloudFunctions,
    id: "cloudFunctions",
  },
  {
    header: "Admin user set-up",
    advancedFunctionality: true,
    steps: stepsAdminUser,
    id: "adminUser",
  },
  {
    header: "Transactional emails with Postmark set-up",
    advancedFunctionality: true,
    steps: stepsPostmark,
    id: "transactionalEmail",
  },
  {
    header: "Payments with Stripe",
    advancedFunctionality: true,
    steps: stepsPayment,
    id: "payments",
  },
  {
    header: "Analytics with Google Analytics",
    advancedFunctionality: true,
    steps: stepsAnalytics,
    id: "analytics",
  },
  {
    header: "End-to-end tests with Playwright",
    advancedFunctionality: true,
    steps: stepsE2E,
    id: "e2e",
  },
];
function SidebarWithContentLinks() {
  return (
    <div className="hidden xl:text-sm xl:block flex-none w-64 pl-8">
      <div className="flex flex-col fixed justify-between overflow-y-auto sticky max-h-(screen-18) pb-6 top-18">
        <div className="mb-8">
          <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm ">
            On this page
          </h5>
          <ul className="overflow-x-hidden text-gray-500 font-medium">
            {gettingStartedSteps.map((gettingStartedStep) => (
              <li key={gettingStartedStep.id} id={gettingStartedStep.id}>
                <Link href={`#${gettingStartedStep.id}`}>
                  <a className="block transform transition-colors duration-200 py-2 hover:underline hover:text-gray-800 text-gray-700">
                    {gettingStartedStep.header}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
function GettingStartedMainContent() {
  return (
    <div className="min-w-0 flex-auto pb-24 lg:pb-16">
      <PageHeader>Getting started within 20 minutes</PageHeader>
      <PageDescriptionParagraph>
        We made it easy for you to kick-start your own project based on this
        starter. You only have to install the packages, configure Firebase with
        your project credentials and you are good to go!
      </PageDescriptionParagraph>
      <PageDescriptionParagraph>
        The code is structured in a way that ripping it apart and exchanging
        parts of this starter with your own creation is straightforward.
      </PageDescriptionParagraph>
      {gettingStartedSteps.map((gettingStartedStep) => (
        <div key={gettingStartedStep.header}>
          <h3
            className="text-2xl text-gray-900 mt-6 font-bold lg:flex lg:items-center"
            id={gettingStartedStep.id}
          >
            {gettingStartedStep.header}
            {gettingStartedStep.advancedFunctionality && (
              <span className="inline-flex items-center lg:ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-lightning-100 text-lightning-600">
                Optional and advanced functionality
              </span>
            )}
          </h3>
          {gettingStartedStep.steps.map((section, index) => (
            <Disclosure
              as="div"
              key={index}
              className="border-b border-gray-200 py-6 mt-4 max-w-4xl xl:max-w-5xl "
            >
              {({ open }) => (
                <>
                  <h3 className="-my-3 flow-root">
                    <Disclosure.Button className="py-3 text-left bg-white w-full flex items-center justify-between text-base text-gray-400 hover:text-gray-500">
                      <span className="text-gray-900 flex">
                        <span>{`${index + 1}. `}</span>
                        <span className="ml-2"> {section.name}</span>
                      </span>
                      {section.subSteps && (
                        <span className="ml-6 flex items-center text-gray-700">
                          {open ? (
                            <MinusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      )}
                    </Disclosure.Button>
                  </h3>
                  {section.subSteps && (
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {section.subSteps?.map((subStep, index) => (
                          <div key={index} className="flex items-center">
                            <div>
                              <ChevronRightIcon className="h-6 w-6 mr-3 text-gray-600" />
                            </div>
                            <span className=" text-sm text-gray-600">
                              {subStep.subStep}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  )}
                </>
              )}
            </Disclosure>
          ))}
        </div>
      ))}
    </div>
  );
}
function GettingStarted() {
  return (
    <NavigationContainer>
      <MainLayout>
        <div className="w-full flex">
          <GettingStartedMainContent />
          <SidebarWithContentLinks />
        </div>
      </MainLayout>
    </NavigationContainer>
  );
}

export default GettingStarted;
