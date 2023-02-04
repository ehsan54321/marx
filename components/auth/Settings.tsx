import { numberToPersian } from '@lib/helper'
import { ThemeContext } from '@store/theme'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

const Settings = (props) => {
  const { setImg, img } = props
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useContext(ThemeContext)
  const ChangeLang = () => {
    if (t('lang')) {
      i18n.changeLanguage('en')
      localStorage.setItem('lang', 'en')
    } else {
      i18n.changeLanguage('fa')
      localStorage.setItem('lang', 'fa')
    }
  }
  const styleSelect =
    'block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2.5 pr-8 rounded-md shadow outline-0'
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="inline-block relative sm:w-60">
        <select
          className={styleSelect}
          onChange={ChangeLang}
          value={t('lang') ? 'fa' : 'en'}
        >
          <option value="fa">فارسی</option>
          <option value="en">English</option>
        </select>
        <Icon />
      </div>
      <div className="inline-block relative sm:w-60">
        <select
          className={styleSelect}
          onChange={() => setImg(!img)}
          value={img.toString()}
        >
          <option value="true">{t('img')}</option>
          <option value="false">{t('no.img')}</option>
        </select>
        <Icon />
      </div>
      <div className="inline-block relative sm:w-60">
        <select
          className={styleSelect}
          onChange={() => props.setTheme(!props.theme)}
          value={props.theme.toString()}
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
      <div className="inline-block relative sm:w-60">
        <div
          className="flex items-center"
          onClick={() => {
            if (theme) document.querySelector('html').classList.add('dark')
            else document.querySelector('html').classList.remove('dark')
            localStorage.setItem('theme', (!theme).toString())
            setTheme(!theme)
          }}
        >
          <label htmlFor="airplane-mode" className="mt-2 cursor-pointer">
            <span className="cursor-pointer mx-1 text-[22px] filter-invert-dark">
              {theme ? '☀️' : '🌒'}
            </span>
          </label>
          <div
            className="SwitchRoot rounded-full relative cursor-pointer"
            id="airplane-mode"
            data-state={theme ? '' : 'checked'}
          >
            <button
              className="SwitchThumb bg-white rounded-full block mr-1"
              data-state={theme ? '' : 'checked'}
            />
          </div>
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
