import sweetalert2 from 'sweetalert2'
import { AiTwotoneStar } from 'react-icons/ai'
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
const Star = ({ name, faName, id, poster_path }: starObj) => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const [loaderStatus, setLoaderStatus] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    const data: starObj[] = JSON.parse(localStorage.getItem('star'))
    if (data) {
      data.findIndex((item) => item.name === name) !== -1 && setStatus(true)
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
      sweetalert2
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
    return <div className="spinner-grow text-blue-600"></div>
  } else {
    return isAuth && status ? (
      <AiTwotoneStar
        onClick={starHandler}
        className="star_star cursor-pointer text-yellow-300 m-auto mt-0"
        size={17}
      />
    ) : (
      <img
        alt="star"
        src="/static/images/star.svg"
        width="17"
        height="17"
        onClick={starHandler}
        className="cursor-pointer m-auto"
      />
    )
  }
}

export default memo(Star)
