import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script src="index.js"></script>
      </body>
    </Html>
  );
}
