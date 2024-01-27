<<<<<<< HEAD
import Accordion from '@/components/Accordion'
import ControllerCoin from '@/components/coins/ControllerCoins'
import http from '@/services/httpServices'
import Meta from '@/components/Meta'
import useTranslation from '@/hooks/translation'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      data: (await http.get('api/v2/coins?pi=15')).data,
    },
  }
}

const HomePage = ({ data }) => {
  const t = useTranslation()
  // TODO api web socket update value coins
  return (
    <>
      <Meta
        title={t('title.home')}
        description="وب سایت مارکس کت یک سایت نمایش قیمت ارز های دجیتال است که بیش از ۴۴ ارز دجیتال دارد مانند بیت کوین اتریوم تتر دوج کوین و غیر ... صفحه کوین ها"
        keywords={[
          'قیمت ارزهای دجیتال',
          'قیمت ارز دجیتال',
          'قیمت ارزهای دجیتال در ایران',
          'قیمت ارزهای دجیتال در سال ۱۴۰۲',
          'ارزهای دجیتال در سال 1402,قیمت ارز',
          'لیست قیمت ارزهای دجیتال',
        ]}
      />
      <h1 className="h5 mb-6 leading-7 font-bold" dir="auto">
        {t('title.home')}
      </h1>
      <div className="background-color bg-white pt-6 px-0 pb-2">
        <ControllerCoin dataServer={data} />
      </div>
      <div className="background-color bg-white pt-6 pb-6 px-1 mt-4">
        <h2 className="h5 mx-4 mb-4" id="FAQ">
          {t('common.questions')}
        </h2>
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
=======
import Accordion from '@/components/Accordion'
import ControllerCoin from '@/components/coins/ControllerCoins'
import http from '@/services/httpServices'
import Meta from '@/components/Meta'
import useTranslation from '@/hooks/translation'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      data: (await http.get('api/v2/coins?pi=15')).data,
    },
  }
}

const HomePage = ({ data }) => {
  const t = useTranslation()
  // TODO api web socket update value coins
  return (
    <>
      <Meta
        title={t('title.home')}
        description="وب سایت مارکس کت یک سایت نمایش قیمت ارز های دجیتال است که بیش از ۴۴ ارز دجیتال دارد مانند بیت کوین اتریوم تتر دوج کوین و غیر ... صفحه کوین ها"
        keywords={[
          'قیمت ارزهای دجیتال',
          'قیمت ارز دجیتال',
          'قیمت ارزهای دجیتال در ایران',
          'قیمت ارزهای دجیتال در سال ۱۴۰۲',
          'ارزهای دجیتال در سال 1402,قیمت ارز',
          'لیست قیمت ارزهای دجیتال',
        ]}
      />
      <h1 className="h5 mb-6 leading-7 font-bold" dir="auto">
        {t('title.home')}
      </h1>
      <div className="background-color bg-white pt-6 px-0 pb-2">
        <ControllerCoin dataServer={data} />
      </div>
      <div className="background-color bg-white pt-6 pb-6 px-1 mt-4">
        <h2 className="h5 mx-4 mb-4" id="FAQ">
          {t('common.questions')}
        </h2>
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
>>>>>>> 1bd3d58 (start git)
