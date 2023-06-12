import Link from 'next/link'
import React from 'react'
import useTranslation from '@/hooks/translation'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { MdWebAsset } from 'react-icons/md'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter()
  const t = useTranslation()
  const numPhone: string = '********0912'
  const email: string = 'example@gmail.com'
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
      <footer className="mt-4 filter-invert-dark">
        <div className="app bg-map mx-auto">
          <div className="footer-row sm:mx-10">
            <article className="footer-col sm:float-left">
              <h2 className="footer-title uppercase">{t('full.app')}</h2>
              <p className="footer text-[13px]" dir="rtl">
                ۱۴۰۱ - ۱۴۰۲ © طبق ماده ۱۲ فصل سوم قانون جرائم رایانه‌ای هرگونه
                کپی برداری از طرح قالب، مطالب و فایل‌های تارنمای مارکس به هر
                نحو، پیگرد قانونی دارد.
              </p>
              <p className="footer py-3 text-[13px]">
                1401 - 1402 © According to article 12 of the third chapter of
                the Computer Crimes Law, any copying of the MarxKet website
                template design, contents and files in any way is prosecuted
              </p>
            </article>
            <article className="footer-col sm:float-left">
              <h2 className="footer-title uppercase">{t('call')}</h2>
              <p className="footer text-[13px]" dir="rtl">
                <span>{t('number')}: </span>
                <a
                  href={'tel:' + numPhone}
                  rel="noreferrer nofollow"
                  target="_blank"
                >
                  {numPhone}
                </a>
              </p>
              <p className="footer text-[13px] mb-[12.5px]">
                <span>{t('email')}: </span>
                <a
                  href={'mailto:' + email}
                  rel="noreferrer nofollow"
                  target="_blank"
                >
                  {email}
                </a>
              </p>
              <div className="footer-line h-px" />
              <div className="footer flex gap-3">
                <a href="#" rel="nofollow noreferrer" target="_blank">
                  <AiFillGithub size={25} />
                </a>
                <a href="#" rel="nofollow noreferrer" target="_blank">
                  <AiFillLinkedin size={25} />
                </a>
                <a href="#" rel="nofollow noreferrer" target="_blank">
                  <MdWebAsset size={25} />
                </a>
              </div>
            </article>
            <div className="footer-col sm:float-left">
              <h3 className="footer-title">{t('most.popular')}</h3>
              <div className="footer">
                {most_popular.map(({ key, name }) => (
                  <React.Fragment key={key}>
                    <Link
                      href={{ pathname: '/coins/[coin]', query: { coin: key } }}
                      locale={t('lang')}
                    >
                      {name}
                    </Link>
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className="footer-line h-px" />
              <div className="footer pt-1">
                <span className="footer">آمار های در سال</span>
                <p className="pt-4">Jan 25, 2023</p>
              </div>
            </div>
            <div className="footer-col sm:float-left">
              <h3 className="footer-title">{t('user.manual')}</h3>
              <div className="footer">
                <Link href="/" locale={t('lang')}>
                  {t('home')}
                </Link>
                <br />
                <Link href="/coins" locale={t('lang')}>
                  {t('coins')}
                </Link>
                <br />
                <Link href="/auth" locale={t('lang')}>
                  {t('btn-login')}
                </Link>
              </div>
              <div className="footer-line h-px" />
              <div className="footer">
                <Link href="/stars" locale={t('lang')}>
                  {t('stars')}
                </Link>
                <br />
                <Link href="/account" locale={t('lang')}>
                  {t('profile')}
                </Link>
              </div>
            </div>
            <div className="clear-both" />
          </div>
        </div>
        <div className="clear-both" />
      </footer>
    )
  }
}

export default Footer
