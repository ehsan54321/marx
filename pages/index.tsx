import Accordion from '@components/Accordion'
import ControllerCoin from '@components/coins/ControllerCoins'
import http from '@services/httpServices'
import SEO from '@components/Seo'
import { useTranslation } from 'react-i18next'

const HomePage = ({ data }) => {
  const { t } = useTranslation()
  // TODO api web socket update value coins
  return (
    <>
      <SEO
        title={t('title.home')}
        keywords="قیمت ارزهای دجیتال, قیمت ارز دجیتال, قیمت ارزهای دجیتال در ایران, قیمت ارزهای دجیتال در سال ۱۴۰۰, ارزهای دجیتال در سال 1400,قیمت ارز, لیست قیمت ارزهای دجیتال, ارز دجیتال, صرافی مارکس کت, مارکس کت"
        description={`وب سایت مارکس کت یک سایت نمایش قیمت ارز های دجیتال است که بیش از ۴۲ ارز دجیتال دارد مانند بیت کوین اتریوم تتر دوج کوین و غیر ...`}
        url=""
      />
      <h1 className="h5 mb-6 leading-7 font-bold h1Page">{t('title.home')}</h1>
      <div className="background-color bg-white pt-6 px-0 pb-2">
        <ControllerCoin dataServer={data} />
      </div>
      <div
        className="background-color bg-white pt-6 pb-6 px-1 mt-4"
        id="common-questions"
      >
        <h2 className="h5 mx-4 mb-4">{t('common.questions')}</h2>
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

HomePage.getInitialProps = async () => {
  return {
    data: (await http.get('api/v2/coins?pi=20')).data,
  }
}

export default HomePage
