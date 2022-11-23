import Err401 from '@components/error/401'
import Image from 'next/image'
import SEO from '@components/Seo'
import StarPage from '@components/stars/StarPage'
import { AuthContext } from '@store/auth'
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
    if (data != undefined || (data != null && data.length <= 1))
      data.sort((a: starType, b: starType) => a.id - b.id)
    setDataStar(data)
  }, [])

  const DeleteStarInLocalStorage = (id: string) => {
    setDataStar((prevDataStar: starType[]) => {
      return prevDataStar.filter((coin: starType) => coin.name !== id)
    })

    const funLocalStorage = () =>
      dataStar.filter((coin: starType) => coin.name !== id)
    localStorage.setItem('star', JSON.stringify(funLocalStorage()))
  }
  if (isAuth) {
    return (
      <>
        <SEO title={t('title.selected')} />
        <h1 className="h5 mt-4 mb-4 h1_page">{t('selected.list')}</h1>
        <div className="background-color">
          <div className="d-flex flex-wrap" style={{ gap: 9 }}>
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
                className="ms-3"
                width={100}
                height={100}
              />
              <p className="text-good mt-2">منتخبی یافت نشد.</p>
            </div>
          )}
        </div>
      </>
    )
  } else {
    return <Err401 btn>{t('error.no.login')}</Err401>
  }
}

export default PageStars
