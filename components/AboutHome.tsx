import { Accordion } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const AboutHome = () => {
  const { t } = useTranslation()
  return (
    <div className="background-color bg-white pt-4 pb-4 ps-1 pe-1 mt-3">
      <h2 className="h5 mx-3 mb-3">{t('common.questions')}</h2>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            قیمت‌ ارزهای دیجیتال چگونه تعیین می‌شوند؟
          </Accordion.Header>
          <Accordion.Body>
            <p className="accordion_list mb-1">
              ارزهای دیجیتال نیز مانند سهام، کالاها، اوراق بهادار و غیره یک
              دارایی قابل معامله هستند. قیمت هر ارز با توجه به میزان علاقه‌مندی
              در بازار برای خرید آنها تعیین می‌شود که به آن تقاضا می‌گویند.
              میزان در دسترس بودن این کوین ارزها نیز همان میزان عرضه در بازار
              است و رابطه بین عرضه و تقاضا، نرخ لحظه‌ای ارز دیجیتال را تعیین
              می‌کند.
              <br />
              اگر تقاضای قابل توجهی برای یک ارز خاص وجود داشته باشد، اما عرضه
              فعلی محدود باشد، قیمت افزایش می‌یابد. تقاضا برای یک ارز دیجیتال
              گاهی اوقات بدون توجه به ارزش واقعی ارز افزایش می‌یابد. از طرف
              دیگر، اگر مقدار قابل توجهی از یک ارز بدون دلیل محکم فروخته شود، به
              عنوان پیش فروش توصیف می‌شود.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>نوسانات ارزهای دیجیتال</Accordion.Header>
          <Accordion.Body>
            <p className="accordion_list mb-1">
              نوسانات معیاری است که نشان می‌دهد قیمت هر دارایی خاص در طول زمان
              چقدر بالا یا پایین رفته است. به طور کلی، هر چه دارایی نوسان بیشتری
              داشته باشد، ریسک بیشتری به عنوان سرمایه گذاری در نظر گرفته می‌شود
              و پتانسیل بیشتری برای ارائه بازده یا زیان بیشتر در دوره‌های زمانی
              کوتاه‌تر نسبت به دارایی‌های نسبتاً کم نوسان دارد.
              <br />
              پتانسیل حرکت‌های صعودی و نزولی قابل توجه در دوره‌های زمانی
              کوتاه‌تر در تمامی ارزهای دیجیتال قابل رویت است. نوسانات یکی از
              عوامل اصلی ارزیابی ریسک سرمایه گذاری است.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default AboutHome
