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
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Sniglet&display=swap" rel="stylesheet" /> */}

        {/* <style>
@import url('https://fonts.googleapis.com/css2?family=Sniglet&display=swap');
</style> */}
        <Head >
        <Header />
        </Head >
        <body>
          <div className="blobs">
            <div className="svg-blob1 rotate-effect scale-effect"></div>
            <div className="svg-blob2 rotate-effect scale-effect"></div>
            <div className="svg-blob3 rotate-effect scale-effect"></div>
            <div className="svg-blob4 rotate-effect scale-effect"></div>
          </div>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
