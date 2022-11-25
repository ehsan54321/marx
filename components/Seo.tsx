import Head from 'next/head'

type MetaProps = {
  title?: string
  keywords?: string
  description?: string
  noText?: boolean
}
const SEO = (props: MetaProps) => {
  const { title: titleText, keywords, description, noText } = props
  const title = noText ? titleText : `${titleText} - MyApp`
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta name="enamad" content="" />
      <meta property="og:title" content={title} />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:site_name" content="MyApp" />
    </Head>
  )
}

SEO.defaultProps = {
  title: 'صفحه جدید',
  description:
    'bitcoin , وب سایت نمایش قیمت ارز های دجیتال, دجیتال بیت کوین , بیت کوین ,ارز دجیتال',
  keywords:
    'bitcoin , وب سایت نمایش قیمت ارز های دجیتال, دجیتال بیت کوین , بیت کوین ,ارز دجیتال',
}

export default SEO
