<<<<<<< HEAD
import Image from 'next/image'
import Meta from '@/components/Meta'
import StarPage from '@/components/stars/StarPage'
import useTranslation from '@/hooks/translation'
import { AuthContext } from '@/store/auth'
import { Error401 } from '@/components/error'
import { useContext, useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import http from '@/services/httpServices'
import { resErr } from '@/lib/helper'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

type starType = {
  id: number
  name: string
  faName: string
  poster_path: string
}
const PageStars = () => {
  const { isAuth, authState } = useContext(AuthContext)
  const [dataStar, setDataStar] = useState<starType[] | null>(null)
  const t = useTranslation()
  useEffect(() => {
    const localdata: string | null = localStorage.getItem('star')
    if (localdata != null) {
      const data = JSON.parse(localdata)
      if (data.length <= 1) {
        data.sort((a: starType, b: starType) => a.id - b.id)
      }
      setDataStar(data)
    }
  }, [])

  const DeleteStarInLocalStorage = (key) => {
    http
      .put('api/v3/star/del', {
        user_id: authState.user.id,
        name: key,
      })
      .then((res) => {
        const funLocalStorage = () =>
          dataStar.filter((coin: starType) => coin.name !== key)
        const new_data = funLocalStorage()
        localStorage.setItem('star', JSON.stringify(new_data))
        setDataStar(new_data)
      })
      .catch(() => resErr(t))
  }
  if (isAuth) {
    return (
      <>
        <Meta
          title={t('title.selected')}
          keywords={[t('selected.list'), t('title.selected')]}
          description={t('title.selected')}
        />
        <h1 className="h5 my-6 leading-7 font-bold" dir="auto">
          {t('selected.list')}
        </h1>
        <div className="background-color bg-white">
          <div className="flex flex-wrap justify-center gap-[9.5px]">
            {dataStar &&
              dataStar.map((star: starType) => (
                <StarPage
                  key={star.id}
                  name={star.faName}
                  nameEN={star.name}
                  poster_path={star.poster_path}
                  deleteStar={DeleteStarInLocalStorage}
                />
              ))}
          </div>

          {(!dataStar || (dataStar && dataStar.length === 0)) && (
            <div className="m-5 p-5 text-center">
              <Image
                src="/static/assets/img/no-data.svg"
                alt="داده ای یافت نشد"
                className="mr-4 filter-invert-dark animation-img"
                width={100}
                height={100}
              />
              <p className="text-slate-500 mt-2">منتخبی یافت نشد.</p>
            </div>
          )}
        </div>
      </>
    )
  } else {
    return <Error401 btn>{t('error.no.login')}</Error401>
  }
}

export default PageStars
=======
import Image from 'next/image'
import Meta from '@/components/Meta'
import StarPage from '@/components/stars/StarPage'
import useTranslation from '@/hooks/translation'
import { AuthContext } from '@/store/auth'
import { Error401 } from '@/components/error'
import { useContext, useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import http from '@/services/httpServices'
import { resErr } from '@/lib/helper'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

type starType = {
  id: number
  name: string
  faName: string
  poster_path: string
}
const PageStars = () => {
  const { isAuth, authState } = useContext(AuthContext)
  const [dataStar, setDataStar] = useState<starType[] | null>(null)
  const t = useTranslation()
  useEffect(() => {
    const localdata: string | null = localStorage.getItem('star')
    if (localdata != null) {
      const data = JSON.parse(localdata)
      if (data.length <= 1) {
        data.sort((a: starType, b: starType) => a.id - b.id)
      }
      setDataStar(data)
    }
  }, [])

  const DeleteStarInLocalStorage = (key) => {
    http
      .put('api/v3/star/del', {
        user_id: authState.user.id,
        name: key,
      })
      .then((res) => {
        const funLocalStorage = () =>
          dataStar.filter((coin: starType) => coin.name !== key)
        const new_data = funLocalStorage()
        localStorage.setItem('star', JSON.stringify(new_data))
        setDataStar(new_data)
      })
      .catch(() => resErr(t))
  }
  if (isAuth) {
    return (
      <>
        <Meta
          title={t('title.selected')}
          keywords={[t('selected.list'), t('title.selected')]}
          description={t('title.selected')}
        />
        <h1 className="h5 my-6 leading-7 font-bold" dir="auto">
          {t('selected.list')}
        </h1>
        <div className="background-color bg-white">
          <div className="flex flex-wrap justify-center gap-[9.5px]">
            {dataStar &&
              dataStar.map((star: starType) => (
                <StarPage
                  key={star.id}
                  name={star.faName}
                  nameEN={star.name}
                  poster_path={star.poster_path}
                  deleteStar={DeleteStarInLocalStorage}
                />
              ))}
          </div>

          {(!dataStar || (dataStar && dataStar.length === 0)) && (
            <div className="m-5 p-5 text-center">
              <Image
                src="/static/assets/img/no-data.svg"
                alt="داده ای یافت نشد"
                className="mr-4 filter-invert-dark animation-img"
                width={100}
                height={100}
              />
              <p className="text-slate-500 mt-2">منتخبی یافت نشد.</p>
            </div>
          )}
        </div>
      </>
    )
  } else {
    return <Error401 btn>{t('error.no.login')}</Error401>
  }
}

export default PageStars
>>>>>>> 1bd3d58 (start git)
