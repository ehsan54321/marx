import Accordion from '@components/Accordion'
import AdsComponents from '../components/Ads'
import ControllerCoin from '@components/coins/ControllerCoins'
import http from '@services/httpServices'
import SEO from '@components/Seo'
import { useTranslation } from 'react-i18next'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = (ctx) => {
  // const token = ctx.req.cookies.token
  // const deCodeToken = (data) => {
  //   return jwt.decode(data, {
  //     complete: true,
  //     algorithm: 'HS256',
  //     expiresIn: '90d',
  //   }).payload
  // }
  // return {
  //   props: { token: token ? deCodeToken(token) : null },
  // }
  return http.get('api/coins').then(({ data }) => {
    return {
      props: { data },
    }
  })
}
const HomePage = ({ data }) => {
  const { t } = useTranslation()
  // const { setAuthState } = useContext(AuthContext)
  // setAuthState(token)
  // TODO api web socket update value coins
  return (
    <>
      <SEO
        title={t('title.home')}
        keywords="bitcoin, وب سایت نمایش قیمت ارز های دجیتال, دجیتال بیت کوین, بیت کوین, ارز دجیتال"
        description="وب سایت MyApp یک سایت نمایش قیمت ارز های دجیتال است مانند بیت کوین اتریوم تتر دوج کوین و غیر"
      />
      <AdsComponents />
      <h1 className="h5 mt-4 mb-4 h1_page">{t('list-coins')}</h1>
      <div className="background-color bg-white pt-4 px-0 pb-3">
        <ControllerCoin dataServer={data} />
      </div>
      <div className="background-color bg-white pt-4 pb-4 ps-1 pe-1 mt-3">
        <h2 className="h5 mx-3 mb-3">{t('common.questions')}</h2>
        <Accordion
          title={{
            one: 'قیمت‌ ارزهای دیجیتال چگونه تعیین می‌شوند؟',
            tow: 'نوسانات ارزهای دیجیتال',
          }}
          di={{
            one: 'ارزهای دیجیتال نیز مانند سهام، کالاها، اوراق بهادار و غیره یک دارایی قابل معامله هستند. قیمت هر ارز با توجه به میزان علاقه‌مندی در بازار برای خرید آنها تعیین می‌شود که به آن تقاضا می‌گویند. میزان در دسترس بودن این کوین ارزها نیز همان میزان عرضه در بازار است و رابطه بین عرضه و تقاضا، نرخ لحظه‌ای ارز دیجیتال را تعیین می‌کند. اگر تقاضای قابل توجهی برای یک ارز خاص وجود داشته باشد، اما عرضه فعلی محدود باشد، قیمت افزایش می‌یابد. تقاضا برای یک ارز دیجیتال گاهی اوقات بدون توجه به ارزش واقعی ارز افزایش می‌یابد. از طرف دیگر، اگر مقدار قابل توجهی از یک ارز بدون دلیل محکم فروخته شود، به عنوان پیش فروش توصیف می‌شود.',
            tow: 'نوسانات معیاری است که نشان می‌دهد قیمت هر دارایی خاص در طول زمان چقدر بالا یا پایین رفته است. به طور کلی، هر چه دارایی نوسان بیشتری داشته باشد، ریسک بیشتری به عنوان سرمایه گذاری در نظر گرفته می‌شود و پتانسیل بیشتری برای ارائه بازده یا زیان بیشتر در دوره‌های زمانی کوتاه‌تر نسبت به دارایی‌های نسبتاً کم نوسان دارد. پتانسیل حرکت‌های صعودی و نزولی قابل توجه در دوره‌های زمانی کوتاه‌تر در تمامی ارزهای دیجیتال قابل رویت است. نوسانات یکی از عوامل اصلی ارزیابی ریسک سرمایه گذاری است.',
          }}
        />
      </div>
    </>
  )
}

export default HomePage
