import { numberToPersian } from '@lib/helper'
import { useTranslation } from 'react-i18next'

const Settings = ({ setImg, img, theme, setTheme }) => {
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
  return (
    <div className="h-32">
      <div className="flex">
        <div className="inline-block relative w-1/3">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={ChangeLang}
            value={t('lang') ? 'fa' : 'en'}
          >
            <option value="fa">فارسی</option>
            <option value="en">English</option>
          </select>
          <Icon />
        </div>
        <div className="inline-block relative w-1/3 mr-3">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={() => setImg(!img)}
            value={img.toString()}
          >
            <option value="true">{t('img')}</option>
            <option value="false">{t('no.img')}</option>
          </select>
          <Icon />
        </div>
        <div className="inline-block relative w-1/3 mr-3">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={() => setTheme(!theme)}
            value={theme.toString()}
          >
            <option value="true">
              {t('tem') + ' ' + numberToPersian(1, t('lang'))}
            </option>
            <option value="false">
              {t('tem') + ' ' + numberToPersian(2, t('lang'))}
            </option>
          </select>
          <Icon />
        </div>
      </div>
    </div>
  )
}

const Icon = () => {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg
        className="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  )
}

export default Settings
