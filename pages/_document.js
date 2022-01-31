import Document, { Html, Head, Main, NextScript } from "next/document";



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

<style>
@import url('https://fonts.googleapis.com/css2?family=Sniglet&display=swap');
</style>
        <Head />
        <body>
        <div
          className="blobs"
          
        ></div>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
