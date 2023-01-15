import classNames from 'classnames'
import http from '@services/httpServices'
import Swal from 'sweetalert2'
import { AuthContext } from '@store/auth'
import {
  BsEnvelopeFill,
  BsEye,
  BsEyeSlash,
  BsFillPersonFill,
} from 'react-icons/bs'
import { resErr, removeSpas } from '@lib/helper'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

type filedInput = { stt: boolean; mas: string }
type onFinishType = {
  username: string
  email: string
  password: string
}
const Register = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { setAuthState } = useContext(AuthContext)
  const [loader, setLoader] = useState<boolean>(false)
  const [passLook, setPassLook] = useState<boolean>(true)
  const [rePassLook, setRePassLook] = useState<boolean>(true)
  const [errorUsername, setErrorUsername] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const [errorEmail, setErrorEmail] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const [errorPass, setErrorPass] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const [errorRePass, setErrorRePass] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const onFinish = (value: onFinishType) => {
    http
      .post('api/v2/auth/register', value)
      .then(({ data }) => {
        if (data.status === 'SUCCESS') {
          setAuthState(data.data)
          router.push('/account')
          Swal.fire({
            icon: 'success',
            toast: true,
            position: 'top-end',
            timer: 7000,
            title: t('register.success'),
            showConfirmButton: false,
            showCloseButton: true,
            timerProgressBar: true,
          })
        } else {
          Swal.fire({
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
        setLoader(false)
      })
      .catch(() => {
        resErr(t)
        setLoader(false)
      })
  }
  const onSubmit = (e) => {
    const username: string = removeSpas(e.target['0'].value)
    const email: string = removeSpas(e.target['1'].value.toLowerCase())
    const password: string = removeSpas(e.target['2'].value.toLowerCase())
    const rePassword: string = removeSpas(e.target['3'].value.toLowerCase())
    const usernameRegExp = new RegExp(
      /^[A-Za-zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s][A-Za-z0-9آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]*$/
    )
    const emailRegExp = new RegExp(/^[a-zA-Z\s][a-zA-Z0-9_\.-\s]*@gmail.com$/)
    const passwordRegExp = new RegExp(
      /^[a-zA-Z0-9_$*@+#!%&{}\.()-\s]{1,999999}$/
    )
    const noFind = 'لطفا این فیلد را پر کنید.'
    let isUsername: boolean = false
    let isEmail: boolean = false
    let isPassword: boolean = false
    let isRePassword: boolean = false
    setErrorEmail({ stt: false, mas: '' })
    setErrorPass({ stt: false, mas: '' })
    setErrorRePass({ stt: false, mas: '' })
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
    if (
      password &&
      password.length >= 6 &&
      password.length <= 32 &&
      passwordRegExp.exec(password)
    ) {
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
      } else if (!!!passwordRegExp.exec(password)) {
        setErrorPass({
          stt: true,
          mas: 'رمز عبور از حروف انگلیسی تشگیل شد باشد!',
        })
      }
    }
    if (rePassword) {
      if (password === rePassword) {
        setErrorRePass({ stt: false, mas: '' })
        isRePassword = true
      } else {
        setErrorRePass({
          stt: true,
          mas: 'تکرار رمز عبور اشتباه است!',
        })
      }
    } else setErrorRePass({ stt: true, mas: noFind })
    if (isEmail && isUsername && isPassword && isRePassword) {
      setLoader(true)
      onFinish({ email, password, username })
    }
    e.preventDefault()
  }
  return (
    <form className="form-floating" onSubmit={onSubmit}>
      <div className="mb-4">
        <div className="text-right mb-2">
          <label htmlFor="register_username">{t('username')}</label>
        </div>
        <div className="input-group">
          <div className="input-group-text bg-white">
            <BsFillPersonFill />
          </div>
          <input
            className={
              errorUsername.stt ? 'form-control is-invalid' : 'form-control'
            }
            name="username"
            type="text"
          />
        </div>
        <div className="mt-1">
          <span className="text-red-600">{errorUsername.mas}</span>
          {errorUsername.mas && <br />}
          <span className="text-slate-500">
            به شما پیشنهاد می کنیم از نام های فارسی استفاده کنید.
          </span>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-right mb-2">
          <label htmlFor="register_email">{t('email')}</label>
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
      <div className="mb-4">
        <div className="text-right mb-2">
          <label htmlFor="register_password">{t('password')}</label>
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
        <div className="text-right mb-2">
          <label htmlFor="register_password">{t('re.password')}</label>
        </div>
        <div className="input-group">
          <div className="input-group-text bg-white">
            <RiLockPasswordFill />
          </div>
          <input
            className={classNames(
              'form-control',
              errorRePass.stt ? 'is-invalid' : 'border-l-0'
            )}
            name="rePassword"
            type={rePassLook ? 'password' : 'text'}
          />
          <div
            className="input-group-text bg-white"
            onClick={() => setRePassLook(!rePassLook)}
          >
            {!rePassLook ? <BsEye /> : <BsEyeSlash />}
          </div>
        </div>
        <div className="mt-1">
          <span className="text-red-600">{errorRePass.mas}</span>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full mt-6 text-inherit text-blue-600 disabled:cursor-progress disabled:opacity-70 disabled:bg-white disabled:hover:text-blue-600 border border-solid border-blue-600 bg-white inline-block py-1.5 text-base cursor-pointer rounded-md hover:bg-blue-600 hover:text-white outline-none transition-btn"
          disabled={loader}
        >
          {loader && (
            <span className="loader ml-1">
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
          <span>{loader ? t('loading') : t('register')}</span>
        </button>
      </div>
    </form>
  )
}

export default Register
