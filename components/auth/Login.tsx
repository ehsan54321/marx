import axios from 'axios'
import classNames from 'classnames'
import http from '@services/httpServices'
import toast from 'sweetalert2'
import { AuthContext } from '@store/auth'
import { BsEnvelopeFill, BsEye, BsEyeSlash } from 'react-icons/bs'
import { resErr, SpasTo0 } from '@lib/helper'
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
  const noFild = 'لطفا این فیلد را پر کنید.'
  const onFinish = async (value: onFinishType) => {
    try {
      const dbUser = (await axios.get('http://localhost:8000/user')).data

      const authNext = () => {
        const token: authObj = {
          email: value.email,
          username: dbUser[value.email].username,
          password: value.password,
          poster_path: dbUser[value.email].poster_path,
          is_admin: dbUser[value.email].is_admin,
        }

        http
          .post('api/auth/login', token)
          .then((res) => {
            if (res.data.status === 'SUCCESS') {
              setAuthState(res.data.data)
              router.push('/account')
              toast.fire({
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
              toast.fire({
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
      if (
        dbUser[value.email] &&
        dbUser[value.email].password == value.password
      ) {
        authNext()
      } else {
        toast.fire({
          icon: 'error',
          toast: true,
          position: 'top-end',
          timer: 7000,
          title: t('login.warning'),
          showConfirmButton: false,
          showCloseButton: true,
          timerProgressBar: true,
        })
      }
    } catch {
      resErr(t)
    }
    setLoader(false)
  }
  const onSubmit = (e) => {
    const email: string = SpasTo0(e.target['0'].value.toLowerCase())
    const password: string = SpasTo0(e.target['1'].value.toLowerCase())
    const emailRegExp = new RegExp(/^[a-zA-Z\s][a-zA-Z0-9_\.-\s]*@gmail.com$/)
    const passwordRegExp = new RegExp(
      /^[a-zA-Z0-9_$*@+#!%&{}\.()-\s]{1,999999}$/
    )
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
            id="login_email"
            className={classNames(
              'form-control',
              errorEmail.stt && 'is-invalid'
            )}
            type="text"
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
            id="login_password"
            className={classNames(
              'form-control',
              errorPass.stt ? 'is-invalid' : 'border-start-0'
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
