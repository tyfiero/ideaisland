import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "../StateManagement";
import NavigationContainer from "./Navigation/NavigationContainer";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/solid";
import Spinner from "../Spinner";
import { httpsCallable } from "firebase/functions";
import { firestore, functions } from "../firebase-init";

import MainLayout from "./MainLayout";
import PageHeader from "./PageHeader";
import PageDescriptionParagraph from "./PageDescriptionParagraph";

function PaymentsPage() {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    if (router.query?.success) {
      setPaymentSuccess(true);
    }
    if (router.query?.canceled) {
      setPaymentSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubscribe = async () => {
    console.log("handle subscribe");

    // return early if the user is undefined
    if (!user) return;
    try {
      setLoading(true);
      const { doc, collection, addDoc, onSnapshot } = await import(
        "firebase/firestore"
      );

      if (!firestore) return;
      const customerRef = doc(collection(firestore, "customers"), user.uid);
      console.log(window.location.origin + router.pathname + "?success=true");
      const newCheckoutSessionRef = await addDoc(
        collection(customerRef, "checkout_sessions"),
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE,
          success_url:
            window.location.origin + router.pathname + "?success=true",
          cancel_url:
            window.location.origin + router.pathname + "?canceled=true",
        }
      );
      const unsubscribe = onSnapshot(newCheckoutSessionRef, (doc) => {
        const { error, url } = doc.data();
        if (error) {
          // Show an error to your customer and
          // inspect your Cloud Function logs in the Firebase console.
          alert(`An error occurred: ${error.message}`);
          unsubscribe();
          setLoading(false);
        }
        if (url) {
          // We have a Stripe Checkout URL, let's redirect.
          router.push(url);
          unsubscribe();
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleCustomerPortal = async () => {
    // return early if the user is undefined
    if (!user) return;
    try {
      setLoading(true);

      const customerPortalLinkRef = httpsCallable(
        functions,
        process.env.NEXT_PUBLIC_STRIPE_FUNCTION_PORTAL_LINK
      );
      const { data } = await customerPortalLinkRef({
        returnUrl: window.location.origin + router.pathname,
        locale: "auto", // Optional, defaults to "auto"
      });
      console.log(data);
      router.push(data.url);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <NavigationContainer>
      <MainLayout>
        <PageHeader>Payments with Stripe</PageHeader>

        <PageDescriptionParagraph>
          Stripe.com is the most advanced payment provider in the digital world.
        </PageDescriptionParagraph>
        <PageDescriptionParagraph>
          Use the{" "}
          <a
            href="https://stripe.com/docs/payments/checkout"
            target="_blank"
            rel="noreferrer"
            className=" underline"
          >
            hosted checkout
          </a>{" "}
          to seamlessly collect one-time and recurring payments.
        </PageDescriptionParagraph>
        <div>
          <div className="border border-blues-200 shadow-sm rounded-3xl mt-8 overflow-hidden bg-blues-100">
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h3 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Try the payment integration in this live demo!
                  </h3>
                  <p className="mt-4 text-xl text-gray-600">
                    Nothing will be charged.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-blues-100 pb-16 sm:mt-12 sm:pb-20 ">
              <div className="relative">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                    <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                      <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        Pro Subscription (TEST)
                      </h3>
                      <p className="mt-6 text-base text-gray-500 text-justify">
                        Checkout creates a secure, Stripe-hosted payment page
                        that lets you collect payments quickly. It works across
                        devices and can help increase your conversion.
                      </p>
                      <div className="mt-8">
                        <div className="flex items-center">
                          <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-blues-600">
                            Benefits of Stripe Checkout
                          </h4>
                          <div className="flex-1 border-t-2 border-gray-200" />
                        </div>
                        <ul
                          role="list"
                          className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
                        >
                          {[
                            "Increase sales with a better payments experience",
                            "Designed to reduce friction",
                            "Optimized for any device",
                            "25+ languages, 135+ currencies",
                          ].map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start lg:col-span-1"
                            >
                              <div className="flex-shrink-0">
                                <CheckCircleIcon
                                  className="h-5 w-5 text-green-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-sm text-gray-700">
                                {feature}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                      {paymentSuccess ? (
                        <div className="px-4 py-5 space-y-6 sm:p-6 w-64">
                          <div className="flex justify-center flex-col">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center  text-white bg-green-500  rounded-full p-2 ">
                                <CheckIcon className="h-8 w-8" />
                              </div>
                            </div>
                            <div className="text-center text-xl font-extrabold mt-3 text-gray-700">
                              Successfully subscribed!
                            </div>
                            <button
                              onClick={handleCustomerPortal}
                              className="flex mt-4 w-full items-center justify-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none"
                            >
                              Manage your subscription here!
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 w-64">
                            <span>$20</span>
                            <span className="ml-3 text-xl font-medium text-gray-500">
                              /month
                            </span>
                          </div>

                          <div className="mt-6">
                            <div className="rounded-md shadow">
                              <button
                                disabled={loading}
                                onClick={handleSubscribe}
                                className="flex w-full items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none"
                              >
                                {loading ? (
                                  <Spinner className="w-5 h-5 text-white" />
                                ) : (
                                  <span>Subscribe</span>
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="mt-4 text-sm">
                            <p className="font-medium text-gray-900">
                              Use the testing credit card number{" "}
                            </p>
                            <p className="font-normal text-gray-500">
                              4242 4242 4242 4242
                            </p>
                            <p className="font-normal text-gray-500">
                              Any expiration date.
                            </p>
                            <p className="font-normal text-gray-500">
                              Any CCV number.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </NavigationContainer>
  );
}

export default PaymentsPage;
