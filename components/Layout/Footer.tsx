import Image from 'next/image'
import { BsGithub } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

const Footer = ({ NoFooter }: { NoFooter: boolean }) => {
  const { t } = useTranslation()
  if (!NoFooter) {
    return (
      <footer className="mt-4 bg-white layout_border">
        <div className="container-xxl">
          <div className="flex justify-between items-center mx-2 h-16">
            <div className="flex items-center">
              <Image
                src="/static/images/favicon.ico"
                alt="لوگو"
                width={33}
                height={33}
                priority
              />
              <small className="mx-2 sm:flex hidden text-gray-500">
                {t('footer.text')}
              </small>
            </div>
            <div>
              <a
                href="https://github.com/ehsan54321/marx"
                rel="nofollow noreferrer"
                target="_blank"
              >
                <BsGithub
                  className="layout_icon text-slate-500 hover:text-black"
                  size={30}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
