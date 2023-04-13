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
      <Html lang="fa">
        <Head />
        <body dir="rtl">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
