import Document, { Html, Head, Main, NextScript } from "next/document";
import Header from "../components/Header";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" style={{ scrollBehavior: "smooth" }}>
        <Head >
        <Header />
        </Head >
        <body >
          <div className="w-full h-full blobs rotate-effect-slow">
            <div className="svg-blob1 rotate-effect scale-effect"></div>
            <div className="svg-blob2 rotate-effect scale-effect"></div>
            <div className="svg-blob3 rotate-effect scale-effect"></div>
            <div className="svg-blob4 rotate-effect scale-effect"></div>
            <div className="svg-blob5 rotate-effect scale-effect"></div>

          </div>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
