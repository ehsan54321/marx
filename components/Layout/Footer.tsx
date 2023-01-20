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
        <section className="app bg-map mx-auto">
          <section className="footer-row sm:mx-10">
            <section className="footer-col">
              <h2 className="footer-section-title uppercase">
                {t('full.app')}
              </h2>
              <section className="clear-both"></section>
              <p className="footer-p text-[13px]" dir="rtl">
                ۱۴۰۱ © طبق ماده 12 فصل سوم قانون جرائم رایانه‌ای هرگونه کپی
                برداری از طرح قالب، مطالب و فایل‌های تارنمای مارکس به هر نحو،
                پیگرد قانونی دارد.
              </p>
              <p className="footer-p py-5 text-[13px] footer-copy">
                1401 © According to article 12 of the third chapter of the
                Computer Crimes Law, any copying of the MarxKet website template
                design, contents and files in any way is prosecuted
              </p>
            </section>
            <section className="footer-col">
              <h3 className="footer-section-title">{t('most.popular')}</h3>
              <section className="footer-section-link-item">
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
              </section>
              <section className="footer-line"></section>
              <section className="footer-section-link-item">
                <span className="footer-p">آمار های در سال</span>
                <p>Jan 25, 2022</p>
              </section>
            </section>
            <section className="footer-col">
              <h3 className="footer-section-title">{t('user.manual')}</h3>
              <section className="footer-section-link-item">
                <Link href="/">{t('home')}</Link>
                <br />
                <Link href="/coins">{t('coins')}</Link>
                <br />
                <Link href="/auth">{t('btn-login')}</Link>
              </section>
              <section className="footer-line"></section>
              <section className="footer-section-link-item">
                <Link href="/stars">{t('stars')}</Link>
                <br />
                <Link href="/account">{t('profile')}</Link>
              </section>
            </section>
            <section className="clear-both"></section>
          </section>
        </section>
        <section className="clear-both"></section>
      </footer>
    )
  }
}

export default Footer
