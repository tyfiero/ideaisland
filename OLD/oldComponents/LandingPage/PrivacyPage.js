import Footer from "./Footer";

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden">
        <div className="mx-auto">
          <img
            srcSet="johannes-plenio-E-Zuyev2XWo-unsplash-1024w.jpg 1024w,
                  johannes-plenio-E-Zuyev2XWo-unsplash-1600w.jpg 1600w,
                  johannes-plenio-E-Zuyev2XWo-unsplash-2640w.jpg 2640w"
            sizes="100vw"
            className="h-52 w-full object-cover"
            src="johannes-plenio-E-Zuyev2XWo-unsplash-2640w.jpg"
            alt="Lightning"
          />
        </div>
        <main>
          <div className="relative px-4 sm:px-6 lg:px-8 py-8 mt-4 sm:mt-12 pb-52">
            <div className="text-lg max-w-prose mx-auto ">
              <h1>
                <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Privacy Policy
                </span>
              </h1>
            </div>
            <div className="mt-6 prose prose-cerulean prose-lg text-gray-500 mx-auto">
              <p>Your privacy policy here</p>
              <h2>Header </h2>
              <p>Text</p>
            </div>
          </div>
          <div className="fixed bottom-0 w-full">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default PrivacyPage;
