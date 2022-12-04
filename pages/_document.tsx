import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentInitialProps, DocumentContext } from 'next/document'

class Document extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    return await NextDocument.getInitialProps(ctx)
  }
  render(): React.ReactElement {
    return (
      <Html dir="rtl" lang="fa">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.rtl.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
