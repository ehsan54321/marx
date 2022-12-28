import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import { numberToPersian } from '@lib/helper'

const Settings = ({ setImg, img, tem, setTem }) => {
  const { t, i18n } = useTranslation()
  const ChangeLang = () => {
    if (t('lang')) {
      i18n.changeLanguage('en')
      localStorage.setItem('lang', 'en')
    } else {
      i18n.changeLanguage('fa')
      localStorage.setItem('lang', 'fa')
    }
  }
  const optionsLang = [
    { value: 'fa', label: 'فارسی' },
    { value: 'en', label: 'English' },
  ]
  const optionsImg = [
    { value: 'img', label: t('img') },
    { value: 'no_img', label: t('no.img') },
  ]
  const optionsTem = [
    { value: 'tem1', label: t('tem') + ' ' + numberToPersian(1, t('lang')) },
    { value: 'tem2', label: t('tem') + ' ' + numberToPersian(2, t('lang')) },
  ]
  return (
    <div className="h-32">
      <div className="flex">
        <Select
          className="w-full"
          onChange={ChangeLang}
          defaultValue={[t('lang') ? optionsLang[0] : optionsLang[1]]}
          options={optionsLang}
        />
        <Select
          className="w-full mr-4"
          onChange={(e) => setImg(e.value === 'img')}
          defaultValue={[img ? optionsImg[0] : optionsImg[1]]}
          options={optionsImg}
        />
        <Select
          className="w-full mr-4"
          onChange={(e) => setTem(e.value === 'tem1')}
          defaultValue={[tem ? optionsTem[0] : optionsTem[1]]}
          options={optionsTem}
        />
      </div>
    </div>
  )
}

export default Settings
