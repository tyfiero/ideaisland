import Document, { Html, Head, Main, NextScript } from "next/document";
import Header from "../components/Header";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" style={{ scrollBehavior: "smooth" }} >
        <Head >
        <Header />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-777KH9KK8R`}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-777KH9KK8R', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
     

        </Head >
        <body className="sm:touch-none ">
         

          <Main />
          <NextScript />
         
        </body>
      </Html>
    );
  }
}

export default MyDocument;
