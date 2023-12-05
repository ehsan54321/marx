import http from '@/services/httpServices'
import Swal from 'sweetalert2'
import useTranslation from '@/hooks/translation'
import { AuthContext } from '@/store/auth'
import {
  BsEnvelopeFill,
  BsEye,
  BsEyeSlash,
  BsFillPersonFill,
} from 'react-icons/bs'
import { removeSpas, resErr } from '@/lib/helper'
import { useContext, useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import classNames from 'classnames'

type filedInput = { stt: boolean; mas: string }
const UserInfo = () => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [errorUsername, setErrorUsername] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const [passLook, setPassLook] = useState<boolean>(true)
  const [newPassLook, setNewPassLook] = useState<boolean>(true)
  const [rePassLook, setRePassLook] = useState<boolean>(true)
  const [errorPass, setErrorPass] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const [errorNewPass, setErrorNewPass] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const [errorRePass, setErrorRePass] = useState<filedInput>({
    stt: false,
    mas: '',
  })
  const { authState, setAuthState } = useContext(AuthContext)
  const t = useTranslation()
  const finish = ({ username, password, newPassword }) => {
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
          .put('api/v3/auth/update', {
            username,
            password,
            newPassword,
            email: authState.user.email,
            created: authState.user.created,
          })
          .then((res) => {
            if (res.data.status === 'SUCCESS') {
              const newData = {
                ...authState,
                user: {
                  ...authState.user,
                  name: username,
                },
              }
              setAuthState(newData)
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
    const password: string = removeSpas(e.target['2'].value.toLowerCase())
    const newPassword: string = removeSpas(e.target['3'].value.toLowerCase())
    const rePassword: string = removeSpas(e.target['4'].value.toLowerCase())
    const usernameRegExp = new RegExp(
      /^[A-Za-zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s][A-Za-z0-9آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]*$/
    )
    const passwordRegExp = new RegExp(
      /^[a-zA-Z0-9_$*@+#!%&{}\.()-\s]{1,999999}$/
    )
    const emailRegExp = new RegExp(/^[a-zA-Z\s][a-zA-Z0-9_\.-\s]*@gmail.com$/)
    const noFind = 'لطفا این فیلد را پر کنید.'
    let isUsername: boolean = false
    let isPassword: boolean = false
    let isRePassword: boolean = false
    let isNewPassword: boolean = false
    setErrorPass({ stt: false, mas: '' })
    setErrorRePass({ stt: false, mas: '' })
    setErrorNewPass({ stt: false, mas: '' })
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
    if (password === '' && rePassword === '') {
      isRePassword = true
      isNewPassword = true
      isPassword = true
    } else {
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
              mas: 'رمز عبور قدمی شما می بایست بیش از ۶ حرف باشد!',
            })
          } else {
            setErrorPass({
              stt: true,
              mas: 'رمز عبور قدمی شما می بایست کمتر از ۳۲ حرف باشد!',
            })
          }
        } else if (!!!passwordRegExp.exec(password)) {
          setErrorPass({
            stt: true,
            mas: 'رمز عبور قدمی از حروف انگلیسی تشگیل شد باشد!',
          })
        }
      }
      if (
        newPassword &&
        newPassword.length >= 6 &&
        newPassword.length <= 32 &&
        passwordRegExp.exec(newPassword)
      ) {
        setErrorNewPass({ stt: false, mas: '' })
        isNewPassword = true
      } else {
        if (!newPassword) setErrorNewPass({ stt: true, mas: noFind })
        else if (!(newPassword.length >= 6 && newPassword.length <= 32)) {
          if (newPassword.length <= 6) {
            setErrorNewPass({
              stt: true,
              mas: 'رمز عبور جدید شما می بایست بیش از ۶ حرف باشد!',
            })
          } else {
            setErrorNewPass({
              stt: true,
              mas: 'رمز عبور جدید شما می بایست کمتر از ۳۲ حرف باشد!',
            })
          }
        } else if (!!!passwordRegExp.exec(newPassword)) {
          setErrorNewPass({
            stt: true,
            mas: 'رمز عبور جدید از حروف انگلیسی تشگیل شد باشد!',
          })
        }
      }
      if (rePassword) {
        if (newPassword === rePassword) {
          setErrorRePass({ stt: false, mas: '' })
          isRePassword = true
        } else {
          setErrorRePass({
            stt: true,
            mas: 'تکرار رمز عبور اشتباه است!',
          })
        }
      } else setErrorRePass({ stt: true, mas: noFind })
    }

    if (isUsername && isPassword && isRePassword && isNewPassword) {
      finish({ password, username, newPassword })
    }
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
          <div className="mb-4">
            <div className="text-right mb-2">
              <label htmlFor="register_password">{t('old.password')}</label>
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
                disabled={disabled}
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
              {errorPass.stt && <br />}
              <span className="text-slate-500">
                شما می توانید نام کاربری فقط تغیر دهید و یا فقط رمز عبور تغیر
                دهید.
              </span>
            </div>
          </div>
          <div>
            <div className="text-right mb-2">
              <label htmlFor="register_password">{t('new.password')}</label>
            </div>
            <div className="input-group">
              <div className="input-group-text bg-white">
                <RiLockPasswordFill />
              </div>
              <input
                className={classNames(
                  'form-control',
                  errorNewPass.stt ? 'is-invalid' : 'border-l-0'
                )}
                name="newPassword"
                disabled={disabled}
                type={newPassLook ? 'password' : 'text'}
              />
              <div
                className="input-group-text bg-white"
                onClick={() => setNewPassLook(!newPassLook)}
              >
                {!newPassLook ? <BsEye /> : <BsEyeSlash />}
              </div>
            </div>
            <div className="mt-1">
              <span className="text-red-600">{errorNewPass.mas}</span>
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
                disabled={disabled}
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
