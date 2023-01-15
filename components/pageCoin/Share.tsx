import Swal from 'sweetalert2'
import { AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai'
import { baseURL } from '@baseUrl'
import { HiOutlineShare } from 'react-icons/hi'
import { RiFileCopyLine } from 'react-icons/ri'
import { TbBrandTelegram } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'

const Share = ({ nameCoin, name }) => {
  const { t } = useTranslation()
  const copyHandler = () => {
    navigator.clipboard.writeText(`${baseURL}coins/${nameCoin}`)
    Swal.fire({
      icon: 'success',
      toast: true,
      position: 'top-end',
      timer: 4000,
      title: t('copy.ok'),
      showConfirmButton: false,
      showCloseButton: true,
      timerProgressBar: true,
    })
  }
  return (
    <div className="sm:flex justify-between mx-2">
      <div className="flex text-slate-500 max-sm:mb-2">
        <div className="ml-1 flex items-center">
          <HiOutlineShare size={15} />
        </div>
        <span className="text-[14px]">اشتراک گزاری</span>
      </div>
      <div className="flex justify-center">
        <a
          target="_blank"
          rel="nofollow noreferrer"
          className="ml-2 hover:text-red-500"
          href={`mailto:?subject=${
            'صفحه کوین ' + name
          }&body=Open this link:%0D%0A${baseURL}coins/${nameCoin}`}
        >
          <AiOutlineMail />
          <span className="mr-1">{t('email')}</span>
        </a>
        <a
          target="_blank"
          rel="nofollow noreferrer"
          className="ml-2"
          href={`https://t.me/share/url?url=${baseURL}coins/${nameCoin}`}
        >
          <TbBrandTelegram />
          <span className="mr-1">{t('telegram')}</span>
        </a>
        <a
          target="_blank"
          rel="nofollow noreferrer"
          className="ml-2 hover:text-green-600"
          href={`whatsapp://send?text=${baseURL}coins/${nameCoin}`}
        >
          <AiOutlineWhatsApp />
          <span className="mr-1">{t('whatsapp')}</span>
        </a>
        <a onClick={copyHandler} className="hover:text-neutral-500">
          <RiFileCopyLine />
          <span className="mr-1">{t('copy.link')}</span>
        </a>
      </div>
    </div>
  )
}

export default Share
