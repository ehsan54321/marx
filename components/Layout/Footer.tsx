import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const router = useRouter()
  const { t } = useTranslation()
  if (!(router.pathname === '/account')) {
    const most_popular = [
      {
        name: 'Bitcoin - بیت کوین',
        key: 'btc',
      },
      {
        name: 'Ethereum - اتریوم',
        key: 'eth',
      },
      {
        name: 'Shiba Inu - شیبا',
        key: 'shiba',
      },
    ]
    return (
      <footer className="footer mt-4 filter-invert-dark">
        <div className="app bg-map mx-auto">
          <div className="footer-row sm:mx-10">
            <div className="footer-col sm:float-left">
              <h2 className="footer-section-title uppercase">
                {t('full.app')}
              </h2>
              <div className="clear-both"></div>
              <p className="footer-p text-[13px]" dir="rtl">
                ۱۴۰۱ © طبق ماده 12 فصل سوم قانون جرائم رایانه‌ای هرگونه کپی
                برداری از طرح قالب، مطالب و فایل‌های تارنمای مارکس به هر نحو،
                پیگرد قانونی دارد.
              </p>
              <p className="footer-p py-5 text-[13px]">
                1401 © According to article 12 of the third chapter of the
                Computer Crimes Law, any copying of the MarxKet website template
                design, contents and files in any way is prosecuted
              </p>
            </div>
            <div className="footer-col sm:float-left">
              <h3 className="footer-section-title">{t('most.popular')}</h3>
              <div className="footer-section-link-item">
                {most_popular.map(({ key, name }) => (
                  <React.Fragment key={key}>
                    <Link
                      href={{ pathname: '/coins/[coin]', query: { coin: key } }}
                    >
                      {name}
                    </Link>
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className="footer-line h-px"></div>
              <div className="footer-section-link-item">
                <span className="footer-p">آمار های در سال</span>
                <p>Jan 25, 2023</p>
              </div>
            </div>
            <div className="footer-col sm:float-left">
              <h3 className="footer-section-title">{t('user.manual')}</h3>
              <div className="footer-section-link-item">
                <Link href="/">{t('home')}</Link>
                <br />
                <Link href="/coins">{t('coins')}</Link>
                <br />
                <Link href="/auth">{t('btn-login')}</Link>
              </div>
              <div className="footer-line h-px"></div>
              <div className="footer-section-link-item">
                <Link href="/stars">{t('stars')}</Link>
                <br />
                <Link href="/account">{t('profile')}</Link>
              </div>
            </div>
            <div className="clear-both"></div>
          </div>
        </div>
        <div className="clear-both"></div>
      </footer>
    )
  }
}

export default Footer
