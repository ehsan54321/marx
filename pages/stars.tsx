import Image from 'next/image'
import StarPage from '@components/stars/StarPage'
import { AuthContext } from '@store/auth'
import { baseURL } from '@baseUrl'
import { Error401 } from '@components/error'
import { NextSeo } from 'next-seo'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type starType = {
  id: number
  name: string
  faName: string
  poster_path: string
}
const PageStars = () => {
  const { isAuth } = useContext(AuthContext)
  const [dataStar, setDataStar] = useState<starType[] | null>(null)
  const { t } = useTranslation()
  useEffect(() => {
    const data: starType[] = JSON.parse(localStorage.getItem('star'))
    if (data || (data && data.length <= 1))
      data.sort((a: starType, b: starType) => a.id - b.id)
    setDataStar(data)
  }, [])

  const DeleteStarInLocalStorage = (key) => {
    setDataStar((prevDataStar) =>
      prevDataStar.filter((coin: starType) => coin.name !== key)
    )

    const funLocalStorage = () =>
      dataStar.filter((coin: starType) => coin.name !== key)
    localStorage.setItem('star', JSON.stringify(funLocalStorage()))
  }
  if (isAuth) {
    return (
      <>
        <NextSeo
          title={t('title.selected')}
          titleTemplate={t('title.selected') + t('title')}
          description={t('title.selected')}
          canonical={baseURL + 'start'}
          additionalMetaTags={[
            {
              name: 'apple-mobile-web-app-title',
              content: t('title.selected') + ' 401',
            },
          ]}
          openGraph={{
            url: baseURL + 'account',
            title: t('title.selected') + t('title'),
            description: t('title.selected'),
          }}
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
