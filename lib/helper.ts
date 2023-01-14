import Swal from 'sweetalert2'

export const removeSpas = (str) => str.replace(/(\s)/g, '')
export const formatCurrency = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const resErr = (t) => {
  Swal.fire({
    icon: 'error',
    toast: true,
    position: 'top-end',
    timer: 7000,
    title: t ? t('error.res') : 'مشکلی در شبکه به وجود آمد.',
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
