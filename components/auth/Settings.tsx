import Select from 'react-select'
import { useTranslation } from 'react-i18next'

const Settings = ({ setImg, img }) => {
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
  return (
    <div className="d-flex">
      <Select
        className="w-100"
        onChange={ChangeLang}
        defaultValue={[
          t('lang')
            ? { value: 'fa', label: 'فارسی' }
            : { value: 'en', label: 'English' },
        ]}
        options={optionsLang}
      />
      <Select
        className="w-100 ms-3"
        onChange={(e) => setImg(e.value === 'img')}
        defaultValue={[
          img
            ? { value: 'img', label: t('img') }
            : { value: 'no_img', label: t('no.img') },
        ]}
        options={optionsImg}
      />
    </div>
  )
}

export default Settings
