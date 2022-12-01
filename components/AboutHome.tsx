import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const AboutHome = () => {
  const { t } = useTranslation()
  const [showItem, setShowItem] = useState<null | number>(null)
  const oneAccordion = useRef(null)
  const towAccordion = useRef(null)
  const div1 = useRef(null)
  const div2 = useRef(null)
  useEffect(() => {
    const oneAccordionY = oneAccordion.current.clientHeight
    const towAccordionY = towAccordion.current.clientHeight
    if (showItem === 1) {
      div1.current.style.height = `calc(${oneAccordionY}px + 2rem)`
      div2.current.style.height = 0
    } else if (showItem === 2) {
      div2.current.style.height = `calc(${towAccordionY}px + 2rem)`
      div1.current.style.height = 0
    } else {
      div1.current.style.height = 0
      div2.current.style.height = 0
    }
  }, [showItem])
  return (
    <div className="background-color bg-white pt-4 pb-4 ps-1 pe-1 mt-3">
      <h2 className="h5 mx-3 mb-3">{t('common.questions')}</h2>
      <div className="accordion accordion-flush">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={classNames(
                'accordion-button',
                !(showItem === 1) && 'collapsed'
              )}
              type="button"
              onClick={() => {
                if (showItem === 1) setShowItem(null)
                else setShowItem(1)
              }}
            >
              قیمت‌ ارزهای دیجیتال چگونه تعیین می‌شوند؟
            </button>
          </h2>
          <div className="accordion-collapse accordion_transition" ref={div1}>
            <div className="accordion-body">
              <p className="accordion_list" ref={oneAccordion}>
                ارزهای دیجیتال نیز مانند سهام، کالاها، اوراق بهادار و غیره یک
                دارایی قابل معامله هستند. قیمت هر ارز با توجه به میزان
                علاقه‌مندی در بازار برای خرید آنها تعیین می‌شود که به آن تقاضا
                می‌گویند. میزان در دسترس بودن این کوین ارزها نیز همان میزان عرضه
                در بازار است و رابطه بین عرضه و تقاضا، نرخ لحظه‌ای ارز دیجیتال
                را تعیین می‌کند.
                <br />
                اگر تقاضای قابل توجهی برای یک ارز خاص وجود داشته باشد، اما عرضه
                فعلی محدود باشد، قیمت افزایش می‌یابد. تقاضا برای یک ارز دیجیتال
                گاهی اوقات بدون توجه به ارزش واقعی ارز افزایش می‌یابد. از طرف
                دیگر، اگر مقدار قابل توجهی از یک ارز بدون دلیل محکم فروخته شود،
                به عنوان پیش فروش توصیف می‌شود.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              type="button"
              className={classNames(
                'accordion-button',
                !(showItem === 2) && 'collapsed'
              )}
              onClick={() => {
                if (showItem === 2) setShowItem(null)
                else setShowItem(2)
              }}
            >
              نوسانات ارزهای دیجیتال
            </button>
          </h2>
          <div className="accordion-collapse accordion_transition" ref={div2}>
            <div className="accordion-body">
              <p className="accordion_list" ref={towAccordion}>
                نوسانات معیاری است که نشان می‌دهد قیمت هر دارایی خاص در طول زمان
                چقدر بالا یا پایین رفته است. به طور کلی، هر چه دارایی نوسان
                بیشتری داشته باشد، ریسک بیشتری به عنوان سرمایه گذاری در نظر
                گرفته می‌شود و پتانسیل بیشتری برای ارائه بازده یا زیان بیشتر در
                دوره‌های زمانی کوتاه‌تر نسبت به دارایی‌های نسبتاً کم نوسان دارد.
                <br />
                پتانسیل حرکت‌های صعودی و نزولی قابل توجه در دوره‌های زمانی
                کوتاه‌تر در تمامی ارزهای دیجیتال قابل رویت است. نوسانات یکی از
                عوامل اصلی ارزیابی ریسک سرمایه گذاری است.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutHome
