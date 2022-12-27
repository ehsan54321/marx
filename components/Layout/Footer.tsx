import Image from 'next/image'
import { BsGithub } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

const Footer = ({ NoFooter }: { NoFooter: boolean }) => {
  const { t } = useTranslation()
  if (!NoFooter) {
    return (
      <footer className="mt-3 bg-white layout_border">
        <div className="container-xxl">
          <div className="flex justify-between items-center ms-2 me-2 layout_content">
            <div className="flex items-center">
              <Image
                src="/static/images/favicon.ico"
                alt="لوگو"
                width={33}
                height={33}
                priority
              />
              <small className="layout_text mx-2 sm:flex hidden text-black-50">
                {t('lang')
                  ? '۱۴۰۱ © طبق ماده 12 فصل سوم قانون جرائم رایانه‌ای هرگونه کپی برداری از طرح قالب، مطالب و فایل‌های تارنمای MyApp به هر نحو، پیگرد قانونی دارد.'
                  : '1401 © According to article 12 of the third chapter of the Computer Crimes Law, any copying of the MyApp website template design, contents and files in any way is prosecuted.'}
              </small>
            </div>
            <div>
              <a
                href="https://github.com/ehsan54321/my-app"
                rel="nofollow noreferrer"
                target="_blank"
              >
                <BsGithub className="layout_icon" size={30} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
