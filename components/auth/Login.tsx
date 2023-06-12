import classNames from 'classnames'
import http from '@/services/httpServices'
import Swal from 'sweetalert2'
import useTranslation from '@/hooks/translation'
import { AuthContext } from '@/store/auth'
import { BsEnvelopeFill, BsEye, BsEyeSlash } from 'react-icons/bs'
import { removeSpas, resErr } from '@/lib/helper'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'

type filedInput = { stt: boolean; mas: string }
type onFinishType = { email: string; password: string }
const Login = ({ setShow }) => {
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
  const t = useTranslation()
  const { setAuthState } = useContext(AuthContext)
  const noFind = 'لطفا این فیلد را پر کنید.'
  const onFinish = (value: onFinishType) => {
    http
      .post('api/v2/auth/login', {
        password: value.password,
        email: value.email,
        lang: t('dir') === 'rtl',
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          http.get('api/v2/user').then(async ({ data }) => {
            await setAuthState(data)
            await setShow()
            router.push('/account', '/account', { locale: t('lang') })
            Swal.fire({
              icon: 'success',
              toast: true,
              position: 'top-end',
              timer: 7000,
              title: t('login.success'),
              showConfirmButton: false,
              showCloseButton: true,
              timerProgressBar: true,
            })
          })
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
          setLoader(false)
        }
      })
      .catch(() => {
        resErr(t)
        setLoader(false)
      })
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
      <div className="mb-4">
        <div className="text-right mb-2">
          <label htmlFor="login_email">{t('email')}</label>
        </div>
        <div className="input-group">
          <div className="input-group-text bg-white">
            <BsEnvelopeFill />
          </div>
          <input
            className={classNames(
              'form-control',
              errorEmail.stt ? 'is-invalid' : ''
            )}
            name="email"
            type="email"
          />
        </div>
        <div className="mt-1">
          <span className="text-red-600">{errorEmail.mas}</span>
        </div>
      </div>
      <div>
        <div className="text-right mb-2">
          <label htmlFor="login_password">{t('password')}</label>
        </div>
        <div className="input-group">
          <div className="input-group-text bg-white">
            <RiLockPasswordFill />
          </div>
          <input
            className={classNames(
              'form-control',
              errorPass.stt ? 'is-invalid' : 'border-l-0'
            )}
            name="password"
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
          <span className="text-red-600">{errorPass.mas}</span>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full mt-6 text-blue-600 disabled:cursor-progress disabled:opacity-70 disabled:bg-white disabled:hover:text-blue-600 border border-solid border-blue-600 bg-white inline-block py-1.5 text-base cursor-pointer rounded-md hover:bg-blue-600 hover:text-white outline-0 transition-btn"
          disabled={loader}
        >
          {loader && (
            <div className="spinner-grow align-middle mx-1 mt-[3.5px]" />
          )}
          <span>{loader ? t('loading') : t('login')}</span>
        </button>
      </div>
    </form>
  )
}

export default Login
