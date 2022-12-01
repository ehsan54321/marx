import toast from 'sweetalert2'
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
    toast.fire({
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
    <div className="d-sm-flex justify-content-between">
      <div className="d-flex text-secondary mb-2 mb-sm-0 ms-2">
        <div className="me-1 d-flex align-items-center">
          <HiOutlineShare size={15} />
        </div>
        <span className="font-14">اشتراک گزاری</span>
      </div>
      <div className="d-flex ms-2">
        <a
          target="_blank"
          rel="nofollow noreferrer"
          className="me-2 hover:red"
          href={`mailto:?subject=${
            'صفحه کوین ' + name
          }&body=Open this link:%0D%0A${baseURL}coins/${nameCoin}`}
        >
          <AiOutlineMail />
          <span className="ms-1">{t('email')}</span>
        </a>
        <a
          target="_blank"
          rel="nofollow noreferrer"
          className="me-2"
          href={`https://t.me/share/url?url=${baseURL}coins/${nameCoin}`}
        >
          <TbBrandTelegram />
          <span className="ms-1">{t('telegram')}</span>
        </a>
        <a
          target="_blank"
          rel="nofollow noreferrer"
          className="me-2 hover:green"
          href={`whatsapp://send?text=${baseURL}coins/${nameCoin}`}
        >
          <AiOutlineWhatsApp />
          <span className="ms-1">{t('whatsapp')}</span>
        </a>
        <a onClick={copyHandler} className="hover:secondary">
          <RiFileCopyLine />
          <span className="ms-1">{t('copy.link')}</span>
        </a>
      </div>
    </div>
  )
}

export default Share
