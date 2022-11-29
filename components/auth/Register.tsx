import classNames from 'classnames'
import http from '@services/httpServices'
import toast from 'sweetalert2'
import { AuthContext } from '@store/auth'
import {
  BsEnvelopeFill,
  BsEye,
  BsEyeSlash,
  BsFillPersonFill,
} from 'react-icons/bs'
import { Button } from 'react-bootstrap'
import { resErr, SpasTo0 } from '@lib/helper'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

type filedInput = { stt: boolean; mas: string }
type onFinishType = {
  username: string
  email: string
  password: string
  re_password: string
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
      .post('api/auth/register', value)
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          setAuthState(res.data.data)
          router.push('/account')
          toast.fire({
            icon: 'success',
            toast: true,
            position: 'bottom-end',
            timer: 7000,
            title: t('register.success'),
            showConfirmButton: false,
            showCloseButton: true,
            timerProgressBar: true,
          })
        } else {
          toast.fire({
            icon: 'error',
            toast: true,
            position: 'bottom-end',
            timer: 7000,
            title: res.data.message,
            showConfirmButton: false,
            showCloseButton: true,
            timerProgressBar: true,
          })
        }
      })
      .catch(() => {
        resErr(t)
        setLoader(false)
      })
  }
  const onSubmit = (e) => {
    const username: string = SpasTo0(e.target['0'].value.toLowerCase())
    const email: string = SpasTo0(e.target['1'].value.toLowerCase())
    const password: string = SpasTo0(e.target['2'].value.toLowerCase())
    const rePassword: string = SpasTo0(e.target['3'].value.toLowerCase())
    const usernameRegExp = new RegExp(
      /^[A-Za-zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s][A-Za-z0-9آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]*$/
    )
    const emailRegExp = new RegExp(/^[a-zA-Z\s][a-zA-Z0-9_\.-\s]*@gmail.com$/)
    const passwordRegExp = new RegExp(
      /^[a-zA-Z0-9_$*@+#!%&{}\.()-\s]{1,999999}$/
    )
    const noFild = 'لطفا این فیلد را پر کنید.'
    let isEmail: boolean = false
    let isPassword: boolean = false
    let isRePassword: boolean = false
    let isUsername: boolean = false
    setErrorEmail({ stt: false, mas: '' })
    setErrorPass({ stt: false, mas: '' })
    setErrorRePass({ stt: false, mas: '' })
    setErrorUsername({ stt: false, mas: '' })
    if (
      username &&
      username.length >= 4 &&
      username.length <= 14 &&
      usernameRegExp.exec(username)
    ) {
      setErrorUsername({ stt: false, mas: '' })
      isUsername = true
    } else {
      if (!username) setErrorPass({ stt: true, mas: noFild })
      else if (!(username.length >= 4 && username.length <= 14)) {
        if (username.length <= 4) {
          setErrorUsername({
            stt: true,
            mas: 'نام کاربری شما می بایست بیش از ۴ حرف باشد!',
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
      if (!email) setErrorPass({ stt: true, mas: noFild })
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
    } else setErrorPass({ stt: true, mas: noFild })
    if (isEmail && isUsername && isPassword && isRePassword) {
      setLoader(true)
      onFinish({ email, password, re_password: rePassword, username })
    }
    e.preventDefault()
  }
  return (
    <form className="form-floating" onSubmit={onSubmit}>
      <div className="mb-3">
        <div className="text-start mb-2">
          <label htmlFor="register_username">{t('username')}</label>
        </div>
        <div className="input-group">
          <div className="input-group-text bg-white auth_input">
            <BsFillPersonFill />
          </div>
          <input
            id="register_username"
            className={classNames(
              'form-control',
              errorUsername.stt && 'is-invalid'
            )}
            type="text"
          />
        </div>
        <div className="mt-1">
          <span className="text-danger">{errorUsername.mas}</span>
        </div>
      </div>
      <div className="mb-3">
        <div className="text-start mb-2">
          <label htmlFor="register_email">{t('email')}</label>
        </div>
        <div className="input-group">
          <div className="input-group-text auth_input bg-white">
            <BsEnvelopeFill />
          </div>
          <input
            id="register_email"
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
      <div className="mb-3">
        <div className="text-start mb-2">
          <label htmlFor="register_password">{t('password')}</label>
        </div>
        <div className="input-group">
          <div className="input-group-text auth_input bg-white">
            <RiLockPasswordFill />
          </div>
          <input
            id="register_password"
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
        <div className="mt-1">
          <span className="text-danger">{errorPass.mas}</span>
        </div>
      </div>
      <div>
        <div className="text-start mb-2">
          <label htmlFor="register_password">{t('re.password')}</label>
        </div>
        <div className="input-group">
          <div className="input-group-text auth_input bg-white">
            <RiLockPasswordFill />
          </div>
          <input
            id="register_password"
            className={classNames(
              'form-control',
              errorRePass.stt ? 'is-invalid' : 'auth_icon_pass'
            )}
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
          <span className="text-danger">{errorRePass.mas}</span>
        </div>
      </div>
      <div>
        <Button
          type="submit"
          value="Submit"
          variant="outline-primary"
          className="w-100 mt-4 auth_btn"
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
          {loader ? t('loading') : t('register')}
        </Button>
      </div>
    </form>
  )
}

export default Register
