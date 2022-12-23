import classNames from 'classnames'
import http from '@services/httpServices'
import sweetalert2 from 'sweetalert2'
import { AuthContext } from '@store/auth'
import { BsEnvelopeFill, BsEye, BsEyeSlash } from 'react-icons/bs'
import { resErr, removeSpas } from '@lib/helper'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

type filedInput = { stt: boolean; mas: string }
type onFinishType = { email: string; password: string }
type authObj = {
  email: string
  username: string
  password: string
  poster_path: string
  is_admin: boolean
}
const Login = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [passLook, setPassLook] = useState<boolean>(true)
  const [errorEmail, setErrorEmail] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const [errorPass, setErrorPass] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const router = useRouter()
  const { t } = useTranslation()
  const { setAuthState } = useContext(AuthContext)
  const noFind = 'لطفا این فیلد را پر کنید.'
  const onFinish = async (value: onFinishType) => {
    try {
      http
        .post('api/auth/login', {
          password: value.password,
          email: value.email,
          lang: t('lang'),
        })
        .then(({ data }) => {
          if (data.status === 'SUCCESS') {
            setAuthState(data.data)
            router.push('/account')
            sweetalert2.fire({
              icon: 'success',
              toast: true,
              position: 'top-end',
              timer: 7000,
              title: t('login.success'),
              showConfirmButton: false,
              showCloseButton: true,
              timerProgressBar: true,
            })
          } else {
            sweetalert2.fire({
              icon: 'error',
              toast: true,
              position: 'top-end',
              timer: 7000,
              title: data.message,
              showConfirmButton: false,
              showCloseButton: true,
              timerProgressBar: true,
            })
          }
        })
        .catch(() => resErr(t))
    } catch {
      resErr(t)
    }
    setLoader(false)
  }
  const onSubmit = (e) => {
    const email: string = removeSpas(e.target['0'].value.toLowerCase())
    const password: string = removeSpas(e.target['1'].value.toLowerCase())
    const emailRegExp = new RegExp(/^[a-zA-Z\s][a-zA-Z0-9_\.-\s]*@gmail.com$/)
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
      if (!email) setErrorEmail({ stt: true, mas: noFind })
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
    if (password && password.length >= 6 && password.length <= 32) {
      setErrorPass({ stt: false, mas: '' })
      isPassword = true
    } else {
      if (!password) setErrorPass({ stt: true, mas: noFind })
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
      }
    }
    if (isEmail && isPassword) {
      setLoader(true)
      onFinish({ email, password })
    }
    e.preventDefault()
  }
  return (
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
            className={classNames(
              'form-control',
              errorEmail.stt && 'is-invalid'
            )}
            type="email"
          />
        </div>
        <div className="mt-1">
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
            className={classNames(
              'form-control',
              errorPass.stt ? 'is-invalid' : 'border-end-0'
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
        <div className="mt-1">
          <span className="text-danger">{errorPass.mas}</span>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-100 mt-4 auth_btn btn btn-outline-primary"
          disabled={loader}
        >
          {loader && (
            <span className="loader text-dark me-1" role="progressbar">
              <svg viewBox="22 22 44 44" width="20">
                <circle
                  cx="44"
                  cy="44"
                  r="20.2"
                  fill="none"
                  strokeWidth="3.6"
                ></circle>
              </svg>
            </span>
          )}
          <span>{loader ? t('loading') : t('login')}</span>
        </button>
      </div>
    </form>
  )
}

export default Login
