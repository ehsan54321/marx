import Image from 'next/image'
import { BsGithub } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter()
  const { t } = useTranslation()
  if (!(router.pathname === '/account')) {
    return (
      <footer className="mt-4 bg-white layout_border">
        <div className="container-xxl">
          <div className="flex justify-between items-center mx-2 h-16">
            <div className="flex items-center">
              <div className="flex items-center w-auto">
                <Image
                  src="/static/images/favicon-96x96.png"
                  alt="لوگو"
                  width={33}
                  height={33}
                />
                <h2 className="mr-2 font-bold text-[15px] my-auto w-[66px]">
                  {t('full.app')}
                  <br />
                  (MAR<span className="text-red-500">X</span>)
                </h2>
              </div>
              <small className="mx-2 max-sm:hidden text-gray-500">
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
