import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Chat = dynamic(() => import("../components/Chat/ChatWidget/Chat"), {
  ssr: false,
});
import LandingPage from "../components/LandingPage/LandingPage";

// This page will be rendered at the root of the website. E.g.: www.example.com/
export default function Root() {
  const [loadChat, setLoadChat] = useState(false);
  // We wil load the chat only after a few seconds to speed up the page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadChat(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <LandingPage />
      {loadChat && <Chat />}
    </>
  );
}
