import { Html, Head, Main, NextScript } from 'next/document'

/**
 * Document component is a custom Next.js document component.
 *
 * This component allows you to customize the HTML document's structure,
 * including the head, body, and script tags. In this example, a custom
 * script tag ("index.js") is included.
 *
 * @returns {JSX.Element} - The JSX markup for the Document component.
 */

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script src = "index.js"></script>
      </body>
    </Html>
  )
}
