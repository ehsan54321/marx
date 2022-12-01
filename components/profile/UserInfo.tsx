import classNames from 'classnames'
import http from '@services/httpServices'
import toast from 'sweetalert2'
import { AuthContext } from '@store/auth'
import { BsEnvelopeFill, BsEye, BsEyeSlash } from 'react-icons/bs'
import { resErr, SpasTo0 } from '@lib/helper'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

type filedInput = { stt: boolean; mas: string }
const UserInfo = () => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [passLook, setPassLook] = useState<boolean>(true)
  const [errorEmail, setErrorEmail] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const [errorPass, setErrorPass] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const { authState } = useContext(AuthContext)
  const { t } = useTranslation()
  const finish = (value: { email: string; password: string }) => {
    value.email = SpasTo0(value.email.toLowerCase())
    value.password = SpasTo0(value.password.toLowerCase())
    toast
      .fire({
        icon: 'warning',
        title:
          '<span class="h4">در صورتی که از ذخیره سازی اطلاعات وارد شده اطمینان دارید بر روی تایید کلیک کنید؟</span>',
        showCancelButton: true,
        cancelButtonText: 'لغو',
        confirmButtonText: 'تایید',
      })
      .then((result) => {
        if (result.isConfirmed) {
          http
            .post('api/auth/update', value.email, value.password)
            .then(() => {
              toast.fire({
                icon: 'success',
                title:
                  '<span class="h4">اطلاعات با موفقیت تغییر پیدا کرد!</span>',
                confirmButtonText: 'باشه',
              })
              setDisabled(true)
            })
            .catch(() => resErr(t))
        }
      })
  }
  const onSubmit = (e) => {
    const email: string = SpasTo0(e.target['0'].value.toLowerCase())
    const password: string = SpasTo0(e.target['1'].value.toLowerCase())
    const emailRegExp = new RegExp(/^[a-zA-Z\s][a-zA-Z0-9_\.-\s]*@gmail.com$/)
    const passwordRegExp = new RegExp(
      /^[a-zA-Z0-9_$*@+#!%&{}\.()-\s]{1,999999}$/
    )
    const noFild = 'لطفا این فیلد را پر کنید.'
    let isEmail: boolean = false
    let isPassword: boolean = false
    setErrorEmail({ stt: false, mas: '' })
    setErrorPass({ stt: false, mas: '' })
    if (
      email &&
      email.length >= 14 &&
      email.length <= 52 &&
      emailRegExp.exec(email)
    ) {
      setErrorEmail({ stt: false, mas: '' })
      isEmail = true
    } else {
      if (!email) setErrorEmail({ stt: true, mas: noFild })
      else if (!(email.length >= 14 && email.length <= 52)) {
        if (email.length <= 14) {
          setErrorEmail({
            stt: true,
            mas: 'ایمیل شما می بایست بیش از ۱۴ حرف باشد!',
          })
        } else {
          setErrorEmail({
            stt: true,
            mas: 'ایمیل شما می بایست کمتر از ۵۲ حرف باشد!',
          })
        }
      } else if (!!!emailRegExp.exec(email)) {
        setErrorEmail({
          stt: true,
          mas: 'یک ایمیل معتبر وارد کنید!',
        })
      }
    }
    if (
      password &&
      password.length >= 6 &&
      password.length <= 32 &&
      passwordRegExp.exec(password)
    ) {
      setErrorPass({ stt: false, mas: '' })
      isPassword = true
    } else {
      if (!password) setErrorPass({ stt: true, mas: noFild })
      else if (!(password.length >= 6 && password.length <= 32)) {
        if (password.length <= 6) {
          setErrorPass({
            stt: true,
            mas: 'رمز عبور شما می بایست بیش از ۶ حرف باشد!',
          })
        } else {
          setErrorPass({
            stt: true,
            mas: 'رمز عبور شما می بایست کمتر از ۳۲ حرف باشد!',
          })
        }
      } else if (!!!passwordRegExp.exec(password)) {
        setErrorPass({
          stt: true,
          mas: 'رمز عبور از حروف انگلیسی تشگیل شد باشد!',
        })
      }
    }
    if (isEmail && isPassword) finish({ email, password })
    e.preventDefault()
  }
  return (
    <div className="p-3 mt-2 mt-md-0 card">
      <div className="card-body">
        <form className="form-floating" onSubmit={onSubmit}>
          <div className="mb-3">
            <div className="text-start mb-2">
              <label htmlFor="login_email">{t('email')}</label>
            </div>
            <div className="input-group">
              <div className="input-group-text auth_input bg-white">
                <BsEnvelopeFill />
              </div>
              <input
                id="login_email"
                disabled={disabled}
                defaultValue={authState.email}
                className={classNames(
                  'form-control',
                  errorEmail.stt && 'is-invalid'
                )}
                type="text"
              />
            </div>
            <div className="mt-1 text-center">
              <span className="text-danger">{errorEmail.mas}</span>
            </div>
          </div>
          <div>
            <div className="text-start mb-2">
              <label htmlFor="login_password">{t('password')}</label>
            </div>
            <div className="input-group">
              <div className="input-group-text auth_input bg-white">
                <RiLockPasswordFill />
              </div>
              <input
                id="login_password"
                disabled={disabled}
                defaultValue={authState.password}
                className={classNames(
                  'form-control',
                  errorPass.stt ? 'is-invalid' : 'auth_icon_pass'
                )}
                type={passLook ? 'password' : 'text'}
              />
              <div
                className="input-group-text bg-white"
                onClick={() => setPassLook(!passLook)}
              >
                {!passLook ? <BsEye /> : <BsEyeSlash />}
              </div>
            </div>
            <div className="mt-1 text-center">
              <span className="text-danger">{errorPass.mas}</span>
            </div>
          </div>
          {!disabled && (
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">
                <span>تایید تغییر اطلاعات کاربری</span>
              </button>
            </div>
          )}
        </form>
        {disabled && (
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={() => setDisabled(false)}
            >
              <span>تغییر اطلاعات کاربری</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserInfo
