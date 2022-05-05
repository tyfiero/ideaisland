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
        </Head >
        <body >
         

          <Main />
          <NextScript />
         
        </body>
      </Html>
    );
  }
}

export default MyDocument;
