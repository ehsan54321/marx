import http from '@/services/httpServices'
import Swal from 'sweetalert2'
import useTranslation from '@/hooks/translation'
import { AuthContext } from '@/store/auth'
import { BsEnvelopeFill, BsFillPersonFill } from 'react-icons/bs'
import { removeSpas, resErr } from '@/lib/helper'
import { useContext, useState } from 'react'

type filedInput = { stt: boolean; mas: string }
const UserInfo = () => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [errorUsername, setErrorUsername] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const { authState, setAuthState } = useContext(AuthContext)
  const t = useTranslation()
  const finish = (username: string) => {
    Swal.fire({
      icon: 'warning',
      title:
        '<span class="h4">در صورتی که از ذخیره سازی اطلاعات وارد شده اطمینان دارید بر روی تایید کلیک کنید؟</span>',
      showCancelButton: true,
      cancelButtonText: 'لغو',
      confirmButtonText: 'تایید',
    }).then((result) => {
      if (result.isConfirmed) {
        http
          .put('api/v2/auth/update', {
            username,
            email: authState.user.email,
            date: authState.user.date,
          })
          .then((res) => {
            if (res.data.status === 'SUCCESS') {
              setAuthState({ ...authState, username })
              Swal.fire({
                icon: 'success',
                title:
                  '<span class="h4">اطلاعات با موفقیت تغییر پیدا کرد!</span>',
                confirmButtonText: 'باشه',
              })
              setDisabled(true)
            } else {
              Swal.fire({
                icon: 'error',
                toast: true,
                position: 'top-end',
                timer: 7000,
                title: res.data.message,
                showConfirmButton: false,
                showCloseButton: true,
                timerProgressBar: true,
              })
            }
          })
          .catch(() => resErr(t))
      }
    })
  }
  const onSubmit = (e) => {
    const username: string = removeSpas(e.target['0'].value)
    const usernameRegExp = new RegExp(
      /^[A-Za-zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s][A-Za-z0-9آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]*$/
    )
    const emailRegExp = new RegExp(/^[a-zA-Z\s][a-zA-Z0-9_\.-\s]*@gmail.com$/)
    const noFind = 'لطفا این فیلد را پر کنید.'
    let isUsername: boolean = false
    setErrorUsername({ stt: false, mas: '' })
    if (
      username &&
      username.length >= 3 &&
      username.length <= 14 &&
      usernameRegExp.exec(username)
    ) {
      setErrorUsername({ stt: false, mas: '' })
      isUsername = true
    } else {
      if (!username) setErrorUsername({ stt: true, mas: noFind })
      else if (!(username.length >= 3 && username.length <= 14)) {
        if (username.length <= 3) {
          setErrorUsername({
            stt: true,
            mas: 'نام کاربری شما می بایست بیش از ۳ حرف باشد!',
          })
        } else {
          setErrorUsername({
            stt: true,
            mas: 'نام کاربری شما می بایست کمتر از ۱۴ حرف باشد!',
          })
        }
      } else if (!!!emailRegExp.exec(username)) {
        setErrorUsername({
          stt: true,
          mas: 'نام کاربری شما نباید شامل حروف غیر انگلیسی و فارسی باشد!',
        })
      }
    }
    if (isUsername) finish(username)
    e.preventDefault()
  }
  return (
    <div className="max-lg:mt-2 background-color bg-white min-w-0 bg-clip-border">
      <div className="flex-auto p-4">
        <form className="form-floating" onSubmit={onSubmit}>
          <div className="mb-4">
            <div className="text-right mb-2">
              <label htmlFor="login_username">{t('username')}</label>
            </div>
            <div className="input-group">
              <div className="input-group-text bg-white">
                <BsFillPersonFill />
              </div>
              <input
                id="login_username"
                disabled={disabled}
                defaultValue={authState.user.name}
                className={
                  errorUsername.stt ? 'form-control is-invalid' : 'form-control'
                }
                name="username"
                type="text"
              />
            </div>
            <div className="mt-1 text-center">
              <span className="text-red-600">{errorUsername.mas}</span>
              {errorUsername.mas && <br />}
              <span className="text-slate-500">
                به شما پیشنهاد می کنیم از نام های فارسی استفاده کنید.
              </span>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-right mb-2">
              <label htmlFor="login_email">{t('email')}</label>
            </div>
            <div className="input-group">
              <div className="input-group-text bg-white">
                <BsEnvelopeFill />
              </div>
              <input
                id="login_email"
                disabled={true}
                // disabled={disabled}
                defaultValue={authState.user.email}
                className="form-control"
                name="email"
                type="email"
              />
            </div>
            <div className="mt-1 text-center" />
          </div>
          {!disabled && (
            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-3 text-white inline-block py-1.5 text-base cursor-pointer rounded bg-blue-600 hover:bg-blue-700 outline-0 transition-btn"
              >
                <span>{t('info.confirm')}</span>
              </button>
            </div>
          )}
        </form>
        {disabled && (
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-3 text-white inline-block py-1.5 text-base cursor-pointer rounded bg-blue-600 hover:bg-blue-700 outline-0 transition-btn"
              onClick={() => setDisabled(false)}
            >
              <span>{t('info.information')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserInfo
