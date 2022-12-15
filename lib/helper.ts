import toast from 'sweetalert2'

export const removeSpas = (str: string) => str.replace(/(\s)/g, '')
export const formatCurrency = (str: string | number) =>
  str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const resErr = (t?: any) => {
  toast.fire({
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

export const numberToPersian = (str: string | number, type?: string) => {
  if (!type) return str.toString()
  const faLang: string[] = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰']
  const enLang: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const strArr = str.toString().split('')
  return strArr.map((c) => faLang[enLang.indexOf(c)] || c).join('')
}
