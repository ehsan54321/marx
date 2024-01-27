<<<<<<< HEAD
import Swal from 'sweetalert2'
import useTranslation from '@/hooks/translation'
import { AuthContext } from '@/store/auth'
import { memo, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import http from '@/services/httpServices'
import { resErr } from '@/lib/helper'

type starObj = {
  id: number
  name: string
  faName: string
  poster_path: string
}
const Star = ({ name, faName, id, poster_path }: starObj) => {
  const t = useTranslation()
  const { isAuth, authState } = useContext(AuthContext)
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
      setTimeout(() => setLoaderStatus(false), 200)
    }
    setLoaderStatus(true)
    if (isAuth) {
      if (status) {
        http
          .put('api/v3/star/del', {
            user_id: authState.user.id,
            name,
          })
          .then((res) => {
            const funLocalStorage = () => {
              return JSON.parse(localStorage.getItem('star')).filter(
                (coin: starObj) => coin.name !== name
              )
            }
            localStorage.setItem('star', JSON.stringify(funLocalStorage()))
            setFalse(false)
          })
          .catch(() => resErr(t))
      } else {
        http
          .put('api/v3/star/add', {
            user_id: authState.user.id,
            name,
            faName,
            id,
            poster_path,
          })
          .then((res) => {
            if (res.data.status === 'SUCCESS') {
              const dataLocalStorage = { name, faName, id, poster_path }
              const local = localStorage.getItem('star')
              localStorage.setItem(
                'star',
                JSON.stringify(
                  local
                    ? [dataLocalStorage, ...JSON.parse(local)]
                    : [dataLocalStorage]
                )
              )
              setFalse(true)
            } else if (res.data.status === 'WARNING') {
              localStorage.removeItem('star')
              http
                .get(`/api/v3/star/user/${authState.user.id}`)
                .then(async (response) => {
                  await localStorage.setItem(
                    'star',
                    JSON.stringify(response.data)
                  )
                  location.reload()
                })
            } else {
              setFalse(false)
              resErr(t)
            }
          })
          .catch(() => resErr(t))
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: t('text.no.login'),
        confirmButtonText: `<a href="/auth#login"><span class="text-white">
          ${t('text.no.login.button')}</span></a>`,
        showCloseButton: true,
      }).then((e) => {
        setLoaderStatus(false)
        if (e.isConfirmed) {
          router.push('/auth#login', '/auth#login', { locale: t('lang') })
        }
      })
    }
  }

  if (loaderStatus) {
    return <div className="spinner-grow text-blue-600" />
  } else {
    return isAuth && status ? (
      <svg
        className="w-4 text-yellow-400 cursor-pointer filter-invert-dark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        onClick={starHandler}
      >
        <path
          fill="currentColor"
          d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
        ></path>
      </svg>
    ) : (
      <svg
        className="w-4 cursor-pointer transition ease-linear hover:text-yellow-400 dark:text-dark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        onClick={starHandler}
      >
        <path
          fill="currentColor"
          d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
        ></path>
      </svg>
    )
  }
}

export default memo(Star)
=======
import Swal from 'sweetalert2'
import useTranslation from '@/hooks/translation'
import { AuthContext } from '@/store/auth'
import { memo, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import http from '@/services/httpServices'
import { resErr } from '@/lib/helper'

type starObj = {
  id: number
  name: string
  faName: string
  poster_path: string
}
const Star = ({ name, faName, id, poster_path }: starObj) => {
  const t = useTranslation()
  const { isAuth, authState } = useContext(AuthContext)
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
      setTimeout(() => setLoaderStatus(false), 200)
    }
    setLoaderStatus(true)
    if (isAuth) {
      if (status) {
        http
          .put('api/v3/star/del', {
            user_id: authState.user.id,
            name,
          })
          .then((res) => {
            const funLocalStorage = () => {
              return JSON.parse(localStorage.getItem('star')).filter(
                (coin: starObj) => coin.name !== name
              )
            }
            localStorage.setItem('star', JSON.stringify(funLocalStorage()))
            setFalse(false)
          })
          .catch(() => resErr(t))
      } else {
        http
          .put('api/v3/star/add', {
            user_id: authState.user.id,
            name,
            faName,
            id,
            poster_path,
          })
          .then((res) => {
            if (res.data.status === 'SUCCESS') {
              const dataLocalStorage = { name, faName, id, poster_path }
              const local = localStorage.getItem('star')
              localStorage.setItem(
                'star',
                JSON.stringify(
                  local
                    ? [dataLocalStorage, ...JSON.parse(local)]
                    : [dataLocalStorage]
                )
              )
              setFalse(true)
            } else if (res.data.status === 'WARNING') {
              localStorage.removeItem('star')
              http
                .get(`/api/v3/star/user/${authState.user.id}`)
                .then(async (response) => {
                  await localStorage.setItem(
                    'star',
                    JSON.stringify(response.data)
                  )
                  location.reload()
                })
            } else {
              setFalse(false)
              resErr(t)
            }
          })
          .catch(() => resErr(t))
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: t('text.no.login'),
        confirmButtonText: `<a href="/auth#login"><span class="text-white">
          ${t('text.no.login.button')}</span></a>`,
        showCloseButton: true,
      }).then((e) => {
        setLoaderStatus(false)
        if (e.isConfirmed) {
          router.push('/auth#login', '/auth#login', { locale: t('lang') })
        }
      })
    }
  }

  if (loaderStatus) {
    return <div className="spinner-grow text-blue-600" />
  } else {
    return isAuth && status ? (
      <svg
        className="w-4 text-yellow-400 cursor-pointer filter-invert-dark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        onClick={starHandler}
      >
        <path
          fill="currentColor"
          d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
        ></path>
      </svg>
    ) : (
      <svg
        className="w-4 cursor-pointer transition ease-linear hover:text-yellow-400 dark:text-dark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        onClick={starHandler}
      >
        <path
          fill="currentColor"
          d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
        ></path>
      </svg>
    )
  }
}

export default memo(Star)
>>>>>>> 1bd3d58 (start git)
