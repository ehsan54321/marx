import toast from 'sweetalert2'

export const usdInRials = (usd: number, rials: number) => ~~(usd * rials)
export const SpasTo0 = (str: string) => str.replace(/(\s)/g, '')
export const SortBySetaSeta = (str: string | number) =>
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

export const toPersian = (str: string | number, type?: string) => {
  if (!type) return str.toString()
  const faLang: string[] = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰']
  const arLang: string[] = ['٠', '٩', '٨', '٧', '٦', '٥', '٤', '٣', '٢', '١']
  const enLang: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  return str
    .toString()
    .split('')
    .map((c) => faLang[enLang.indexOf(c)] || faLang[arLang.indexOf(c)] || c)
    .join('')
}
