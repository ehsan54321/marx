import Image from 'next/image'
import SEO from '@components/Seo'
import StarPage from '@components/stars/StarPage'
import { AuthContext } from '@store/auth'
import { Error401 } from '@components/error'
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
        <SEO title={t('title.selected')} url="stars" />
        <h1 className="h5 mt-6 mb-6 leading-7 font-bold h1Page">
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
                src="/static/images/no-data.svg"
                alt="داده ای یافت نشد"
                className="mr-4"
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
