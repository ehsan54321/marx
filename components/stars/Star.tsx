import toast from 'sweetalert2'
import { AuthContext } from '@store/auth'
import { memo, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

type starObj = {
  id: number
  name: string
  faName: string
  poster_path: string
}
const Star: React.FC<starObj> = ({ name, faName, id, poster_path }) => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const [loaderStatus, setLoaderStatus] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const data: starObj[] = JSON.parse(localStorage.getItem('star'))
    if (data !== null) {
      data.map((coin: starObj) => {
        if (coin.name === name) setStatus(true)
      })
    }
  }, [name])

  const starHandler = () => {
    const setFalse = (status: boolean) => {
      setStatus(status)
      setTimeout(() => setLoaderStatus(false), 620)
    }
    setLoaderStatus(true)
    if (isAuth) {
      const dataLocalStorage: starObj[] = [{ name, faName, id, poster_path }]
      if (status) {
        // localStorage پاک کردن کوین از
        const funLocalStorage = () => {
          return JSON.parse(localStorage.getItem('star')).filter(
            (coin: starObj) => coin.name !== name
          )
        }
        localStorage.setItem('star', JSON.stringify(funLocalStorage()))
        setFalse(false)
      } else {
        if (!localStorage.getItem('star')) {
          // اولین ستاره
          localStorage.setItem('star', JSON.stringify(dataLocalStorage))
          setFalse(true)
        } else {
          // دو به بالا ستاره
          localStorage.setItem(
            'star',
            JSON.stringify([
              ...JSON.parse(localStorage.getItem('star')),
              ...dataLocalStorage,
            ])
          )
          setFalse(true)
        }
      }
    } else {
      // زمانی که کاربر وارد نشد باشد
      toast
        .fire({
          icon: 'warning',
          title: t('text.no.login'),
          confirmButtonText: `<a href="javascript:void(0)" class="text-white">${t(
            'text.no.login.button'
          )}</a>`,
          showCloseButton: true,
        })
        .then((e) => {
          setLoaderStatus(false)
          if (e.isConfirmed) router.push('/auth#login')
        })
    }
  }

  if (loaderStatus) {
    return (
      <div className="spinner-grow text-primary star_wh" role="status">
        <span className="visually-hidden">{t('loading') + '...'}</span>
      </div>
    )
  } else {
    return (
      <i
        onClick={starHandler}
        className={`bi star_star cursor-pointer bi-star${
          isAuth && status ? '-fill text-gold' : ''
        }`}
      ></i>
    )
  }
}

export default memo(Star)
