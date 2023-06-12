import { useTranslation as useNextTranslation } from 'next-i18next'

const useTranslation = (): Translator => {
  const { t } = useNextTranslation('common')

  return (name: string, variables: { [key: string]: string } = {}) => {
    let str = t(name)

    Object.keys(variables).forEach((from) => {
      str = str.replace(new RegExp(`{${from}}`, 'g'), variables[from])
    })

    return str
  }
}

export type Translator = (
  name: string,
  variables?: {
    [key: string]: string
  }
) => string

export default useTranslation
