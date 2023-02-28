import Swal from 'sweetalert2'

export const removeSpas = (str) => str.replace(/(\s)/g, '')
export const formatCurrency = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const resErr = (t) => {
  const textFA = 'خطایی رخ داده است، لطفا مجدد تلاش کنید.' // 'درخواست با خطا مواجه شد.'
  const textEN = 'There was a problem with the network.'
  Swal.fire({
    icon: 'error',
    toast: true,
    position: 'top-end',
    timer: 7000,
    title: t ? (t('lang') ? textFA : textEN) : textFA,
    showConfirmButton: false,
    showCloseButton: true,
    timerProgressBar: true,
  })
}

export const numberToPersian = (str, type?) => {
  if (!type) return str.toString()
  const faLang: string[] = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰']
  const enLang: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const strArr = str.toString().split('')
  return strArr.map((c) => faLang[enLang.indexOf(c)] || c).join('')
}

export const formatThousands = (value) => {
  return Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value)
}
