import Document, { Html, Head, Main, NextScript } from "next/document";
import Header from "../components/Header";
import Script from "next/script";
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
        </Head >
        <body >
         

          <Main />
          <NextScript />
          <Script
        src="https://cdn.paddle.com/paddle/paddle.js"
        strategy="beforeInteractive"
        onLoad={(e) => {
            // eslint-disable-next-line
            // Paddle.Environment.set('sandbox')
          Paddle.Setup({ vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID) });
          console.log("Loaded paddle")
        }}
      />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
