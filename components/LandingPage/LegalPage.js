import Footer from "./Footer";

function LegalPage() {
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
          <div className="relative px-4 sm:px-6 lg:px-8 py-8 mt-4 sm:mt-12">
            <div className="text-lg max-w-prose mx-auto ">
              <h1>
                <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Legal notice
                </span>
              </h1>
              <p className="mt-8 text-xl text-gray-500 leading-8">
                Your legal notice here
              </p>
            </div>
            <div className="mt-6 prose prose-cerulean prose-lg text-gray-500 mx-auto">
              <p>
                Responsible for the content of{" "}
                <a href="https://example.com">www.example.com</a> and any
                services offered via this site is:
              </p>
              <p>
                <strong>Your name</strong>
              </p>

              <h2>Disclaimer</h2>
              <p>
                The information provided by us on this website is for general
                informational purposes only. All information on the website is
                provided in good faith, however we make no representation or
                warranty of any kind, express or implied, regarding the
                accuracy, adequacy, validity, reliability, availability or
                completeness of any information on the Site.
              </p>
              <h2>External Links Disclaimer</h2>
              <p>
                The Site may contain links to other websites or content
                belonging to or originating from third parties. Such external
                links are not investigated, monitored, or checked for accuracy,
                adequacy, validity, reliability, availability or completeness by
                us. We do not warrant, endorse, guarantee, or assume
                responsibility for the accuracy or reliability of any
                information offered by third-party websites linked through the
                site or any website or feature linked in any banner or other
                advertising. We will not be a party to or in any way be
                responsible for monitoring any transaction between you and
                third-party providers of products or services.
              </p>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default LegalPage;
