import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentInitialProps, DocumentContext } from 'next/document'
import { baseURL } from '@baseUrl'

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
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.rtl.min.css"
          />

          <link
            rel="shortcut icon"
            href={baseURL + 'static/images/favicon.ico'}
          />
          <link rel="icon" href={baseURL + 'static/images/favicon.ico'} />
          <meta
            property="og:image"
            content={baseURL + 'static/images/favicon.ico'}
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
