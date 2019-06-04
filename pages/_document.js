import Document_, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends Document_ {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#000" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
