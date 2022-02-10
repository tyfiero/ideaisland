import Link from "next/link";

export default function Custom404() {
  return (
    <main>
      <div className="flex flex-col items-center">
        <h1 className="text-[4em]">404 </h1>

        <h1 className="text-[2em]">
          Looks like you washed up on the wrong island!
        </h1>

        <div className="relative flex items-center justify-center">
          {/* <img
            className="w-[60%] rounded-3xl z-0 island-error-img drop-shadow-xl "
            src="https://images.unsplash.com/photo-1596744223084-86a7c1cb68cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
            alt="404 image"
          /> */}
          <div className="image-error"></div>
        </div>
        <div className="fourohfour-image"></div>
        <Link href="/">
          <button className="w-[18em] h-12 rounded-3xl bg-t-bl flex items-center mt-3 justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 text-2xl">
            Back to ideaisland!
          </button>
        </Link>
      </div>
    </main>
  );
}
