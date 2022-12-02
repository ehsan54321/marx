import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import { toPersian } from '@lib/helper'

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
    { value: 'tem1', label: t('tem') + ' ' + toPersian(1, t('lang')) },
    { value: 'tem2', label: t('tem') + ' ' + toPersian(2, t('lang')) },
  ]
  return (
    <div style={{ height: 125 }}>
      <div className="d-flex">
        <Select
          className="w-100"
          onChange={ChangeLang}
          defaultValue={[t('lang') ? optionsLang[0] : optionsLang[1]]}
          options={optionsLang}
        />
        <Select
          className="w-100 ms-3"
          onChange={(e) => setImg(e.value === 'img')}
          defaultValue={[img ? optionsImg[0] : optionsImg[1]]}
          options={optionsImg}
        />
        <Select
          className="w-100 ms-3"
          onChange={(e) => setTem(e.value === 'tem1')}
          defaultValue={[tem ? optionsTem[0] : optionsTem[1]]}
          options={optionsTem}
        />
      </div>
    </div>
  )
}

export default Settings
